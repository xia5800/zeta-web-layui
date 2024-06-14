<script setup lang="ts">
import { layer } from '@layui/layer-vue'
import type { LoginParam } from '~/types/login'
import type { Rules } from 'async-validator'
import { cloneDeep } from 'lodash'
import { HOME_ROUTE } from '~/types/router'
import { PROJECT_NAME } from '~/config/setting'
import loginBg from '~/assets/images/login-bg.png'
import LottieLogo from '~/assets/lottie/lf20_sfiiilbf.json'
import LottieBanner from '~/assets/lottie/lf20_uv2O8HvO2x.json'

const { loading, setLoading } = useLoading(false)
const router = useRouter()
const refForm = ref()
const verifyCode = ref<string>('')
const verifyCodeMaxLength = ref<number>(5)
const loginForm = reactive<LoginParam>({
  account: 'zetaAdmin',
  password: 'admin',
  code: '',
  key: '',
  remember: true,
})
// 表单校验规则
const rules = ref<Rules>({
  account: { type: 'string', required: true, message: '账号不能为空' },
  password: { type: 'string', required: true, message: '密码不能为空' },
  code: { type: 'string', required: true, message: '验证码不能为空' }
})

/** 设置记住登录 */
function setRemember(value: boolean) {
  loginForm.remember = value
}
/** 改变验证码 */
async function changeVerifyCode() {
  const { success, message, data } = await captchaApi()
  if (!success) {
    layer.msg(message || '获取验证码失败', { icon: 2 })
    return
  }
  verifyCode.value = data?.base64 || ''
  loginForm.code = data?.text || ''
  loginForm.key = data?.key || ''
}

/** 提交表单数据 */
function handleSubmit() {
  // 如果登录按钮正在loading。不再次执行登录
  if (loading.value) return

  // 表单校验
  refForm.value.validate(async (isValidate: boolean, model: LoginParam, _errors: any) => {
    if (!isValidate) return

    setLoading(true)
    try {
      // 登录
      await loginApi({ ...cloneDeep(model) })
      // 路由跳转
      const { from, ...othersQuery } = router.currentRoute.value.query
      router.push({
        path: (from as string) || HOME_ROUTE,
        query: {
          ...othersQuery,
        },
      })
      // 登录成功提示
      layer.notify({
        title: '登录成功',
        content: '欢迎回来~',
        area: '300px',
        icon: 1,
        time: 1000,
      })
    } catch (err) {
      layer.msg((err as Error).message, { icon: 2 })
    } finally {
      setLoading(false)
    }
  })
}

onMounted(() => {
  // 渲染banner
  useLottie({
    name: 'banner',
    containerId: '#banner',
    animationData: LottieBanner,
  })

  // 渲染logo
  useLottie({
    name: 'logo',
    containerId: '#logo',
    animationData: LottieLogo,
  })

  // 获取验证码
  changeVerifyCode()
})
</script>

<template>
  <div class="select-none">
    <img :src="loginBg" class="wave">
    <div class="login-container">
      <div class="img">
        <div id="banner" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <div id="logo" class="logo" />
          <h2 class="outline-none">
            {{ PROJECT_NAME }}
          </h2>

          <lay-form ref="refForm" :model="loginForm" :rules="rules" size="large" required>
            <lay-form-item prop="account" label-width="0" required>
              <lay-input v-model="loginForm.account" placeholder="请输入账号" allow-clear>
                <template #prefix>
                  <lay-icon type="layui-icon-username" />
                </template>
              </lay-input>
            </lay-form-item>

            <lay-form-item prop="password" label-width="0" required>
              <lay-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                password
                allow-clear
              >
                <template #prefix>
                  <lay-icon type="layui-icon-password" />
                </template>
              </lay-input>
            </lay-form-item>

            <lay-form-item prop="code" label-width="0" required>
              <lay-input v-model="loginForm.code" placeholder="请输入验证码" :maxlength="verifyCodeMaxLength" allow-clear>
                <template #prefix>
                  <lay-icon type="layui-icon-vercode" />
                </template>
                <template #append>
                  <img class="verifyCode" :src="verifyCode" @click="changeVerifyCode">
                </template>
              </lay-input>
            </lay-form-item>

            <lay-space :size="16" direction="vertical" fill wrap>
              <div class="login-form-password-actions">
                <lay-checkbox
                  v-model="loginForm.remember"
                  value="true"
                  skin="primary"
                  @change="setRemember"
                >
                  记住登录
                </lay-checkbox>
                <div>忘记密码</div>
              </div>
              <lay-button type="primary" fluid :loading="loading" @click="handleSubmit">
                登录
              </lay-button>
            </lay-space>
          </lay-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("./login.less");

:deep(.layui-input-block) {
  margin-left: 0!important;
}

:deep(.layui-input-append) {
  padding: 0;
}

:deep(.layui-input-wrapper) {
  background-color: white;
}
</style>
