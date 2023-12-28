import type { ApiResult, PageParam, PageResult, JobQueryParam, QuartzJobDetailDTO, JobClassListResult, JobSaveParam, JobTriggerUpdateParam, JobOperationParam, TriggerNextTimeParam } from '~/types'
import { jobRequest as request } from '~/utils/request'

enum Api {
  Page = '/job/page',
  Common = '/job',
  Pause = '/job/pause',
  Resume = '/job/resume',
  RunOnce = '/job/runOnce',
  JobClassList = '/job/jobClassList',
  NextTriggerTime = '/job/nextTriggerTime',
}

/**
 * 分页查询
 * @returns
 */
export function pageJobApi(param: PageParam<JobQueryParam>) {
  return request.post<ApiResult<PageResult<QuartzJobDetailDTO>>>(Api.Page, { data: param })
}

/**
 * 查询所有
 * @returns
 */
export function queryJobApi() {
  return request.get<ApiResult<QuartzJobDetailDTO[]>>(Api.Common)
}

/**
 * 查询任务执行类列表
 * @returns
 */
export function queryJobClassListApi() {
  return request.get<ApiResult<JobClassListResult[]>>(Api.JobClassList)
}

/**
 * 新增
 * @param param
 * @returns
 */
export function addJobApi(param: JobSaveParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @returns
 */
export function updateJobApi(param: JobTriggerUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param param
 * @returns
 */
export function deleteJobApi(param: JobOperationParam) {
  return request.delete<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 暂停任务
 * @param param
 * @returns
 */
export function pauseJobApi(param: JobOperationParam) {
  return request.post<ApiResult<Boolean>>(Api.Pause, { data: param })
}

/**
 * 恢复任务
 * @param param
 * @returns
 */
export function resumeJobApi(param: JobOperationParam) {
  return request.post<ApiResult<Boolean>>(Api.Resume, { data: param })
}

/**
 * 立即运行一次任务
 * @param param
 * @returns
 */
export function runOnceJobApi(param: JobOperationParam) {
  return request.post<ApiResult<Boolean>>(Api.RunOnce, { data: param })
}

/**
 * 获取下次触发时间
 *
 * @param param
 * @returns
 */
export function nextTriggerTimeApi(param: TriggerNextTimeParam) {
  return request.get<ApiResult<string[]>>(Api.NextTriggerTime, { params: param })
}
