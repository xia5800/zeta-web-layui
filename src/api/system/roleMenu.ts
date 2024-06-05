import type { ApiResult } from '~/types/global'
import type { SysMenu } from '~/types/system/menu'
import type { SysRoleMenuHandleParam } from '~/types/system/role'
import { request } from '~/utils/request'

enum Api {
  Common = '/system/roleMenu',
}

/**
 * 查询角色菜单
 *
 * @param roleId 角色id
 * @return
 */
export function listRoleMenuApi(roleId: string) {
  return request.get<ApiResult<SysMenu[]>>(`${Api.Common}/${roleId}`)
}

/**
 * 新增或修改
 * @return
 */
export function updateRoleMenuApi(param?: SysRoleMenuHandleParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}
