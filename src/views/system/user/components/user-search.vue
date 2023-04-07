<script setup lang="ts">
import type { SysUser } from '~/types'

const emit = defineEmits<{
  (e: 'onSearch', formModel: SysUser): void
}>()

const searchFormRef = ref()
const formModel = reactive<SysUser>({
  username: '',
  account: '',
  sex: undefined,
  email: '',
  mobile: '',
  state: undefined,
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
          <lay-form-item label="用户名" prop="username">
            <lay-input v-model="formModel.username" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="账号" prop="account">
            <lay-input v-model="formModel.account" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="性别" prop="sex">
            <lay-select v-model="formModel.sex" placeholder="请选择" allow-clear style="width: 100%">
              <lay-select-option value="0" label="未知" />
              <lay-select-option value="1" label="男" />
              <lay-select-option value="2" label="女" />
            </lay-select>
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="邮箱" prop="email">
            <lay-input v-model="formModel.email" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="手机号" prop="mobile">
            <lay-input v-model="formModel.mobile" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-col :sm="12" :md="8" :lg="6">
          <lay-form-item label="状态" prop="state">
            <lay-select v-model="formModel.state" placeholder="请选择" allow-clear style="width: 100%">
              <lay-select-option value="0" label="停用" />
              <lay-select-option value="1" label="启用" />
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
