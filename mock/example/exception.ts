import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute } from 'vite-plugin-fake-server'
import { resultError } from '../util'

/** 没有登录api */
function notLoginApi(): FakeRoute {
  return {
    url: '/mock-api/exception/notLogin',
    method: 'get',
    statusCode: 401,
    response: () => {
      return resultError('未能读取到有效Token', { code: 401 })
    },
  }
}

/** 没有权限api */
function noPermissionApi(): FakeRoute {
  return {
    url: '/mock-api/exception/noPermission',
    method: 'get',
    statusCode: 403,
    response: () => {
      return resultError('没有访问权限sys:user:view', { code: 403 })
    },
  }
}

/** 系统错误 */
function systemBusyApi(): FakeRoute {
  return {
    url: '/mock-api/exception/systemBusy',
    method: 'get',
    statusCode: 500,
    response: () => {
      return resultError('系统错误', { code: 500 })
    },
  }
}

export default defineFakeRoute([
  notLoginApi(),
  noPermissionApi(),
  systemBusyApi(),
])
