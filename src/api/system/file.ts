import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { SysFile, SysFileUploadParam } from '~/types/system/file'
import { request } from '~/utils/request'

enum Api {
  Page = '/system/file/page',
  Query = '/system/file/query',
  Common = '/system/file',
  Batch = '/system/file/batch',
  Upload = '/system/file/upload',
}

export const UploadUrl = Api.Upload

/**
 * 分页查询
 * @returns
 */
export function pageFileApi(param: PageParam<SysFile>) {
  return request.post<ApiResult<PageResult<SysFile>>>(Api.Page, { data: param })
}

/**
 * 查询所有
 * @returns
 */
export function queryFileApi(param: SysFile = {}) {
  return request.post<ApiResult<SysFile[]>>(Api.Query, { data: param })
}

/**
 * 单体查询
 * @param id
 * @returns
 */
export function getFileApi(id: string) {
  return request.get<ApiResult<SysFile>>(`${Api.Common}/${id}`)
}

/**
 * 文件上传
 * @param param
 * @returns
 */
export function uploadFileApi(param: SysFileUploadParam) {
  const data = new FormData()
  data.append('bizType', param.bizType || '')
  data.append('file', param.file)
  return request.post<ApiResult<SysFile>>(Api.Upload, {
    data,
    repeatSubmit: false,
  })
}

/**
 * 删除
 * @param id
 * @returns
 */
export function deleteFileApi(id: string) {
  return request.delete<ApiResult<boolean>>(`${Api.Common}/${id}`)
}

/**
 * 批量删除
 * @param ids
 * @returns
 */
export function batchDeleteFileApi(ids: string[]) {
  return request.delete<ApiResult<Boolean>>(Api.Batch, { data: ids })
}
