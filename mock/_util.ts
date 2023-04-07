/**
 * 请求头参数
 */
export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 */
export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization
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
