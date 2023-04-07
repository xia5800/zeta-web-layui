import type { ApiResult, CaptchaResult, LoginParam, LoginResult, UserInfo, UserMenu } from '~/types'
import { cryptoEncode } from '~/utils/crypto'
import { request } from '~/utils/request'
import { setToken } from '~/utils/token'

enum Api {
  Login = '/login',
  Logout = '/logout',
  Captcha = '/captcha',
  GetUserInfo = '/system/user/info',
  GetUserMenu = '/system/user/menu',
}

/**
 * 用户登录
 * @param data 登录参数
 * @returns
 */
export async function loginApi(param: LoginParam) {
  // 密码加密
  param.password = cryptoEncode(param.password)
  const { success, message, data } = await request.post<ApiResult<LoginResult>>(Api.Login, { data: param })
  if (!success) return Promise.reject(new Error(message))

  const userStore = useUserStore()
  setToken(data, param.remember)
  userStore.setRemember(param.remember ?? false)
  return Promise.resolve(message)
}

/**
 * 注销登录
 * @returns
 */
export function logoutApi() {
  return request.get<ApiResult<boolean>>(Api.Logout)
}

/**
 * 获取验证码
 * @returns
 */
export function captchaApi() {
  return request.get<ApiResult<CaptchaResult>>(Api.Captcha)
}

/**
 * 获取当前用户基本信息
 * @returns
 */
export function getUserInfoApi() {
  return request.get<ApiResult<UserInfo>>(Api.GetUserInfo)
}

/**
 * 获取当前用户菜单
 * @returns
 */
export function getUserMenuApi() {
  return request.get<ApiResult<UserMenu[]>>(Api.GetUserMenu)
}
