import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import { layer } from '@layui/layer-vue'
import { getToken, removeToken } from './token'
import { storageSession } from './cache'
import { CacheKey, LOGIN_ROUTE } from '~/types'
import { API_BASE_URL } from '~/config/setting'

/**
 * 扩展AxiosRequestConfig配置
 *
 * 如何使用：
 * ```
 * request.post('/xxx/xxxx/', {
 *  data: data,
 *  headers: { xxxx },
 *  isToken: false,  // 不携带token
 *  repeatSubmit: false, // 不允许短时间内重复请求
 *  repeatTips: true, // 启动重复请求提示
 * })
 * ```
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 请求携带token: true携带、false不携带。默认：true */
  isToken?: boolean
  /** 短时间内重复请求：true允许、false不允许。默认：true */
  repeatSubmit?: boolean
  /** 重复请求时间间隔，单位：毫秒。默认：1000ms */
  repeatInterval?: number
}

/**
 * axios配置
 */
const defaultConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  // 请求超时时间
  timeout: 10000,
}

class BaseRequest {
  /** axios实例 */
  private static axiosInstance: AxiosInstance = axios.create(defaultConfig)

  /** 构造方法 */
  constructor() {
    this.interceptorsRequestConfig()
    this.interceptorsResponseConfig()
  }

  /**
   * 显示错误信息
   * @param code 不可为空，http响应码，非接口返回的 { code:xxx }
   * @param msg 可为空，接口返回的 { message:xxx }
   */
  private showErrorMsg(code: number, msg?: string) {
    switch (code) {
      case 401: {
        // 登录过期处理
        layer.msg(msg || '登录状态已过期', { icon: 2, time: 1000 }, () => {
          removeToken()
          window.location.href = LOGIN_ROUTE
        })
        break
      }
      case 403: {
        // 无权限处理
        layer.msg(msg || '没有权限', { icon: 2 })
        break
      }
      case 500: {
        // 系统错误
        layer.msg(msg || '系统错误', { icon: 2 })
        break
      }
      default: {
        // 未知错误
        if (msg) layer.msg(msg, { icon: 2 })
        break
      }
    }
  }

  /**
   * 添加token到header
   *
   * @param config
   */
  private handleToken(config: RequestConfig) {
    // 接口是否携带token
    const isToken = config.isToken === false

    // 设置token
    const tokenInfo = getToken()
    if (!isToken && tokenInfo && config.headers) {
      config.headers[tokenInfo.tokenName] = tokenInfo.token
    }
  }

  /**
   * 处理重复提交
   *
   * 说明：该方法抄自ruoyi代码
   * @param config
   */
  private async handleRepeatSubmit(config: RequestConfig) {
    // 是否需要防止数据重复提交。为false时不允许短时间重复提交，默认为true
    const isRepeatSubmit = config.repeatSubmit ?? true

    // 处理重复提交
    if (!isRepeatSubmit) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      }

      // 从缓存中获取请求数据
      const sessionObj = storageSession().getItem(CacheKey.REQ_DATA_CACHE_KEY)
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        storageSession().setItem(CacheKey.REQ_DATA_CACHE_KEY, requestObj)
        return
      }

      // 间隔时间(ms)，小于此时间视为重复提交
      const interval = config.repeatInterval || 1000
      // 请求地址
      const s_url = sessionObj.url
      // 请求数据
      const s_data = sessionObj.data
      // 请求时间
      const s_time = sessionObj.time

      // 判断是否重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${s_url}]: ${message}`)
        return Promise.reject(new Error(message))
      } else {
        storageSession().setItem(CacheKey.REQ_DATA_CACHE_KEY, requestObj)
      }
    }
  }

  /**
   * 请求拦截器配置
   */
  private interceptorsRequestConfig() {
    BaseRequest.axiosInstance.interceptors.request.use(
      async (config) => {
        const requestConfig = config as RequestConfig
        // 添加token到header
        this.handleToken(requestConfig)

        // 处理重复提交
        await this.handleRepeatSubmit(requestConfig)

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /**
   * 响应拦截器配置
   */
  private interceptorsResponseConfig() {
    BaseRequest.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // 解构错误信息，拿到AxiosResponse
        const { message, response } = error
        if (!response) {
          // 网络错误，请求超时处理
          if (message === 'Network Error') {
            layer.msg('后端接口连接异常', { icon: 2 })
          } else if (message.includes('timeout')) {
            layer.msg('系统接口请求超时', { icon: 2 })
          }
          return Promise.reject(error)
        }

        // 解构AxiosResponse，拿到错误码和接口响应数据
        const { status, data } = response
        // 显示错误信息
        this.showErrorMsg(status, data.message)
        return Promise.reject(data)
      },
    )
  }

  /**
   * 通用请求方法
   * @param method 请求方式 GET, POST, PUT, DELETE
   * @param url 请求url
   * @param param 请求参数 {params: {}, body: {}}
   * @returns
   */
  public request<T>(method: Method, url: string, param?: RequestConfig): Promise<T> {
    const config = { method, url, ...param } as RequestConfig
    return new Promise((resolve, reject) => {
      BaseRequest.axiosInstance
        .request(config)
        .then((resp) => {
          resolve(resp.data)
        }).catch((error) => {
          // 如果error类型不是Error, 在then里面处理
          if (!(error instanceof Error)) {
            resolve(error)
          }

          // 如果error类型是Error, 在catch里面处理
          reject(error)
        })
    })
  }

  /**
   * GET请求
   * @param url 请求url
   * @param param 请求参数 {params: {}}
   * @returns
   */
  public get<T>(url: string, param?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, param)
  }

  /**
   * POST请求
   * @param url 请求url
   * @param param 请求参数 {params: {}, body: {}}
   * @returns
   */
  public post<T>(url: string, param?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, param)
  }

  /**
   * PUT请求
   * @param url 请求url
   * @param param 请求参数 {params: {}, body: {}}
   * @returns
   */
  public put<T>(url: string, param?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, param)
  }

  /**
   * DELETE请求
   * @param url 请求url
   * @param param 请求参数 {params: {}}
   * @returns
   */
  public delete<T>(url: string, param?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, param)
  }
}

export const request = new BaseRequest()
