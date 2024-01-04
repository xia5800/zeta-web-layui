import type { LoginUserInfo, UserMenu } from '~/types/login'
import type { UserState } from '~/types/store'
import type { UserInfo } from '~/types/system/user'
import { CacheKey } from '~/types/cache'
import { storageLocal } from '~/utils/cache'
import { removeToken } from '~/utils/token'

/**
 * 用户Store
 */
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    // 用户信息
    info: null,
    // 用户权限列表
    permissions: [],
    // 用户角色列表
    roles: [],
    // 用户可访问的菜单列表
    menus: [],
    // 是否记住UserState信息
    remember: false,
  }),
  actions: {
    setRemember(remember: boolean) {
      this.remember = remember
      storageLocal(false).setItem(CacheKey.USER_STATE_REMEMBER_CACHE_KEY, remember)
    },
    /** 重置用户状态 */
    resetState() {
      this.info = null
      this.roles = []
      this.permissions = []
      this.menus = []
      this.remember = false
      storageLocal(false).setItem(CacheKey.USER_STATE_REMEMBER_CACHE_KEY, false)
    },
    /** 获取并设置用户信息、权限、角色等 */
    async fetchUserInfo() {
      const { success, data } = await getUserInfoApi()
      if (!success) return {}

      // 设置用户信息、权限、角色。
      // 说明：为什么不缓存到localStorage中去呢？
      // 因为不刷新页面，store里的数据是不会丢失的，刷新页面之后路由重新加载，触发路由守卫
      // 会重新获取用户信息，并存到store中去
      const { permissions, roles } = data as UserInfo
      this.info = data as LoginUserInfo
      this.permissions = permissions
      this.roles = roles

      // 返回用户菜单数据
      return this.fetchUserMenu()
    },
    /** 获取用户菜单 */
    async fetchUserMenu() {
      const { success, data } = await getUserMenuApi()
      this.menus = data as UserMenu[]
      return success ? { menus: data } : { }
    },
    /** 注销登录 */
    logout() {
      // 删除用户tab
      const tabStore = useTabStore()
      tabStore.removeAllTabs()
      // 重置用户状态
      this.resetState()
      // 做完以上操作才removeToken
      removeToken()
      return Promise.resolve()
    },
  },
})

// 确保传递正确的 store 声明
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
