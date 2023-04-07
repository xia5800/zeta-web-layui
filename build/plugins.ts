import type { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import RemoveConsole from 'vite-plugin-remove-console'

/**
 * 创建vite插件
 * @param viteEnv
 * @param isBuild
 * @returns
 */
export function createVitePlugins(viteEnv: ViteEnv, command: string) {
  const isBuild = command === 'build'
  const { VITE_USE_MOCK, VITE_DROP_CONSOLE, VITE_VISUALIZER } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue({
      reactivityTransform: true,
    }),
  ]

  // 自定义组件名字支持
  vitePlugins.push(DefineOptions())

  // 自动导入
  vitePlugins.push(configAutoImport())

  // 按需加载
  vitePlugins.push(configComponents())

  // mock服务
  vitePlugins.push(configMockServer(VITE_USE_MOCK === 'true'))

  // 打包文件分析
  vitePlugins.push(configVisualizer(VITE_VISUALIZER === 'true'))

  // 线上环境删除console输出
  vitePlugins.push(configRemoveConsole(VITE_DROP_CONSOLE === 'true'))

  return vitePlugins
}

/** 自动导入插件配置 */
function configAutoImport() {
  return AutoImport({
    dts: 'src/auto-imports.d.ts',
    resolvers: [LayuiVueResolver()],
    imports: [
      'vue',
      'vue-router',
      'vue/macros',
      '@vueuse/core',
      'pinia',
    ],
    dirs: [
      'src/api/**',
      'src/hooks',
      'src/store/**',
    ],
    vueTemplate: true,
  })
}

/** 按需加载插件配置 */
function configComponents() {
  return Components({
    dts: 'src/components.d.ts',
    resolvers: [
      LayuiVueResolver({
        resolveIcons: true,
        exclude: ['LightIcon', 'DarkIcon'],
      }),
    ],
  })
}

/** Mock服务 */
function configMockServer(open: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: open,
    prodEnabled: open,
    injectCode: `
      import { setupProdMockServer } from '../mock/_mockProdServer';
      setupProdMockServer();
    `,
    logger: false,
  })
}

/** 打包文件分析配置 */
function configVisualizer(open: boolean) {
  return visualizer({
    open,
    brotliSize: true,
    gzipSize: true,
    filename: 'report.html',
  }) as PluginOption
}

/** 配置移除console输出 */
function configRemoveConsole(open: boolean) {
  return open ? RemoveConsole() : []
}
