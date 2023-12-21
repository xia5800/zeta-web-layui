<script setup lang="ts">
import type { Rules } from 'async-validator'
import { cloneDeep } from 'lodash-es'
import type { JobTriggerUpdateParam, QuartzJobDetailDTO, SelectOption } from '~/types'

const props = withDefaults(defineProps<{
  visible: boolean,
  /** 任务执行类下拉框数据 */
  jobClassOptions?: SelectOption[]
  /** 任务详情 */
  jobDetail?: QuartzJobDetailDTO
}>(), {
  visible: false
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
  oldName: undefined,
  oldGroup: undefined,
  triggerName: undefined,
  triggerGroup: undefined,
  triggerDescription: undefined,
  cron: undefined,
  priority: 0,
}
const form = reactive<JobTriggerUpdateParam>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  oldName: { type: 'string', required: true, message: '旧触发器名称不能为空' },
  triggerName: { type: 'string', required: true, message: '新触发器名称不能为空' },
  cron: { type: 'string', required: true, message: 'cron表达式不能为空' },
})

/** 初始化表单数据 */
function initData() {
  if (props.jobDetail) {
    form.oldName = props.jobDetail.triggerName
    form.oldGroup = props.jobDetail.triggerGroup
    form.triggerName = props.jobDetail.triggerName
    form.triggerGroup = props.jobDetail.triggerGroup
    form.triggerDescription = props.jobDetail.triggerDescription
    form.cron = props.jobDetail.cron
    form.priority = props.jobDetail.priority
  }
}

/** 关闭弹窗 */
function handleClose() {
  // 关闭弹窗
  show.value = false

  // 重置表单
  refForm.value.reset()
  // 清空表单校验
  refForm.value?.clearValidate()
}

/** 修改数据 */
async function updateData(model: JobTriggerUpdateParam, layerId: string) {
  try {
    // 修改任务
    const { success, message } = await updateJobApi({
      ...cloneDeep(model) as JobTriggerUpdateParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭弹窗
    handleClose()
    // 关闭loading
    layer.close(layerId)
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 表单提交 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: JobTriggerUpdateParam, _errors: any) => {
    if (!isValidate) return

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      await updateData(model, layerId)
      emit('done')
    })
  })
}

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 初始化弹窗数据
      initData()
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    area="450px"
    title="编辑"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" label-width="100" style="padding: 10px">
      <lay-form-item label="旧触发器名称" prop="oldName" required>
        <lay-input v-model="form.oldName" placeholder="请填写" disabled allow-clear />
      </lay-form-item>
      <lay-form-item label="旧触发器组名称" prop="oldGroup">
        <lay-input v-model="form.oldGroup" placeholder="请填写" disabled allow-clear />
      </lay-form-item>
      <lay-form-item label="触发器名称" prop="triggerName" required>
        <lay-input v-model="form.triggerName" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="触发器组名称" prop="triggerGroup">
        <lay-input v-model="form.triggerGroup" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="触发器描述" prop="triggerDescription">
        <lay-textarea v-model="form.triggerDescription" placeholder="请填写" :rows="3" allow-clear />
      </lay-form-item>
      <lay-form-item label="cron表达式" prop="cron" required>
        <lay-input v-model="form.cron" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="触发器优先级" prop="priority">
        <lay-input-number v-model="form.priority" placeholder="请填写" allow-clear />
      </lay-form-item>
    </lay-form>
  </lay-layer>
</template>
