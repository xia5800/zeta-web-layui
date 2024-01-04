import type { RouteRecord } from 'vue-router'
import type { Tab } from '~/types/theme'
import type { TabState } from '~/types/store'
import { CacheKey } from '~/types/cache'
import { cloneDeep } from 'lodash-es'
import { useThemeStore } from './theme'
import { getToken } from '~/utils/token'
import { storageLocal } from '~/utils/cache'

/**
 * 缓存tab数据
 * @param tabs
 * @returns
 */
export function cacheTabs(tabs: Tab[]) {
  if (!getToken()) return
  const userStore = useUserStore()
  const userId = userStore.info?.id
  if (!userId) return

  // tabData : { 'userId': ['用户打开的菜单1', '用户打开的菜单2'] }
  const tabData: { [key: string]: Tab[] } = {}
  tabData[userId] = tabs
  storageLocal().setItem<{ [key: string]: Tab[] }>(CacheKey.TAB_SETTING_CACHE_KEY, tabData)
}

/**
 * 清空tabs缓存
 */
export function clearCachedTabs() {
  storageLocal().removeItem(CacheKey.TAB_SETTING_CACHE_KEY)
}

/**
 * 使用缓存中的tab数据
 * @returns
 */
function applyCachedTabs(): Tab[] {
  if (!getToken()) return []
  const userStore = useUserStore()
  const userId = userStore.info?.id
  if (!userId) return []

  // tabData : { 'userId': ['用户打开的菜单1', '用户打开的菜单2'] }
  const tabData = storageLocal().getItem<{ [key: string]: Tab[] }>(CacheKey.TAB_SETTING_CACHE_KEY) || {}
  return tabData[userId] || []
}

/**
 * router 转换为 tab
 * @param routes
 * @returns
 */
function routesToTabs(routes: RouteRecord[]): Tab[] {
  return routes.map((route: RouteRecord) => {
    return {
      name: route.name,
      path: route.path,
      title: route.meta?.title || '',
      icon: route.meta?.icon,
      keepAlive: route?.meta.keepAlive,
      affix: route.meta?.affix,
    } as Tab
  })
}

/**
 * 菜单TabStore
 */
export const useTabStore = defineStore({
  id: 'tab',
  state: (): TabState => ({
    /** 打开的tab */
    tabs: [],
  }),
  getters: {
    /** 记录访问过的缓存页面 */
    cachedTabNames(state) {
      // 筛选有名字已缓存的tab，提取tab名字，去重后返回
      const names = state.tabs
        .filter(tab => !!tab.keepAlive && !!tab.name)
        .map(tab => tab.name)
      return [...new Set(names).values()]
    },
  },
  actions: {
    /** 创建/初始化tabs数据 */
    createTabs() {
      // 判断是否缓存多页签, 有缓存就用缓存里的tabs
      const themeStore = useThemeStore()
      if (themeStore.settings.cacheTabs) {
        this.tabs = applyCachedTabs()
        return
      }

      // 如果不缓存多页签, 生成固定的tabs
      const router = useRouter()
      // 从路由中获取route.meta.affix = true的路由
      const routes = router.getRoutes().filter(i => i.meta.affix)
      if (!routes.length) {
        this.tabs = []
        return
      }
      // 生成固定的tabs
      this.tabs = routesToTabs(routes)
    },
    /** 如果需要，则缓存tab */
    cacheIfNeed() {
      const themeStore = useThemeStore()
      // 判断是否缓存多页签
      if (themeStore.settings.cacheTabs) {
        cacheTabs(cloneDeep(this.tabs))
      }
    },
    /** 添加一个tab */
    addTab(tab: Tab) {
      const tabs = this.tabs
      // 判断添加的标签是否存在
      if (tab.path && !tabs.map(i => i.path).includes(tab.path)) {
        tabs.push(cloneDeep(tab))
        this.cacheIfNeed()
      }
      return Promise.resolve({ tabs })
    },
    /** 关闭一个tab */
    removeOneTab(tab: Tab) {
      if (tab.affix) return Promise.resolve({})
      const tabs = this.tabs
      const index = tabs.findIndex(i => i.path === tab.path)
      if (~index) {
        tabs.splice(index, 1)
        this.tabs = tabs
        this.cacheIfNeed()
      }
      return Promise.resolve({ tabs })
    },
    /** 关闭其它tab */
    removeOtherTabs(tab: Tab) {
      this.tabs = [...new Set(this.tabs.filter(tab => tab.affix).concat(tab)).values()]
      this.cacheIfNeed()

      const tabs = this.tabs
      return Promise.resolve({ tabs })
    },
    /** 关闭指定tabs */
    removeListTabs(list: Tab[]) {
      const pathList = list.filter(i => !i.affix).map(i => i.path) || []
      if (pathList.length) {
        this.tabs = [...this.tabs.filter(i => !pathList.includes(i.path))]
        this.cacheIfNeed()
      }

      const tabs = this.tabs
      return Promise.resolve({ tabs })
    },
    /** 关闭所有tab */
    removeAllTabs() {
      this.tabs = [...new Set(this.tabs.filter(tab => tab.affix)).values()] || []
      this.cacheIfNeed()

      const tabs = this.tabs
      return Promise.resolve({ tabs })
    },
  },
})

// 确保传递正确的 store 声明
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTabStore, import.meta.hot))
}
