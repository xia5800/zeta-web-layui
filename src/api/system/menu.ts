import type { ApiResult } from '~/types/global'
import type { SysMenu, SysMenuSaveParam, SysMenuUpdateParam } from '~/types/system/menu'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/menu/page',
  Query = '/system/menu/query',
  Common = '/system/menu',
  Tree = '/system/menu/tree',
  Batch = '/system/menu/batch',
}

/**
 * 查询菜单树
 * @returns
 */
export function menuTreeApi(param: SysMenu = {}) {
  return request.post<ApiResult<SysMenu[]>>(Api.Tree, { data: param })
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addMenuApi(param: SysMenuSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateMenuApi(param: SysMenuUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteMenuApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteMenuApi(ids: string[]) {
  return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}
