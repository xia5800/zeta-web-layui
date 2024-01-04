import type { TreeData } from '~/types/layui/tree'
import type { SysMenu } from '~/types/system/menu'

/**
 * zetaTree to layuiTree
 *
 * 说明：
 * 因为zeta-kotlin项目定义的树形结构字段与layui的树形结构不一致，故需要手动转换
 * @param menuTrees 树状结构的菜单数据
 * @param spread 是否展开
 */
export function toTreeData(menuTrees?: SysMenu[], spread = false): TreeData[] {
  if (!menuTrees) return [] as TreeData[]

  return menuTrees.map((menu: SysMenu) => ({
    id: menu.id,
    title: menu.label,
    field: menu.icon,
    children: toTreeData(menu.children, spread),
    spread,
  } as unknown as TreeData))
}

/**
 * 筛选得到所有的id
 *
 * 说明：用于全部展开、全部收起
 * @param treeDatas
 * @returns
 */
export function filterId(treeDatas: TreeData[]): string[] {
  let result: Array<string> = []
  treeDatas.forEach((tree: TreeData) => {
    let childrenIds: string[] = []
    if (tree.children && tree.children.length) {
      childrenIds = filterId(tree.children)
    }

    result.push(tree.id as string)
    result = result.concat(childrenIds)
  })
  return result
}

/**
 * 通过id查询指定菜单
 * @param treeDatas 菜单数组
 * @param id 菜单id
 * @returns 查到的菜单
 */
export function filterMenu(treeDatas: SysMenu[], id: string): SysMenu {
  if (!treeDatas.length) return {}
  // 查一级
  const data = treeDatas.find(treeData => treeData.id === id)
  if (data) return data

  // 查子级
  let result = {} as SysMenu
  for (let i = 0; i < treeDatas.length; i++) {
    result = filterMenu(treeDatas[i].children || [], id)
    if (result) break
  }
  return result
}

/**
 * 筛选所有被选中的菜单的id
 *
 * 说明：角色-分配权限用
 * @param sysMeny
 */
export function filterCheckedMenuId(menuTrees?: SysMenu[]): string[] {
  if (!menuTrees) return []

  // 所有被选中的菜单id
  let result: Array<string> = []

  // 遍历
  menuTrees.forEach((menu: SysMenu) => {
    let childrenIds: string[] = []
    if (menu.children && menu.children.length) {
      childrenIds = filterCheckedMenuId(menu.children)
    }

    // 如果菜单被选中
    if (menu.checked) {
      result.push(menu.id as string)
      result = result.concat(childrenIds)
    }
  })
  return result
}
