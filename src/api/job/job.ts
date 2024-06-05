import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type {
  JobQueryParam, QuartzJobDetailDTO, JobClassListResult,
  JobOperationParam, TriggerNextTimeParam, JobSaveOrUpdateParam,
  JobRunOnceParam
} from '~/types/job/job'
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
 * @return
 */
export function pageJobApi(param: PageParam<JobQueryParam>) {
  return request.post<ApiResult<PageResult<QuartzJobDetailDTO>>>(Api.Page, { data: param })
}

/**
 * 查询任务执行类列表
 * @return
 */
export function queryJobClassListApi() {
  return request.get<ApiResult<JobClassListResult[]>>(Api.JobClassList)
}

/**
 * 新增
 * @param param
 * @return
 */
export function addJobApi(param: JobSaveOrUpdateParam) {
  return request.post<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 修改
 * @param param
 * @return
 */
export function updateJobApi(param: JobSaveOrUpdateParam) {
  return request.put<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 删除
 * @param param
 * @return
 */
export function deleteJobApi(param: JobOperationParam) {
  return request.delete<ApiResult<boolean>>(Api.Common, { data: param })
}

/**
 * 暂停任务
 * @param param
 * @return
 */
export function pauseJobApi(param: JobOperationParam) {
  return request.post<ApiResult<boolean>>(Api.Pause, { data: param })
}

/**
 * 恢复任务
 * @param param
 * @return
 */
export function resumeJobApi(param: JobOperationParam) {
  return request.post<ApiResult<boolean>>(Api.Resume, { data: param })
}

/**
 * 立即运行一次任务
 * @param param
 * @return
 */
export function runOnceJobApi(param: JobRunOnceParam) {
  return request.post<ApiResult<boolean>>(Api.RunOnce, { data: param })
}

/**
 * 获取下次触发时间
 *
 * @param param
 * @return
 */
export function nextTriggerTimeApi(param: TriggerNextTimeParam) {
  return request.get<ApiResult<string[]>>(Api.NextTriggerTime, { params: param })
}
