import { match } from 'path-to-regexp'
import type { MatchResult } from 'path-to-regexp'
import type { Recordable } from 'vite-plugin-mock'

/**
 * 请求头参数
 */
export interface RequestParams {
  url: string
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * 本函数用于从request数据中获取token，请根据项目的实际情况修改
 */
export function getRequestToken({ headers }: RequestParams) {
  return headers?.authorization
}

/**
 * 解析请求的params参数
 *
 * 说明：
 * params参数指的是path路径上的参数，比如：api/user/:id，id就是属于params参数
 * @param url 请求url。 例如： api/user/123456
 * @param mockUrl mock接口url。 例如：api/user/:id
 * @returns
 */
export function parseRequestParams(url: string, mockUrl: string) {
  const urlMatch = match(mockUrl, {
    decode: decodeURIComponent,
  })

  const result = urlMatch(url) as MatchResult<Recordable>
  return result.params || {}
}

/**
 * 返回失败
 * @param message
 * @param code
 * @param data
 * @returns
 */
export function resultError(
  message = '操作失败',
  { code = -1, data = null } = {},
) {
  return {
    code,
    success: false,
    message,
    data,
    error: null,
  }
}

/**
 * 返回成功
 * @param data
 * @param message
 * @param code
 * @returns
 */
export function resultOk<T>(data: T, { message = '操作成功', code = 0 } = {}) {
  return {
    code,
    success: true,
    message,
    data,
    error: null,
  }
}

/**
 * 参数校验失败
 * @param message
 * @returns
 */
export function checkFailure(message: string) {
  return resultError(message, { code: 1010 })
}
