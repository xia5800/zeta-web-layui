<script setup lang="ts">
import type { Rules } from 'async-validator'
import { cloneDeep } from 'lodash-es'
import type { JobSaveParam, SelectOption } from '~/types'
import KvTable from './kv-table.vue'
import CronSelect from './cron-select.vue'

const props = withDefaults(defineProps<{
  visible: boolean,
  // 任务执行类
  jobClassOptions?: SelectOption[],
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
const kvTable = ref()
// 表单数据
const baseFormData = {
  triggerName: '',
  triggerGroup: undefined,
  triggerDescription: undefined,
  priority: 0,
  cron: '',
  jobName: '',
  jobGroup: undefined,
  jobDescription: undefined,
  jobClassName: '',
  jobParam: undefined,
}
const form = reactive<JobSaveParam>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  jobName: { type: 'string', required: true, message: '任务名称不能为空' },
  triggerName: { type: 'string', required: true, message: '触发器名称不能为空' },
  cron: { type: 'string', required: true, message: 'cron表达式不能为空' },
  jobClassName: { type:'string', required: true, message: '任务执行类不能为空' },
})

/** 关闭弹窗 */
function handleClose() {
  // 关闭弹窗
  show.value = false

  // 重置表单
  refForm.value.reset()
  // 清空表单校验
  refForm.value?.clearValidate()
}

/** cron表达式Change事件处理 */
function changeCronstr(value?: string) {
  form.cron = value || ''
}

/** 保存数据 */
async function saveData(model: JobSaveParam, layerId: string) {
  try {
    // 创建任务
    const { success, message } = await addJobApi({
      ...cloneDeep(model) as JobSaveParam,
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
  refForm.value.validate((isValidate: boolean, model: JobSaveParam, _errors: any) => {
    if (!isValidate) return

    // 获取任务参数
    model.jobParam = kvTable.value.getTableData()

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      await saveData(model, layerId)
      emit('done')
    })
  })
}

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      Object.assign(form, baseFormData)
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    area="720px"
    title="新增"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" label-width="100" style="padding: 10px; padding-right: 30px;">
      <lay-row>
        <!-- 左 -->
        <lay-col :md="12">
          <lay-form-item label="触发器名称" prop="triggerName" required>
            <lay-input v-model="form.triggerName" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="触发器组名称" prop="triggerGroup">
            <lay-input v-model="form.triggerGroup" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="触发器描述" prop="triggerDescription">
            <lay-textarea v-model="form.triggerDescription" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="cron表达式" prop="cron" required>
            <cron-select v-model="form.cron" placeholder="请填写" allow-clear  />
          </lay-form-item>
        </lay-col>
        <!-- 右 -->
        <lay-col :md="12">
          <lay-form-item label="任务名称" prop="jobName" required>
            <lay-input v-model="form.jobName" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="任务组名称" prop="jobGroup">
            <lay-input v-model="form.jobGroup" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="任务描述" prop="jobDescription">
            <lay-textarea v-model="form.jobDescription" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="任务执行类" prop="jobClassName" required>
            <lay-select v-model="form.jobClassName" placeholder="请选择" allow-clear style="width: 100%">
              <template v-for="jobClass in jobClassOptions" :key="jobClass.value">
                <lay-select-option :value="jobClass.value" :label="jobClass.label" />
              </template>
            </lay-select>
          </lay-form-item>
        </lay-col>

        <lay-form-item label="触发器优先级" prop="priority">
          <lay-input-number v-model="form.priority" placeholder="请填写" :span="2" allow-clear />
        </lay-form-item>

        <lay-form-item prop="jobParam">
          <template #label>
            任务参数
            <lay-tooltip content="重复的键其值将会覆盖">
              <lay-icon type="layui-icon-about" />
            </lay-tooltip>
          </template>
          <kv-table ref="kvTable" />
        </lay-form-item>
      </lay-row>
    </lay-form>
  </lay-layer>
</template>
