import { request } from '~/utils/request'

enum Api {
  NotLogin = '/exception/notLogin',
  NoPermission = '/exception/noPermission',
  SystemBusy = '/exception/systemBusy',
}

export function notLoginApi() {
  return request.get(Api.NotLogin)
}

export function noPermApi() {
  return request.get(Api.NoPermission)
}

export function sysBusyApi() {
  return request.get(Api.SystemBusy)
}
