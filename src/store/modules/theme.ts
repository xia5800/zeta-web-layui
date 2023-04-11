import { layer } from '@layui/layer-vue'
import { cloneDeep } from 'lodash-es'
import { DEFAULT_PERMARY_COLOR, DEFAULT_THEME_MODE } from '~/config/setting'
import type { ThemeSettings, ThemeState } from '~/types'
import { CacheKey } from '~/types'
import { storageLocal, storageSession } from '~/utils/cache'

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    /** 主题设置 */
    settings: {
      /** 是否显示Logo */
      showLogo: true,
      /** 是否显示面包屑 */
      showBreadcrumb: true,
      /** 是否显示多页签 */
      showTabs: true,
      /** 是否显示页脚 */
      showFoot: true,
      /** 是否显示灰色模式 */
      showGreyMode: false,
      /** 是否缓存多页签 */
      cacheTabs: true,
      /** 菜单是否手风琴效果 */
      accordion: true,
      /** 菜单主题是否相反 */
      sideThemeInverse: false,
      /** 是否显示页面切换动画 */
      showAnimation: true,
      /** 页面切换动画类型 */
      animationMode: 'fade-slide',
      /** 页面主题的亮暗模式 */
      themeMode: DEFAULT_THEME_MODE,
      /** 主题色 */
      primaryColor: DEFAULT_PERMARY_COLOR,
    },
    /** 展开收起菜单 */
    collaspeSide: storageSession(false).getItem(CacheKey.MENU_COLLASPE_CACHE_KEY) ?? false,
    /** 主题变量 */
    themeVariable: {},
  }),
  actions: {
    /** 展开收起菜单 */
    toggle() {
      this.collaspeSide = !this.collaspeSide
      storageSession(false).setItem(CacheKey.MENU_COLLASPE_CACHE_KEY, this.collaspeSide)
    },
    /** 是否黑暗模式 */
    isDark() {
      return this.settings.themeMode === 'dark'
    },
    /** 初始化设置 */
    initSettings() {
      const cacheData = storageLocal().getItem<ThemeSettings>(CacheKey.THEME_SETTING_CACHE_KEY)
      if (cacheData) {
        this.settings = cacheData
      }
      // 初始化主题色
      this.themeVariable['--global-primary-color'] = this.settings.primaryColor
      this.themeVariable['--global-checked-color'] = this.settings.primaryColor
    },
    /** 保存设置 */
    saveSettins({
      callback,
      showTips = true,
    }: {
      callback?: Function
      showTips?: boolean
    }) {
      // 修改主题色
      this.themeVariable['--global-primary-color'] = this.settings.primaryColor
      this.themeVariable['--global-checked-color'] = this.settings.primaryColor

      if (!showTips) {
        storageLocal().setItem<ThemeSettings>(CacheKey.THEME_SETTING_CACHE_KEY, cloneDeep(this.settings))
        return
      }
      layer.msg('正在保存配置...', { icon: 16, time: 1000 }, () => {
        storageLocal().setItem<ThemeSettings>(CacheKey.THEME_SETTING_CACHE_KEY, cloneDeep(this.settings))
        layer.msg('保存成功', { icon: 1, time: 1000 })
        callback && callback()
      })
    },
    /** 重置设置 */
    resetSettings() {
      this.settings = {
        showLogo: true,
        showBreadcrumb: true,
        showTabs: true,
        showFoot: true,
        showGreyMode: false,
        cacheTabs: true,
        accordion: true,
        sideThemeInverse: false,
        showAnimation: true,
        animationMode: 'fade-slide',
        themeMode: DEFAULT_THEME_MODE,
        primaryColor: DEFAULT_PERMARY_COLOR,
      }
    },
  },
})

export function useThemeStoreHook() {
  return useThemeStore(store)
}
