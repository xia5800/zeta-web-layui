/** 主题设置 */
export interface ThemeSettings {
  /** 是否显示 Logo */
  showLogo: boolean
  /** 是否显示面包屑 */
  showBreadcrumb: boolean
  /** 是否显示多页签 */
  showTabs: boolean
  /** 是否显示页脚 */
  showFoot: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean

  /** 是否缓存多页签 */
  cacheTabs: boolean

  /** 菜单是否手风琴效果 */
  accordion: boolean
  /** 菜单主题是否相反 */
  sideThemeInverse: boolean

  /** 是否显示页面切换动画 */
  showAnimation: boolean
  /** 页面切换动画类型 */
  animationMode: 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out'

  /** 系统主色调 */
  primaryColor: string

  /** 页面主题的亮暗模式 */
  themeMode: 'light' | 'dark'
}

/**
 * 说明：layui-vue的夜间模式颜色有问题，等待修复中...
 * --global-primary-color:#009688;
 * --global-normal-color:#1e9fff;
 * --global-warm-color:#ffb800;
 * --global-danger-color:#ff5722;
 * --global-checked-color:#5fb878;
 * --global-info-color: #31BDEC;
 * --global-border-radius:2px;
 * --global-neutral-color-1:#FAFAFA;
 * --global-neutral-color-2:#F6F6F6;
 * --global-neutral-color-3:#eeeeee;
 * --global-neutral-color-4:#e2e2e2;
 * --global-neutral-color-5:#dddddd;
 * --global-neutral-color-6:#d2d2d2;
 * --global-neutral-color-7:#cccccc;
 * --global-neutral-color-8:#c2c2c2;
 * --darkreader-border--global-primary-color: #0d796f
 */
type ThemeVariableKey =
'--global-primary-color' |
'--global-checked-color' |
'--global-normal-color' |
'--global-warm-color' |
'--global-danger-color' |
'--global-info-color' |
'--global-border-radius' |
'--global-neutral-color-1' |
'--global-neutral-color-2' |
'--global-neutral-color-3' |
'--global-neutral-color-4' |
'--global-neutral-color-5' |
'--global-neutral-color-6' |
'--global-neutral-color-7' |
'--global-neutral-color-8' |
'--darkreader-border--global-primary-color'

/** 主题变量 */
export interface ThemeVariable extends Partial<Record<ThemeVariableKey, string>> {}

/** 多页签 */
export interface Tab {
  /** 菜单标题 */
  title: string
  /** 路由名 */
  name: string
  /** 菜单图标 */
  icon?: string
  /** 路由地址 */
  path: string
  /** 是否缓存 */
  keepAlive?: boolean
  /** 是否固定 */
  affix?: boolean
}
