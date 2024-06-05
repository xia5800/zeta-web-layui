import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { SysRole, SysRoleSaveParam, SysRoleUpdateParam } from '~/types/system/role'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/role/page',
  Query = '/system/role/query',
  Common = '/system/role',
  Batch = '/system/role/batch',
}

/**
 * 分页查询
 * @return
 */
export function pageRoleApi(param: PageParam<SysRole>) {
  return request.post<ApiResult<PageResult<SysRole>>>(Api.Page, { data: param })
}

/**
 * 查询所有
 * @return
 */
export function queryRoleApi(param: SysRole = {}) {
  return request.post<ApiResult<SysRole[]>>(Api.Query, { data: param })
}

/**
 * 获取指定角色信息
 * @param id
 * @return
 */
export function getRoleApi(id: string) {
  return request.get<ApiResult<SysRole>>(`${Api.Common}/${id}`)
}

/**
 * 新增
 * @param param
 * @return
 */
export function addRoleApi(param: SysRoleSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @return
 */
export function updateRoleApi(param: SysRoleUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @return
 */
export function deleteRoleApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @return
 */
export function batchDeleteRoleApi(ids: string[]) {
  return request.delete<ApiResult<boolean>>(Api.Batch, { data: ids })
}
