import type { ApiResult, PageParam, PageResult } from '~/types/global'
import type { TaskLog, TaskLogDTO } from '~/types/job/taskLog'
import { jobRequest as request } from '~/utils/request'

enum Api {
  Page = '/taskLog/page',
}

/**
 * 分页查询
 * @return
 */
export function pageTaskLogApi(param: PageParam<TaskLog>) {
  return request.post<ApiResult<PageResult<TaskLogDTO>>>(Api.Page, { data: param })
}
