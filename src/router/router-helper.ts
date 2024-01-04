import type { RouteRecordRaw } from 'vue-router'
import type { UserMenu } from '~/types/login'
import BaseLayout from '~/layouts/BaseLayout.vue'
import BlankLayout from '~/layouts/BlankLayout.vue'
import Frame from '~/layouts/FrameView.vue'

const modules = import.meta.glob('/src/views/**/*.vue')

/**
 * 用户菜单转换成vue-router的路由
 *
 * @param menuList 用户菜单列表
 * @return vue-router的路由
 */
export function menuToRoute(menuList: UserMenu[]): RouteRecordRaw[] {
  if (!menuList || !menuList.length) return []
  return menuList.map((menu: UserMenu) => {
    const newMenu = menu as RouteRecordRaw
    newMenu.component = getComponent(menu)
    // 判断是否有子菜单
    if (menu.children) {
      newMenu.children = menuToRoute(menu.children)
    }
    return newMenu
  })
}

/**
 * 获取路由组件
 * @param menu 用户菜单
 */
function getComponent(menu: UserMenu) {
  if (!menu.component) {
    if (menu.parentId === '0') {
      return BaseLayout
    }
    return undefined
  }

  if (menu.component === 'BaseLayout') {
    return BaseLayout
  }

  if (menu.component === 'BlankLayout') {
    return BlankLayout
  }

  if (menu.component === 'Frame') {
    return Frame
  }

  const module = modules[`/src/views/${menu.component}.vue`]
  if (!module) {
    return modules[`/src/views/${menu.component}/index.vue`]
  }
  return module
}
