/**
 * 字典项
 */
export interface SysDictItem {
  /** 字典项id */
  id?: string
  /** 字典id */
  dictId?: string
  /** 字典项 */
  name?: string
  /** 值 */
  value?: string
  /** 描述 */
  describe?: string
  /** 排序 */
  sortValue?: number
}

/**
 * 修改字典项参数
 */
export interface SysDictItemUpdateParam {
  /** 字典项id */
  id: string
  /** 字典id */
  dictId: string
  /** 字典项 */
  name: string
  /** 值 */
  value: string
  /** 描述 */
  describe?: string
  /** 排序 */
  sortValue?: number
}

/**
 * 新增字典项参数
 *
 * 说明：
 * 利用Omit排除掉了UpdateParam的id字段
 */
export interface SysDictItemSaveParam extends Omit<SysDictItemUpdateParam, 'id'> {}
