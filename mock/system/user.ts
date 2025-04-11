import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import type { FakeRoute, ProcessedRequest } from 'vite-plugin-fake-server'
import type { PageResult } from '../../src/types/global'
import type { SysUser } from '../../src/types/system/user'
import { checkFailure, getRequestToken, resultError, resultOk } from '../util'
import { pageResult, queryResult } from '../mock_data/user'

/** 分页查询api */
function pageApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/page',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      let page = (request.body.page as number) - 1
      if (page < 0) page = 0
      return resultOk<PageResult<SysUser>>(pageResult[page].data as unknown as PageResult<SysUser>)
    },
  }
}

/** 批量查询api */
function queryApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/query',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<SysUser[]>(queryResult.data as unknown as SysUser[])
    },
  }
}

/** 单体查询api */
function getApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/:id',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const params = request.params
      if (!params.id) return checkFailure('用户id不能为空')
      // 校验params.id是否为纯数字
      if (!/^\d+$/.test(params.id as string)) return checkFailure(`错误的用户id${params.id}`)

      const user = queryResult.data?.find(i => i.id === params.id!)
      return resultOk<SysUser>(user as unknown as SysUser)
    },
  }
}

/** 新增api */
function addApi(): FakeRoute {
  return {
    url: '/mock-api/system/user',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.username) return checkFailure('用户名不能为空')
      if (body.username && body.username.length > 32) return checkFailure('用户名长度不能大于32')
      if (!body.account) return checkFailure('账号不能为空')
      if (body.account && body.account.length > 32) return checkFailure('账号长度不能大于32')
      if (!body.password) return checkFailure('密码不能为空')
      if (body.password && body.password.length > 10) return checkFailure('密码长度不能大于10')
      if (!body.sex) return checkFailure('性别不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 修改api */
function updateApi(): FakeRoute {
  return {
    url: '/mock-api/system/user',
    method: 'put',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('id不能为空')
      if (!body.username) return checkFailure('用户名不能为空')
      if (body.username && body.username.length > 32) return checkFailure('用户名长度不能大于32')
      if (!body.sex) return checkFailure('性别不能为空')

      if (body.id === '1610517191113834496') {
        return resultError('用户[zeta管理员]禁止修改')
      }
      return resultOk<boolean>(true)
    },
  }
}

/** 删除api */
function deleteApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/:id',
    method: 'delete',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const params = request.params
      if (params.id === '1610517191113834496') {
        return resultError('用户[zeta管理员]禁止删除')
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 批量删除api */
function batchDeleteApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/batch',
    method: 'delete',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if ('1610517191113834496' in (body as string[])) {
        return resultError('用户[zeta管理员]禁止删除')
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 修改自己的密码 */
function changePwdApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/changePwd',
    method: 'put',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (body.oldPwd == null) return checkFailure('密码不能为空')
      if (body.newPwd == null) return checkFailure('新密码不能为空')

      return resultOk<boolean>(true)
    },
  }
}


/** 修改用户基本信息 */
function changeUserBaseInfoApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/changeUserBaseInfo',
    method: 'put',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.username) return checkFailure('用户名不能为空')
      if (body.username && body.username.length > 32) return checkFailure('用户名长度不能大于32')
      if (!body.sex) return checkFailure('性别不能为空')

      return resultOk<boolean>(true)
    },
  }
}

/** 重置用户密码 */
function resetPwdApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/restPwd',
    method: 'put',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('用户id不能为空')
      if (body.password == null) return checkFailure('密码不能为空')

      if (request.body.id === '1610517191113834496') {
        return resultError('用户[zeta管理员]禁止重置密码')
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 修改用户状态 */
function updateStateApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/state',
    method: 'put',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.body
      if (!body.id) return checkFailure('用户id不能为空')
      if (body.state == null) return checkFailure('状态不能为空')

      if (request.body.id === '1610517191113834496') {
        return resultError('用户[zeta管理员]禁止修改状态')
      }

      return resultOk<boolean>(true)
    },
  }
}

/** 验证字段是否存在 */
function existenceApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/existence',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const body = request.query
      if (body.field == null) return checkFailure('检查的字段不能为空')
      if (body.value == null) return checkFailure('检查的字段值不能为空')

      if (body.id === '1610517191113834496') {
        return resultOk<boolean>(true, { message: `${body.value}已存在` })
      }

      if (queryResult.data.find(user => user.account === body.value)) {
        return resultOk<boolean>(true, { message: `${body.value}已存在` })
      }

      return resultOk<boolean>(false, { message: 'zetaAdmin不存在' })
    },
  }
}

/** 导入用户 */
function importApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/import',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      return resultOk<boolean>(true)
    }
  }
}

/** 获取导入模板 */
function getImportTemplateApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/template',
    method: 'get',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const params = request.query
      if (!params.fileName) return checkFailure('excel模板文件名不能为空')
      if (!params.type) return checkFailure('excel模板类型不能为空')

      // 响应excel文件
      return checkFailure('mock环境暂不支持导出excel文件')
    }
  }
}

/** 导出用户数据 */
function exportUserApi(): FakeRoute {
  return {
    url: '/mock-api/system/user/export',
    method: 'post',
    response: (request: ProcessedRequest) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('未能读取到有效Token', { code: 401 })
      }

      const params = request.body
      if (!params.fileName) return checkFailure('excel文件名不能为空')
      if (!params.queryParam) return checkFailure('查询条件不能为空')
      if (!params.type) return checkFailure('excel文件类型不能为空')

      // 响应excel文件
      return checkFailure('mock环境暂不支持导出excel文件')
    }
  }
}

export default defineFakeRoute([
  importApi(),
  getImportTemplateApi(),
  exportUserApi(),
  existenceApi(),
  getApi(),
  pageApi(),
  queryApi(),
  addApi(),
  updateApi(),
  deleteApi(),
  batchDeleteApi(),
  changePwdApi(),
  changeUserBaseInfoApi(),
  resetPwdApi(),
  updateStateApi(),
])
