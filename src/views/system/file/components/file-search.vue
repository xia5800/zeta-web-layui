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
  <lay-card class="z-form-card">
    <lay-form
      ref="searchFormRef"
      :model="formModel"
    >
      <lay-row>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="业务类型" prop="bizType">
            <lay-input v-model="formModel.bizType" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="桶" prop="bucket">
            <lay-input v-model="formModel.bucket" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="文件名称" prop="uniqueFileName">
            <lay-input v-model="formModel.uniqueFileName" placeholder="请填写" allow-clear />
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
