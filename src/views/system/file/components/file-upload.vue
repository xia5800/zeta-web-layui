<script setup lang="ts">
import type { SysFileUploadParam } from '~/types'

const props = withDefaults(defineProps<{
  visible: boolean
}>(), {
  visible: false,
})

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'update:visible', visible: boolean): void
}>()

const show = computed({
  get() {
    return props.visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  },
})

const refForm = ref()
// 表单数据
const baseFormData = {
  bizType: '',
  file: undefined,
}
const form = reactive<SysFileUploadParam>({ ...baseFormData })
// 表格字段
const columns = [
  {
    key: 'file',
    title: '已选择文件',
    width: '200px',
    ellipsisTooltip: true,
  },
  {
    key: 'size',
    title: '大小',
    width: '80px',
    ellipsisTooltip: true,
    customSlot: 'size',
  },
  {
    key: 'operator',
    title: '操作',
    width: '60px',
    align: 'center',
    fixed: 'right',
    customSlot: 'operator',
  },
]
// 表格数据
const dataSource = ref<{
  file: string
  size: number
}[]>([])

/** 表格删除文件 */
function handleDeleteFile() {
  form.file = undefined
  dataSource.value = []
}

/** 关闭弹窗 */
function handleClose() {
  // 重置表单
  refForm.value.reset()
  // 关闭弹窗
  show.value = false
}

/**
 * 表单提交
 *
 * 说明：
 * 这里采用的是用户手动上传文件的形式。
 * 用户拖拽选择文件，点击上传按钮，调用后端定义的文件上传接口进行文件上传。
 *
 * 好处是可控性比较高，自定义样式、效果啥的方便。
 *
 * 注意：
 * uploadFileApi方法会将json对象转换成FormData再进行数据提交
 */
async function handleSubmit() {
  if (!form.file) {
    layer.msg('请选择需要上传的文件', { icon: 2 })
    return
  }

  const loading = layer.msg('上传中...', { icon: 16, time: 0 })
  try {
    // 文件上传
    const { success, message } = await uploadFileApi({
      bizType: form.bizType,
      file: form.file[0],
    })
    if (!success) {
      layer.close(loading)
      layer.msg(message || '上传失败', { icon: 2 })
      return
    }

    // 关闭弹窗
    layer.close(loading)
    layer.msg(message || '上传成功', { icon: 1 })
    emit('done')
    handleClose()
  } catch (e) {
    layer.close(loading)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

// 表单文件监听
watch(
  () => form.file,
  (newVal: File[]) => {
    // 如果有值，给表格设置数据
    if (newVal) {
      if (newVal[0].size > (1024 * 1024 * 100)) {
        layer.msg('文件大小不能超过100MB', { icon: 2 })
        return
      }

      dataSource.value = [{
        file: newVal[0].name,
        size: newVal[0].size,
      }]
    } else {
      dataSource.value = []
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    area="700px"
    title="上传文件"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    :btn="[
      { text: '上传', callback: () => handleSubmit() },
      { text: '取消', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" style="padding: 10px">
      <lay-form-item prop="bizType">
        <template #label>
          业务类型
          <lay-tooltip content="例如：order、user_avatar等 会影响文件url的值">
            <lay-icon type="layui-icon-about" />
          </lay-tooltip>
        </template>

        <lay-input v-model="form.bizType" placeholder="请填写" allow-clear />
      </lay-form-item>

      <lay-form-item prop="file" required>
        <template #label>
          文件
          <lay-tooltip content="文件越大上传越慢">
            <lay-icon type="layui-icon-about" />
          </lay-tooltip>
        </template>

        <!-- 关闭自动上传，用户选中的文件会赋值给表单的form.file字段 -->
        <lay-upload
          v-model="form.file"
          :auto="false"
          drag
          drag-text="点击选择文件，或将文件拖拽到此处"
        />

        <lay-table :columns="columns" :data-source="dataSource" value="sm">
          <!-- 表格操作列 -->
          <template #operator>
            <lay-button type="danger" size="xs" @click="handleDeleteFile">
              删除
            </lay-button>
          </template>

          <!-- 文件大小列 -->
          <template #size="{ row }">
            {{ (row.size / 1024 / 1024).toFixed(2) }}m
          </template>
        </lay-table>
      </lay-form-item>
    </lay-form>
  </lay-layer>
</template>
