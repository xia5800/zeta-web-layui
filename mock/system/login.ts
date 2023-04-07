import type { MockMethod, Recordable } from 'vite-plugin-mock'
import { getRequestToken, resultError, resultOk } from '../_util'
import type { requestParams } from '../_util'
import type { CaptchaResult, UserInfo, UserMenu } from '../../src/types'
import captcha from '../_data/captcha'
import { loginUserInfo, loginUserMenu } from '../_data/login'

/** 登录验证码 */
const loginCaptcha: CaptchaResult[] = captcha
/** 登录用户信息 */
const userInfo: UserInfo = loginUserInfo
/** 登录用户可访问菜单 */
const userMenu: UserMenu[] = loginUserMenu as unknown as UserMenu[]

/** 登录api */
function loginApi(): MockMethod {
  return {
    url: '/mock-api/login',
    method: 'post',
    response: ({ body }: { body: Recordable }) => {
      if (!loginCaptcha.map(i => i.text).includes(body.code)) {
        return resultError('验证码错误')
      }
      if (body.account !== 'zetaAdmin') {
        return resultError('用户不存在')
      } else if (body.password !== 'dDEWFk6fJKwZ55cL3zVUsQ==') {
        return resultError('密码错误')
      } else {
        return resultOk({
          token: 'UI_aPpxyY2KsZD8xh_zqNMGLihpUsJWS9x__',
          tokenName: 'Authorization',
        }, {
          message: '登录成功',
        })
      }
    },
  }
}

/** 注销api */
function logoutApi(): MockMethod {
  return {
    url: '/mock-api/logout',
    method: 'get',
    response: () => {
      return resultOk(true)
    },
  }
}

let index = 0
/** 获取验证码api */
function captchaApi(): MockMethod {
  return {
    url: '/mock-api/captcha',
    method: 'get',
    response: () => {
      if (index === 0) {
        index = 1
      } else {
        index = 0
      }
      return resultOk(loginCaptcha[index])
    },
  }
}

/** 获取登录用户信息api */
function userInfoApi(): MockMethod {
  return {
    url: '/mock-api/system/user/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      } else {
        return resultOk<UserInfo>(userInfo)
      }
    },
  }
}

/** 获取登录用户可访问菜单api */
function userMenuApi(): MockMethod {
  return {
    url: '/mock-api/system/user/menu',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      } else {
        return resultOk<Array<any>>(userMenu)
      }
    },
  }
}

export default [
  loginApi(),
  logoutApi(),
  captchaApi(),
  userInfoApi(),
  userMenuApi(),
] as MockMethod[]
