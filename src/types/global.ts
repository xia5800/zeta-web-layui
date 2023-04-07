/**
 * 通用返回结果
 */
export interface ApiResult<T> {
  /** 编码 */
  code: number
  /** 是否操作成功。 code != 0 代表操作失败 */
  success: boolean
  /** 返回信息 */
  message?: string
  /** 返回数据 */
  data?: T
  /** 错误描述 */
  error?: string
}

/**
 * 分页查询返回结果
 */
export interface PageResult<T> {
  /** 当前页数据 */
  list?: T[]
  /** 总数量 */
  count?: string | number
}

/**
 * token信息
 */
export interface TokenInfo {
  /** token */
  token: string
  /** token名称 */
  tokenName: string
}

/**
 * 分页查询参数
 */
export interface PageParam<T> {
  /** 当前页 */
  page?: number
  /** 每页显示条数 */
  limit?: number
  /** 查询条件 */
  model?: T
  /** 排序字段 支持驼峰、下划线 */
  sort?: string
  /** 排序规则 */
  order?: 'desc' | 'asc'
}

/**
 * 验证存在参数
 *
 * 说明：
 *
 * 新增用户的时候，验证用户名(username)的值(张三)是否被人使用了
 * ```
 * {"field": "username",  "value": "张三"}
 * ```
 * 修改用户的时候，验证用户名(username)的值(李四)是否被除了当前用户id(2011214167781)的人使用了
 * ```
 * {"field": "username",  "value": "李四",  "id": "2011214167781"}
 * ```
 */
export interface ExistParam<T> {
  /** 检查的字段名 */
  field: string
  /** 检查的字段值 */
  value: string
  /** 主键字段的值  修改时用到 */
  id?: T
}

/**
 * 修改状态参数
 */
export interface UpdateStateParam<T, U> {
  /** 主键 */
  id: T
  /** 状态 */
  state: U
}
