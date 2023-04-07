import type { ApiResult, PageParam, PageResult, SysLoginLog } from '~/types'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/loginLog/page',
  Common = '/system/loginLog',
}

/**
 * 分页查询
 * @returns
 */
export function pageLoginLogApi(param: PageParam<SysLoginLog>) {
  return request.post<ApiResult<PageResult<SysLoginLog>>>(Api.Page, { data: param })
}

/**
 * 单体查询
 * @param id
 * @returns
 */
export function getLoginLogApi(id: string) {
  return request.get<ApiResult<SysLoginLog>>(`${Api.Common}/${id}`)
}
