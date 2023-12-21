import type { ApiResult, PageParam, PageResult, TaskLog, TaskLogDTO } from '~/types'
import { jobRequest as request } from '~/utils/request'

enum Api {
  Page = '/taskLog/page',
}

/**
 * 分页查询
 * @returns
 */
export function pageTaskLogApi(param: PageParam<TaskLog>) {
  return request.post<ApiResult<PageResult<TaskLogDTO>>>(Api.Page, { data: param })
}
