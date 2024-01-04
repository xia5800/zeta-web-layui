import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { SysDict, SysDictSaveParam, SysDictUpdateParam } from '~/types/system/dict'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/dict/page',
  Query = '/system/dict/query',
  Common = '/system/dict',
  Batch = '/system/dict/batch',
}

/**
 * 分页查询
 * @returns
 */
export function pageDictApi(param: PageParam<SysDict>) {
  return request.post<ApiResult<PageResult<SysDict>>>(Api.Page, { data: param })
}

/**
 * 查询所有
 * @returns
 */
export function queryDictApi(param: SysDict = {}) {
  return request.post<ApiResult<SysDict[]>>(Api.Query, { data: param })
}

/**
 * 单体查询
 * @param id
 * @returns
 */
export function getDictApi(id: string) {
  return request.get<ApiResult<SysDict>>(`${Api.Common}/${id}`)
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addDictApi(param: SysDictSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateDictApi(param: SysDictUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteDictApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteDictApi(ids: string[]) {
  return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}
