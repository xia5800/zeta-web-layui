/**
 * 角色
 */
export interface SysRole {
  /** 角色id */
  id?: string
  /** 角色名 */
  name?: string
  /** 角色编码 */
  code?: string
  /** 描述 */
  describe?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createdBy?: string
  /** 最后修改时间 */
  updateTime?: string
  /** 修改人 */
  updatedBy?: string
  /** 用户id */
  userId?: string
}

/**
 * 修改角色参数
 */
export interface SysRoleUpdateParam {
  /** 角色id */
  id: string
  /** 角色名 */
  name: string
  /** 角色编码 */
  code: string
  /** 描述 */
  describe?: string
}

/**
 * 新增角色参数
 *
 * 说明：
 * 利用Omit排除掉了UpdateParam的id字段
 */
export interface SysRoleSaveParam extends Omit<SysRoleUpdateParam, 'id'> {}

/**
 * 批量新增、修改角色菜单关联关系
 */
export interface SysRoleMenuHandleParam {
  /** 角色id */
  roleId: string
  /** 菜单id列表 为空代表清空角色与菜单的关联 */
  menuIds?: string[]
}
