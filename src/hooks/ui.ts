// 响应式
export const breakpoints = useBreakpoints({
  xs: '320px',
  sm: '640px',
  md: '1024px',
  lg: '1280px',
  xl: '1536px',
  xxl: '1920px',
})

export const isMobile = breakpoints.smaller('sm')
export const isPC = breakpoints.greaterOrEqual('sm')
export const isXs = breakpoints.smaller('sm')

// 系统当前主题色
export const primaryColor = useThemeStoreHook().settings.primaryColor
