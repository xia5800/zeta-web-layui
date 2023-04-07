/**
 * 缓存key枚举
 */
export enum CacheKey {
  /** token缓存key */
  TOKEN_NAME_CACHE_KEY = 'access_token',

  /** 是否记住UserState信息缓存key */
  USER_STATE_REMEMBER_CACHE_KEY = 'remember',

  /** 主题设置缓存key */
  THEME_SETTING_CACHE_KEY = 'theme',
  /** 菜单栏缓存key */
  TAB_SETTING_CACHE_KEY = 'tabs',
  /** 菜单展开、收起状态缓存key */
  MENU_COLLASPE_CACHE_KEY = 'collaspe',

  /** 请求数据缓存key */
  REQ_DATA_CACHE_KEY = 'sessionObj',
}
