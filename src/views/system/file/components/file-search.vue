<script setup lang="ts">
import type { SysFile } from '~/types'

const emit = defineEmits<{
  (e: 'onSearch', formModel: SysFile): void
}>()

const searchFormRef = ref()
const formModel = reactive<SysFile>({
  bizType: '',
  bucket: '',
  uniqueFileName: '',
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
              <lay-form-item label="业务类型" prop="bizType">
                <lay-input v-model="formModel.bizType" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="桶" prop="bucket">
                <lay-input v-model="formModel.bucket" placeholder="请填写" allow-clear />
              </lay-form-item>
            </lay-col>
            <lay-col :md="8" :sm="12" :xs="24">
              <lay-form-item label="文件名称" prop="uniqueFileName">
                <lay-input v-model="formModel.uniqueFileName" placeholder="请填写" allow-clear />
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
