import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { SysLoginLog } from '~/types/system/loginLog'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/loginLog/page',
  Common = '/system/loginLog',
}

/**
 * 分页查询
 * @return
 */
export function pageLoginLogApi(param: PageParam<SysLoginLog>) {
  return request.post<ApiResult<PageResult<SysLoginLog>>>(Api.Page, { data: param })
}

/**
 * 单体查询
 * @param id
 * @return
 */
export function getLoginLogApi(id: string) {
  return request.get<ApiResult<SysLoginLog>>(`${Api.Common}/${id}`)
}
