import type { RouteItem } from '~/types/router'

/**
 * 查找父节点
 * @param node 子节点
 * @param parentNames 父级菜单name数组
 * @param name 当前菜单的名称
 * @return
 */
function findParentNode(node: RouteItem, parentNames: string[], name: string) {
  if (node.name === name) {
    parentNames.push(name)
    return true
  }

  // 如果当前节点有子节点，则继续遍历子节点
  if (node.children) {
    for (const childNode of node.children) {
      // 如果在子节点中找到了子节点的父节点
      // 则将当前节点的name添加到父节点name数组中，并返回true表示已经找到了子节点
      if (findParentNode(childNode, parentNames, name)) {
        parentNames.push(node.name)
        return true
      }
    }
  }

  // 如果当前节点不是子节点的父节点，则返回false
  return false
}

/**
 * 查询当前菜单的父级菜单名
 * @param dataSource 菜单数据
 * @param name 当前菜单的name
 * @return 包含当前菜单以及所有父菜单name的数组
 */
export function findMenuKeyParentName(dataSource: RouteItem[], name: string) {
  // 父级菜单name数组
  const parentNames: string[] = []

  // 从根节点开始遍历整棵菜单树，并调用递归函数查找子节点的所有父节点
  for (const node of dataSource) {
    // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
    if (findParentNode(node, parentNames, name)) {
      break
    }
  }

  return parentNames.reverse()
}
