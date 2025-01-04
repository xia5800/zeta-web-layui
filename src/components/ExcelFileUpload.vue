<script lang="ts" setup>
import type { ApiResult } from '~/types/global'
import { getToken } from '~/utils/token'
import { API_BASE_URL } from '~/config/setting'

const props = withDefaults(defineProps<{
  /** 上传地址 */
  url: string
  /** 提示文字 */
  text?: string
  /** 文件大小限制 单位kb。 为0则不限制文件上传大小 */
  size?: number
  /** 开启自动上传 */
  auto?: boolean
}>(), {
  text: '上传文件',
  size: 1024 * 1024 * 100,
  auto: true
})

const emits = defineEmits<{
  (e: 'success', data: ApiResult<boolean>): void
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
  if (props.size > 0 && file.size > props.size) {
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

  try {
    const result = JSON.parse(res.data) as ApiResult<boolean>
    emits('success', result)
  } catch (err) {
    console.error(err)
    // 发送事件
    emits('error', res.msg)
  }
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
    :url="API_BASE_URL + url"
    :headers="headers"
    :before-upload="beforeUpload"
    :text="text"
    accept-mime=".xlsx,.xls"
    :auto="auto"
    @done="onDone"
    @error="onError"
  />
</template>

<style scoped>
:deep(.layui-upload-list) {
  margin: 0
}
</style>
