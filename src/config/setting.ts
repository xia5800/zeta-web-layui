/** 接口地址 */
export const API_BASE_URL: string = import.meta.env.VITE_API_URL as string

/** 项目名称 */
export const PROJECT_NAME: string = import.meta.env.VITE_APP_NAME as string

/** AES加密秘钥 长度规定：16、24、32  ps: 项目打包后，可以从源码里面搜到这个值，暂时没有啥好办法 */
export const CRYPTO_KEY = 'kwYkDdgVXcqK03E3zioyr3ocMYmf4XYh'

/** AES加密盐 */
export const CRYPTO_IV = ''

/** copyRight */
export const COPY_RIGHT = 'Zeta Web - Made by GCC'

/** 路由白名单 */
export const WHITE_LIST = ['/login']

/** 默认主题 light | dark */
export const DEFAULT_THEME_MODE = 'light'

/** 默认主色调 */
export const DEFAULT_PERMARY_COLOR = '#009688'

/** 默认圆角度 */
export const DEFAULT_BORDER_RADIUS = 6
