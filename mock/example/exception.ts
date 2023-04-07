import type { MockMethod } from 'vite-plugin-mock'
import { resultError } from '../_util'

/** 没有登录api */
function notLoginApi(): MockMethod {
  return {
    url: '/exception/notLogin',
    method: 'get',
    statusCode: 401,
    response: () => {
      return resultError('未能读取到有效Token', { code: 401 })
    },
  }
}

/** 没有权限api */
function noPermissionApi(): MockMethod {
  return {
    url: '/exception/noPermission',
    method: 'get',
    statusCode: 403,
    response: () => {
      return resultError('没有访问权限sys:user:view', { code: 403 })
    },
  }
}

/** 系统错误 */
function systemBusyApi(): MockMethod {
  return {
    url: '/exception/systemBusy',
    method: 'get',
    statusCode: 500,
    response: () => {
      return resultError('系统错误', { code: 500 })
    },
  }
}

export default [
  notLoginApi(),
  noPermissionApi(),
  systemBusyApi(),
] as MockMethod[]
