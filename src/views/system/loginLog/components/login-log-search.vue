<script setup lang="ts">
import type { SelectOption, SysLoginLog } from '~/types'

const {
  stateOptions,
} = defineProps<{
  /** 状态下拉框数据 */
  stateOptions: SelectOption[]
}>()

const emit = defineEmits<{
  (e: 'onSearch', formModel: SysLoginLog): void
}>()

const searchFormRef = ref()
const formModel = reactive<SysLoginLog>({
  account: '',
  state: undefined,
  os: '',
  browser: '',
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
              <lay-form-item label="状态" prop="state">
                <lay-select v-model="formModel.state" placeholder="请选择" allow-clear style="width: 100%">
                  <template v-for="state in stateOptions" :key="state.value">
                    <lay-select-option :value="state.value" :label="state.label" />
                  </template>
                </lay-select>
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="账号" prop="account">
                <lay-input v-model="formModel.account" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="操作系统" prop="os">
                <lay-input v-model="formModel.os" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="浏览器类型" prop="browser">
                <lay-input v-model="formModel.browser" placeholder="请填写" allow-clear />
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
