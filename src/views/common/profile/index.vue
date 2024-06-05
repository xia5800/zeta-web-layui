<script setup lang="ts">
import type { Rules } from 'async-validator'
import type { SysUser, SysUserUpdateParam } from '~/types/system/user'
import { cloneDeep } from 'lodash'
import { assignObj } from '~/utils'
import defaultAvatar from '~/assets/default-avatar.jpg'

const userStore = useUserStore()
const avatar = computed(() => userStore.info?.avatar || defaultAvatar)

// 表单相关
const refForm = ref()
const sysUser = ref<SysUser>({})
const form = reactive<SysUserUpdateParam>({
  id: '',
  username: '',
  sex: 1,
  mobile: '',
  birthday: '',
})
// 表单校验规则
const rules = ref<Rules>({
  username: [
    { type: 'string', required: true, message: '用户名不能为空' },
    { type: 'string', min: 6, max: 64, message: '用户名长度6-64' },
  ],
  email: { type: 'email' },
  sex: { type: 'number', required: true, message: '性别不能为空' },
})

/**
 * 获取当前登录用户的信息
 */
async function fetchUserInfo() {
  const id = userStore.info?.id
  if (!id) return

  const { success, message, data } = await getUserApi(id as string)
  if (!success) {
    layer.msg(message || '获取用户信息失败', { icon: 2 })
  }

  // 赋值
  sysUser.value = data as SysUser
  assignObj(data as SysUser, form)
}
fetchUserInfo()

/** 表单提交 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: SysUserUpdateParam, _errors: any) => {
    if (!isValidate) return

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      try {
        // 修改用户数据
        const { success, message } = await updateUserApi(cloneDeep(model))
        if (!success) {
          layer.msg(message || '操作失败', { icon: 2 })
          return
        }

        layer.msg(message || '操作成功', { icon: 1 })
        // 关闭loading
        layer.close(layerId)
      } catch (e) {
        layer.close(layerId)
        layer.msg((e as Error).message, { icon: 2 })
      }
    })
  })
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <lay-row space="10">
      <lay-col :md="6" :sm="24" :xs="24">
        <lay-card>
          <div class="z-text-center">
            <div class="user-info-avatar-group">
              <lay-avatar :src="avatar" radius style="width: 110px; height: 110px; line-height: 110px;" />
            </div>
            <h1>{{ userStore.info?.username }}</h1>
          </div>
          <lay-line />
          <div class="user-info-item">
            <lay-form-item class="text-center" label="账号：">
              {{ sysUser.account }}
            </lay-form-item>
            <lay-form-item class="text-center" label="角色：">
              {{ sysUser.roles?.map(item => item.name).join('、') }}
            </lay-form-item>
            <lay-form-item class="text-center" label="注册时间：">
              {{ sysUser.createTime }}
            </lay-form-item>
          </div>
        </lay-card>
      </lay-col>
      <lay-col :md="18" :sm="24" :xs="24">
        <lay-card>
          <lay-tab model-value="1" type="brief">
            <lay-tab-item id="1" title="基本信息">
              <lay-form ref="refForm" :model="form" :rules="rules" style="max-width: 580px; margin-top: 20px">
                <lay-form-item label="用户名" prop="username" required>
                  <lay-input v-model="form.username" placeholder="请填写" allow-clear />
                </lay-form-item>
                <lay-form-item label="性别" prop="sex" required>
                  <lay-radio v-model="form.sex" name="sex" :value="1" label="男" />
                  <lay-radio v-model="form.sex" name="sex" :value="2" label="女" />
                </lay-form-item>
                <lay-form-item label="邮箱" prop="email">
                  <lay-input v-model="form.email" placeholder="请填写" allow-clear />
                </lay-form-item>
                <lay-form-item label="手机号" prop="mobile">
                  <lay-input v-model="form.mobile" placeholder="请填写" allow-clear />
                </lay-form-item>
                <lay-form-item label="生日" prop="birthday">
                  <lay-date-picker
                    v-model="form.birthday"
                    placeholder="请选择"
                    allow-clear
                    style="width: 100%"
                  />
                </lay-form-item>
                <lay-form-item class="z-text-center">
                  <lay-button type="primary" @click="handleSubmit">
                    保存修改
                  </lay-button>
                </lay-form-item>
              </lay-form>
            </lay-tab-item>
          </lay-tab>
        </lay-card>
      </lay-col>
    </lay-row>
  </lay-container>
</template>

<style scoped>
.user-info-avatar-group {
  margin: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

h1 {
  font-size: 26px;
  font-weight: 400;
}

:deep(.text-center .layui-input-block) {
  display: flex;
  align-items: center;
}

.text-center {
  margin-bottom: 0;
}
</style>
