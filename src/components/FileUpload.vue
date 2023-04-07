<script lang="ts" setup>
import { layer } from '@layui/layer-vue'
import type { ApiResult, SysFile } from '~/types'
import { getToken } from '~/utils/token'

const {
  drag = true,
  dragText = '点击选择文件上传，或将文件拖拽到此处上传',
  size = 1024 * 1024 * 100,
  bizType = 'file',
} = defineProps<{
  /** 是否开启拖拽上传 */
  drag?: boolean
  /** 拖拽上传描述文字 */
  dragText?: string
  /** 文件大小限制 单位kb。 为0则不限制文件上传大小 */
  size?: number
  /** 业务类型 例如：order、user_avatar等 会影响文件url的值 */
  bizType?: string
}>()

const emits = defineEmits<{
  (e: 'success', sysFile: SysFile): void
  (e: 'error', msg: string): void
}>()

// 加载提示id
const loading = ref<string>()

// 文件上传组件请求头
const headers = computed(() => {
  const token = getToken()
  if (!token) return {}
  const headers: Record<string, string> = {}
  headers[token.tokenName] = token.token
  return headers
})

/** 上传前检查 */
function beforeUpload(file: any) {
  let isOver = false
  if (size > 0 && file.size > size) {
    isOver = true
    layer.msg('文件大小不能超过100MB', { icon: 2 })
  }
  loading.value = layer.msg('上传中...', { icon: 16, time: 0 })
  return !isOver
}

/** 文件上传完毕 处理 */
function onDone(res: any) {
  // 关闭加载提示
  layer.close(loading.value)

  // 发送事件
  const result = JSON.parse(res.data) as ApiResult<SysFile>
  emits('success', result.data as SysFile)
}

/** 文件上传失败 处理 */
function onError(res: any) {
  // 关闭加载提示
  layer.close(loading.value)

  // 发送事件
  emits('error', res.msg)
}
</script>

<template>
  <lay-upload
    :url="UploadUrl"
    :data="{ bizType }"
    :headers="headers"
    :before-upload="beforeUpload"
    auto
    :drag="drag"
    :drag-text="dragText"
    @done="onDone"
    @error="onError"
  />
</template>
