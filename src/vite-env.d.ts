/// <reference types="vite/client" />

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string

/**
 * 全局自定义环境变量的类型声明
 */
declare interface ViteEnv {
  /** 项目名 */
  VITE_APP_NAME: string
  /** 端口 */
  VITE_PORT: number
  /** 基础公共路径 */
  VITE_PUBLIC_PATH: string
  /** 是否启用mock */
  VITE_USE_MOCK: string
  /** 后端接口地址 */
  VITE_API_URL: string
  /** 定时任务后端接口地址 */
  VITE_API_JOB_URL: string
  /** 是否清除console */
  VITE_DROP_CONSOLE: string
  /** 是否开启打包文件大小结果分析 */
  VITE_VISUALIZER: string
}
