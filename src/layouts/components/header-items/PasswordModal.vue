<script setup lang="ts">
import type { InternalRuleItem, Rules } from 'async-validator'
import { cloneDeep } from 'lodash-es'
import type { ChangePasswordParam } from '~/types'

const props = withDefaults(defineProps<{
  visible: boolean
}>(), {
  visible: false,
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

// 表单数据
const baseFormData = {
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
}
const form = reactive<ChangePasswordParam>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  oldPwd: [
    { type: 'string', required: true, message: '旧密码不能为空' },
    { type: 'string', min: 6, max: 10, message: '旧密码长度6-10' },
  ],
  newPwd: [
    { type: 'string', required: true, message: '新密码不能为空' },
    { type: 'string', min: 6, max: 10, message: '新密码长度6-10' },
  ],
  confirmPwd: {
    type: 'string',
    required: true,
    message: '两次输入的密码不一致',
    validator: (_rule: InternalRuleItem, value: string) => {
      return value === form.newPwd
    },
  },
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

/**
 * 表单提交
 * 说明：
 * 修改密码成功后，后端会自动注销登录
 * 此时请求其它接口，会提示未登录并重定向到登录页面
 * 所以这里不需要调用注销登录接口
 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: ChangePasswordParam, _errors: any) => {
    if (!isValidate) return

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      // 修改自己的密码
      const { success, message } = await changeUserPasswordApi(cloneDeep(model))
      if (!success) {
        layer.msg(message || '操作失败', { icon: 2 })
        return
      }
      // 关闭弹窗
      handleClose()
      // 关闭loading
      layer.close(layerId)
      emit('done')
    })
  })
}
</script>

<template>
  <lay-layer
    v-model="show"
    area="420px"
    title="修改密码"
    :shade-close="false"
    :move="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" style="padding: 10px">
      <lay-form-item label="旧密码" prop="oldPwd" required>
        <lay-input v-model="form.oldPwd" type="password" placeholder="请填写" allow-clear password />
      </lay-form-item>
      <lay-form-item label="新密码" prop="newPwd" required>
        <lay-input v-model="form.newPwd" type="password" placeholder="请填写" allow-clear password />
      </lay-form-item>
      <lay-form-item label="确认密码" prop="confirmPwd" required>
        <lay-input v-model="form.confirmPwd" type="password" placeholder="请填写" allow-clear password />
      </lay-form-item>
    </lay-form>
  </lay-layer>
</template>
