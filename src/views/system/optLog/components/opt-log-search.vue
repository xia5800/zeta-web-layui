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
  <div class="z-search-layout">
    <lay-row space="8">
      <lay-col :md="20" :sm="20" :xs="24">
        <lay-form
          ref="searchFormRef"
          :model="formModel"
        >
          <lay-row>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="操作类型" prop="type">
                <lay-select v-model="formModel.type" placeholder="请选择" allow-clear style="width: 100%">
                  <template v-for="option in typeOptions" :key="option.value">
                    <lay-select-option :value="option.value" :label="option.label" />
                  </template>
                </lay-select>
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="操作描述" prop="description">
                <lay-input v-model="formModel.description" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
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
      </lay-col>
      <lay-col :md="4" :sm="4" :xs="24" class="z-text-center">
        <lay-space direction="horizontal" wrap>
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
