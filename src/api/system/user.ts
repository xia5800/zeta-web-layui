import type { ApiResult, PageParam, PageResult, UpdateStateParam, ExistParam } from '~/types/global'
import type {
  SysUser, SysUserSaveParam, SysUserUpdateParam,
  ChangePasswordParam, ResetPwdParam,
} from '~/types/system/user'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/user/page',
  Query = '/system/user/query',
  Common = '/system/user',
  Batch = '/system/user/batch',
  ChangePwd = '/system/user/changePwd',
  RestPwd = '/system/user/restPwd',
  UpdateState = '/system/user/state',
  Existence = '/system/user/existence',
}

/**
 * 分页查询
 * @return
 */
export function pageUserApi(param: PageParam<SysUser>) {
  return request.post<ApiResult<PageResult<SysUser>>>(Api.Page, {
    data: param,
  })
}

/**
 * 查询所有
 * @return
 */
export function queryUserApi(param: SysUser = {}) {
  return request.post<ApiResult<SysUser[]>>(Api.Query, { data: param })
}

/**
 * 获取指定用户信息
 * @param id
 * @return
 */
export function getUserApi(id: string) {
  return request.get<ApiResult<SysUser>>(`${Api.Common}/${id}`)
}

/**
 * 新增
 * @param param
 * @return
 */
export function addUserApi(param: SysUserSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @return
 */
export function updateUserApi(param: SysUserUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @return
 */
export function deleteUserApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @return
 */
export function batchDeleteUserApi(ids: string[]) {
  return request.delete<ApiResult<boolean>>(Api.Batch, { data: { ids } })
}

/**
 * 修改自己的密码
 * @param param
 * @return
 */
export function changeUserPasswordApi(param: ChangePasswordParam) {
  return request.put<ApiResult<boolean>>(Api.ChangePwd, {
    data: param,
    repeatSubmit: false,
  })
}

/**
 * 重置用户密码
 * @param param
 * @return
 */
export function resetUserPasswordApi(param: ResetPwdParam) {
  return request.put<ApiResult<boolean>>(Api.RestPwd, {
    data: param,
    repeatSubmit: false,
  })
}

/**
 * 修改状态
 * @param param
 * @return
 */
export function updateUserStateApi(param: UpdateStateParam<string, number>) {
  return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}

/**
 * 验证字段是否存在
 * @param param
 * @return
 */
export function existenceUserApi(param: ExistParam<string>) {
  return request.get<ApiResult<boolean>>(Api.Existence, { params: param })
}
