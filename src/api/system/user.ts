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
 * @returns
 */
export function pageUserApi(param: PageParam<SysUser>) {
  return request.post<ApiResult<PageResult<SysUser>>>(Api.Page, {
    data: param,
  })
}

/**
 * 查询所有
 * @returns
 */
export function queryUserApi(param: SysUser = {}) {
  return request.post<ApiResult<SysUser[]>>(Api.Query, { data: param })
}

/**
 * 获取指定用户信息
 * @param id
 * @returns
 */
export function getUserApi(id: string) {
  return request.get<ApiResult<SysUser>>(`${Api.Common}/${id}`)
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addUserApi(param: SysUserSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateUserApi(param: SysUserUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteUserApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteUserApi(ids: string[]) {
  return request.delete<ApiResult<Boolean>>(Api.Batch, { data: { ids } })
}

/**
 * 修改自己的密码
 * @param param
 * @returns
 */
export function changeUserPasswordApi(param: ChangePasswordParam) {
  return request.put<ApiResult<Boolean>>(Api.ChangePwd, {
    data: param,
    repeatSubmit: false,
  })
}

/**
 * 重置用户密码
 * @param param
 * @returns
 */
export function resetUserPasswordApi(param: ResetPwdParam) {
  return request.put<ApiResult<Boolean>>(Api.RestPwd, {
    data: param,
    repeatSubmit: false,
  })
}

/**
 * 修改状态
 * @param param
 * @returns
 */
export function updateUserStateApi(param: UpdateStateParam<string, number>) {
  return request.put<ApiResult<boolean>>(Api.UpdateState, { data: param })
}

/**
 * 验证字段是否存在
 * @param param
 * @returns
 */
export function existenceUserApi(param: ExistParam<string>) {
  return request.get<ApiResult<boolean>>(Api.Existence, { params: param })
}
