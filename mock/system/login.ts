import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute, ProcessedRequest } from 'vite-plugin-fake-server'
import type { CaptchaResult, UserMenu } from '../../src/types/login'
import type { UserInfo } from '../../src/types/system/user'
import captcha from '../mock_data/captcha'
import { getRequestToken, resultError, resultOk } from '../util'
import { loginUserInfo, loginUserMenu } from '../mock_data/login'

/** 登录验证码 */
const loginCaptcha: CaptchaResult[] = captcha
/** 登录用户信息 */
const userInfo: UserInfo = loginUserInfo
/** 登录用户可访问菜单 */
const userMenu: UserMenu[] = loginUserMenu as unknown as UserMenu[]

/** 登录api */
function loginApi(): FakeRoute {
  return {
    url: '/mock-api/login',
    method: 'post',
    response: ({ body }) => {
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
function logoutApi(): FakeRoute {
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
function captchaApi(): FakeRoute {
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
function userInfoApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/info',
    method: 'get',
    response: (request: ProcessedRequest) => {
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
function userMenuApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/menu',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      } else {
        return resultOk<Array<any>>(userMenu)
      }
    },
  }
}

export default defineFakeRoute([
  loginApi(),
  logoutApi(),
  captchaApi(),
  userInfoApi(),
  userMenuApi(),
])
