/**
 * 字典
 */
export interface SysDict {
  /** 字典id */
  id?: string
  /** 字典名 */
  name?: string
  /** 字典编码 */
  code?: string
  /** 描述 */
  describe?: string
  /** 排序 */
  sortValue?: number
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createdBy?: string
  /** 最后修改时间 */
  updateTime?: string
  /** 修改人 */
  updatedBy?: string
}

/**
 * 修改字典参数
 */
export interface SysDictUpdateParam {
  /** 字典id */
  id: string
  /** 字典名 */
  name: string
  /** 字典编码 */
  code: string
  /** 描述 */
  describe?: string
  /** 排序 */
  sortValue?: number
}

/**
 * 新增字典参数
 *
 * 说明：
 * 利用Omit排除掉了UpdateParam的id字段
 */
export interface SysDictSaveParam extends Omit<SysDictUpdateParam, 'id'> {}
