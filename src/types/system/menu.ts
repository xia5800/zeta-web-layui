/**
 * 菜单
 */
export interface SysMenu {
  /** id */
  id?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  createdBy?: string
  /** 修改时间 */
  updateTime?: string
  /** 修改人 */
  updatedBy?: string
  /** 菜单名称 */
  label?: string
  /** 父级Id */
  parentId?: string
  /** 排序 */
  sortValue?: number
  /** 子节点 */
  children?: SysMenu[]
  /** 路由名称 */
  name?: string
  /** 路由地址 */
  path?: string
  /** 组件 */
  component?: string
  /** 重定向地址 */
  redirect?: string
  /** 图标 */
  icon?: string
  /** 权限标识 */
  authority?: string
  /** 菜单类型 */
  type?: 'MENU' | 'RESOURCE'
  /** 是否隐藏 */
  hide?: boolean
  /** 是否缓存 */
  keepAlive?: boolean
  /** 外链地址 */
  href?: string
  /** 内链地址 */
  frameSrc?: string
  /** 是否选中 说明：只有在角色-分配权限时才有返回值 */
  checked?: boolean
}

/**
 * 修改菜单参数
 */
export interface SysMenuUpdateParam {
  /** id */
  id: string
  /** 父级id */
  parentId: string
  /** 菜单名称 */
  label: string
  /** 排序 */
  sortValue?: number
  /** 路由名称 */
  name: string
  /** 路由地址 */
  path?: string
  /** 组件 */
  component?: string
  /** 重定向地址 */
  redirect?: string
  /** 图标 */
  icon?: string
  /** 权限标识 */
  authority?: string
  /** 菜单类型 */
  type?: 'MENU' | 'RESOURCE'
  /** 是否隐藏 0否 1是 */
  hide?: boolean
  /** 是否缓存 */
  keepAlive?: boolean
  /** 外链地址 */
  href?: string
  /** 内链地址 */
  frameSrc?: string
}

/**
 * 新增菜单参数
 *
 * 说明：
 * 利用Omit排除掉了UpdateParam的id字段
 */
export interface SysMenuSaveParam extends Omit<SysMenuUpdateParam, 'id'> {}
