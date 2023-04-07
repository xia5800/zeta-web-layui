import type { ApiResult, PageParam, PageResult, SysOptLog } from '~/types'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/optLog/page',
  Common = '/system/optLog',
}

/**
 * 分页查询
 * @returns
 */
export function pageOptLogApi(param: PageParam<SysOptLog>) {
  return request.post<ApiResult<PageResult<SysOptLog>>>(Api.Page, { data: param })
}

/**
 * 单体查询
 * @param id
 * @returns
 */
export function getOptLogApi(id: string) {
  return request.get<ApiResult<SysOptLog>>(`${Api.Common}/${id}`)
}
