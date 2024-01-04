import { resolve } from 'node:path'
import dayjs from 'dayjs'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { createVitePlugins } from './plugin'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const viteEnv = loadEnv(mode, root) as unknown as ViteEnv

  return {
    base: '/',
    root,
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
        '@/': `${process.cwd()}/`,
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: [
          '/src/styles/index.css',
          '/src/router/index.ts',
          '/src/router/router-helper.ts',
          '/src/store/index.ts',
          '/src/directives/index.ts',
          '/src/{views,components}/*',
        ]
      },
    },
    plugins: createVitePlugins(viteEnv, command),
    json: {
      // https://cn.vitejs.dev/config/shared-options.html#json-stringify
      stringify: true,
    },
    // 依赖优化配置
    optimizeDeps: {
      include: [
        '@vue/runtime-core',
        '@vue/shared',
      ],
    },
    build: {
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4096,
      rollupOptions: {
        input: {
          index: 'index.html',
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      PROJECT_BUILD_TIME: JSON.stringify(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')),
    },
  }
}
