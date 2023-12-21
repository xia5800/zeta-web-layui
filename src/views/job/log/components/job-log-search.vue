<script setup lang="ts">
import type { SelectOption, TaskLog } from '~/types'

defineProps<{
  /** 状态下拉框数据 */
  typeOptions: SelectOption[]
  /** 任务执行类下拉框数据 */
  jobClassOptions?: SelectOption[]
}>()

const emit = defineEmits<{
  (e: 'onSearch', formModel: TaskLog): void
}>()

const searchFormRef = ref()
const formModel = reactive<TaskLog>({
  type: undefined,
  triggerName: undefined,
  triggerGroup: undefined,
  jobName: undefined,
  jobClassName: undefined,
  jobDescription: undefined,
})
defineExpose({ formModel })

/** 表单搜索事件 */
function search() {
  return emit('onSearch', formModel)
}

/** 表单重置事件 */
function reset() {
  return searchFormRef.value.reset()
}
</script>

<template>
  <div class="z-search-layout">
    <lay-row space="8">
      <lay-col :md="22" :sm="20" :xs="24">
        <lay-form
          ref="searchFormRef"
          :model="formModel"
        >
          <lay-row>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="日志类型" prop="type">
                <lay-select v-model="formModel.type" placeholder="请选择" allow-clear style="width: 100%">
                  <template v-for="logType in typeOptions" :key="logType.value">
                    <lay-select-option :value="logType.value" :label="logType.label" />
                  </template>
                </lay-select>
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="任务执行类" prop="jobClassName">
                <lay-select v-model="formModel.jobClassName" placeholder="请选择" allow-clear style="width: 100%">
                  <template v-for="jobClass in jobClassOptions" :key="jobClass.value">
                    <lay-select-option :value="jobClass.value" :label="jobClass.label" />
                  </template>
                </lay-select>
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="触发器名称" prop="triggerName">
                <lay-input v-model="formModel.triggerName" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="触发器组" prop="triggerGroup">
                <lay-input v-model="formModel.triggerGroup" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="任务名" prop="jobName">
                <lay-input v-model="formModel.jobName" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="任务描述" prop="jobDescription">
                <lay-input v-model="formModel.jobDescription" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
          </lay-row>
        </lay-form>
      </lay-col>
      <lay-col :md="2" :sm="4" :xs="24" class="z-text-center">
        <lay-space :direction="isXs ? 'horizontal' : 'vertical'" wrap>
          <lay-button type="primary" @click="search">
            <lay-icon type="layui-icon-search" /> 查询
          </lay-button>
          <lay-button @click="reset">
            <lay-icon type="layui-icon-refresh-three" /> 重置
          </lay-button>
        </lay-space>
      </lay-col>
    </lay-row>
  </div>
</template>

<style scoped>
:deep(.layui-form-item) {
  margin-bottom: 10px;
}
</style>
