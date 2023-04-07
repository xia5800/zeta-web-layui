import type { ApiResult, SysMenu, SysRoleMenuHandleParam } from '~/types'
import { request } from '~/utils/request'

enum Api {
  Common = '/system/roleMenu',
}

/**
 * 查询角色菜单
 *
 * @param roleId 角色id
 * @returns
 */
export function listRoleMenuApi(roleId: string) {
  return request.get<ApiResult<SysMenu[]>>(`${Api.Common}/${roleId}`)
}

/**
 * 新增或修改
 * @returns
 */
export function updateRoleMenuApi(param?: SysRoleMenuHandleParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}
