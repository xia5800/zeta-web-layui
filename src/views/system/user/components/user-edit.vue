<script setup lang="ts">
import type { InternalRuleItem, Rules } from 'async-validator'
import type { ExistParam } from '~/types/global'
import type { SelectOption } from '~/types/layui/select'
import type { SysRole } from '~/types/system/role'
import type { SysUser, SysUserSaveParam, SysUserUpdateParam } from '~/types/system/user'
import { cloneDeep } from 'lodash-es'

const props = withDefaults(defineProps<{
  visible: boolean
  /** 修改时必传，用户基本数据 */
  data?: SysUser
}>(), {
  visible: false
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
// 是否修改弹窗
const isUpdate = ref(false)
// 表单数据
const baseFormData = {
  id: undefined,
  account: '',
  email: undefined,
  mobile: undefined,
  username: '',
  password: '',
  roles: [],
  sex: 1,
  state: 1,
  birthday: '',
}
const form = reactive<SysUser>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  account: [
    { type: 'string', required: true, message: '账号不能为空' },
    { type: 'string', min: 6, max: 64, message: '账号长度6-64' },
    {
      // TODO: 问题1：需要防抖，不然的话请求太频繁了。
      asyncValidator: async (_rule: InternalRuleItem, value: string) => {
        // 如果值为空，不触发校验
        if (!value) return Promise.resolve()
        // 如果是修改，不触发校验 ps：账号不允许修改
        if (form.id) return Promise.resolve()

        try {
          // 校验是否存在
          const { message, data } = await existenceUserApi({
            field: 'account',
            value,
          } as ExistParam<string>)
          return data
            ? Promise.reject(message)
            : Promise.resolve()
        } catch (e) {
          Promise.reject((e as Error).message)
        }
      },
    },
  ],
  username: [
    { type: 'string', required: true, message: '用户名不能为空' },
    { type: 'string', min: 6, max: 64, message: '用户名长度6-64' },
  ],
  email: { type: 'email' },
  sex: { type: 'number', required: true, message: '性别不能为空' },
})
// 角色列表数据
const roleOptions = ref<SelectOption[]>()
// 用户的角色列表
const roles = ref<string[]>()

/** 获取角色列表 */
async function getRoleOptions() {
  try {
    const { success, message, data } = await queryRoleApi()
    if (!success) {
      layer.msg(message || '获取角色失败', { icon: 2 })
      return
    }

    // 回显
    roleOptions.value = data!.map((role: SysRole) => ({
      label: role.name!,
      value: role.id!,
    }))
  } catch (err) {
    layer.msg((err as Error).message, { icon: 2 })
  }
}

/** 初始化表单数据 */
function initData() {
  if (props.data) {
    Object.assign(form, props.data)
    isUpdate.value = true
    if (form.roles) {
      roles.value = form.roles.map((role: SysRole) => role.id!)
    }
  } else {
    Object.assign(form, baseFormData)
    isUpdate.value = false
  }
}

/** 关闭弹窗 */
function handleClose() {
  // 清空选中的角色
  roles.value = []
  // 关闭弹窗
  show.value = false

  // 重置表单
  refForm.value.reset()
  // 清空表单校验
  refForm.value?.clearValidate()
}

/** 保存数据 */
async function saveData(model: SysUser, layerId: string) {
  try {
    // 新增用户
    const { success, message } = await addUserApi({
      ...cloneDeep(model) as SysUserSaveParam,
      ...{ roleIds: roles.value },
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭弹窗
    handleClose()
    // 关闭loading
    layer.close(layerId)
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 修改数据 */
async function updateData(model: SysUser, layerId: string) {
  try {
    // 删除不允许修改的字段
    delete model.roles
    delete model.password
    delete model.account
    delete model.mobile
    delete model.email
    // 修改用户数据
    const { success, message } = await updateUserApi({
      ...cloneDeep(model) as SysUserUpdateParam,
      ...{ roleIds: roles.value },
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭弹窗
    handleClose()
    // 关闭loading
    layer.close(layerId)
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 表单提交 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: SysUser, _errors: any) => {
    if (!isValidate) return

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      isUpdate.value
        ? await updateData(model, layerId)
        : await saveData(model, layerId)
      emit('done')
    })
  })
}

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 获取角色列表
      getRoleOptions()
      // 初始化弹窗数据
      initData()
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    area="700px"
    :title="isUpdate ? '编辑' : '新增'"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" style="padding: 10px">
      <lay-row>
        <!-- 左 -->
        <lay-col :md="12">
          <lay-form-item label="账号" prop="account" required>
            <lay-input v-model="form.account" placeholder="请填写" :disabled="isUpdate" allow-clear />
          </lay-form-item>
          <lay-form-item label="用户名" prop="username" required>
            <lay-input v-model="form.username" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item
            v-if="!isUpdate"
            label="密码"
            prop="password"
            :rules="[
              { type: 'string', required: true, message: '密码不能为空' },
              { type: 'string', min: 6, max: 10, message: '密码长度6-10' },
            ]"
            required
          >
            <lay-input v-model="form.password" type="password" placeholder="请填写" password allow-clear />
          </lay-form-item>
          <lay-form-item label="邮箱" prop="email">
            <lay-input v-model="form.email" placeholder="请填写" :disabled="isUpdate" allow-clear />
          </lay-form-item>
          <lay-form-item prop="roles">
            <template #label>
              角色
              <lay-tooltip content="不选则解绑该用户原有的角色">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>

            <lay-select v-model="roles" placeholder="请选择" multiple allow-clear :min-collapsed-num="1" style="width: 100%">
              <template v-for="role in roleOptions" :key="role.value">
                <LaySelectOption :value="role.value" :label="role.label" />
              </template>
            </lay-select>
          </lay-form-item>
        </lay-col>
        <!-- 右 -->
        <lay-col :md="12">
          <lay-form-item label="性别" prop="sex" required>
            <lay-radio v-model="form.sex" name="sex" :value="1" label="男" />
            <lay-radio v-model="form.sex" name="sex" :value="2" label="女" />
          </lay-form-item>
          <lay-form-item label="状态" prop="state">
            <lay-radio v-model="form.state" name="state" :value="1" label="启用" />
            <lay-radio v-model="form.state" name="state" :value="0" label="停用" />
          </lay-form-item>
          <lay-form-item label="手机号" prop="mobile">
            <lay-input v-model="form.mobile" placeholder="请填写" :disabled="isUpdate" allow-clear />
          </lay-form-item>
          <lay-form-item label="生日" prop="birthday">
            <lay-date-picker
              v-model="form.birthday"
              placeholder="请选择"
              allow-clear
              style="width: 100%"
            />
          </lay-form-item>
        </lay-col>
      </lay-row>
    </lay-form>
  </lay-layer>
</template>
