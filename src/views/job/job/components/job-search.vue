<script setup lang="ts">
import type { SelectOption, JobQueryParam } from '~/types'

defineProps<{
  /** 触发器状态下拉框数据 */
  stateOptions: SelectOption[]
  /** 任务执行类下拉框数据 */
  jobClassOptions?: SelectOption[]
}>()

const emit = defineEmits<{
  (e: 'onSearch', formModel: JobQueryParam): void
}>()

const searchFormRef = ref()
const formModel = reactive<JobQueryParam>({
  triggerName: undefined,
  triggerDescription: undefined,
  jobName: undefined,
  jobDescription: undefined,
  triggerState: undefined,
  jobClassName: undefined,
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
              <lay-form-item label="触发器状态" prop="triggerState">
                <lay-select v-model="formModel.triggerState" placeholder="请选择" allow-clear style="width: 100%">
                  <template v-for="state in stateOptions" :key="state.value">
                    <lay-select-option :value="state.value" :label="state.label" />
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
              <lay-form-item label="触发器描述" prop="triggerDescription">
                <lay-input v-model="formModel.triggerDescription" placeholder="请填写" allow-clear />
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
