<script setup lang="ts">
import type { SelectOption, SysOptLog } from '~/types'

const {
  typeOptions,
} = defineProps<{
  /** 操作类型选项 */
  typeOptions: SelectOption[]
}>()
const emit = defineEmits<{
  (e: 'onSearch', formModel: SysOptLog): void
}>()

const searchFormRef = ref()
const formModel = reactive<SysOptLog>({
  type: undefined,
  description: '',
  httpMethod: '',
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
  <lay-card class="z-form-card">
    <lay-form
      ref="searchFormRef"
      :model="formModel"
    >
      <lay-row>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="操作类型" prop="type">
            <lay-select v-model="formModel.type" placeholder="请选择" allow-clear style="width: 100%">
              <template v-for="option in typeOptions" :key="option.value">
                <lay-select-option :value="option.value" :label="option.label" />
              </template>
            </lay-select>
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="操作描述" prop="description">
            <lay-input v-model="formModel.description" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="请求方式" prop="httpMethod">
            <lay-select v-model="formModel.httpMethod" placeholder="请选择" allow-clear style="width: 100%">
              <lay-select-option value="GET" label="GET" />
              <lay-select-option value="POST" label="POST" />
              <lay-select-option value="PUT" label="PUT" />
              <lay-select-option value="DELETE" label="DELETE" />
            </lay-select>
          </lay-form-item>
        </lay-col>
      </lay-row>
    </lay-form>

    <template #footer>
      <div style="text-align: center;">
        <lay-button type="primary" size="sm" @click="search">
          查询
        </lay-button>
        <lay-button size="sm" @click="reset">
          重置
        </lay-button>
      </div>
    </template>
  </lay-card>
</template>

<style scoped>
:deep(.layui-form-item) {
  margin-bottom: 10px;
}
</style>
