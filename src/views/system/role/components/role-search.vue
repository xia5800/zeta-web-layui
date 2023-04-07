<script setup lang="ts">
import type { SysRole } from '~/types'

const emit = defineEmits<{
  (e: 'onSearch', formModel: SysRole): void
}>()

const searchFormRef = ref()
const formModel = reactive<SysRole>({
  name: '',
  code: '',
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
          <lay-form-item label="角色名" prop="name">
            <lay-input v-model="formModel.name" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="角色编码" prop="code">
            <lay-input v-model="formModel.code" placeholder="请填写" allow-clear />
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
