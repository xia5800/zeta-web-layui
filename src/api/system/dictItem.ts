import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { SysDictItem, SysDictItemSaveParam, SysDictItemUpdateParam } from '~/types/system/dictItem'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/dictItem/page',
  Query = '/system/dictItem/query',
  Common = '/system/dictItem',
  Batch = '/system/dictItem/batch',
}

/**
 * 分页查询
 * @return
 */
export function pageDictItemApi(param: PageParam<SysDictItem>) {
  return request.post<ApiResult<PageResult<SysDictItem>>>(Api.Page, { data: param })
}

/**
 * 查询所有
 * @return
 */
export function queryDictItemApi(param: SysDictItem = {}) {
  return request.post<ApiResult<SysDictItem[]>>(Api.Query, { data: param })
}

/**
 * 单体查询
 * @param id
 * @return
 */
export function getDictItemApi(id: string) {
  return request.get<ApiResult<SysDictItem>>(`${Api.Common}/${id}`)
}

/**
 * 新增
 * @param param
 * @return
 */
export function addDictItemApi(param: SysDictItemSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @return
 */
export function updateDictItemApi(param: SysDictItemUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @return
 */
export function deleteDictItemApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @return
 */
export function batchDeleteDictItemApi(ids: string[]) {
  return request.delete<ApiResult<boolean>>(Api.Batch, { data: ids })
}
