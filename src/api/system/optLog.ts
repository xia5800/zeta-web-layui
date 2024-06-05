import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { SysOptLog } from '~/types/system/optLog'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/optLog/page',
  Common = '/system/optLog',
}

/**
 * 分页查询
 * @return
 */
export function pageOptLogApi(param: PageParam<SysOptLog>) {
  return request.post<ApiResult<PageResult<SysOptLog>>>(Api.Page, { data: param })
}

/**
 * 单体查询
 * @param id
 * @return
 */
export function getOptLogApi(id: string) {
  return request.get<ApiResult<SysOptLog>>(`${Api.Common}/${id}`)
}
