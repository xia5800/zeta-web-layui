<script setup lang="ts">
import type { SchemaItem } from './components/interface'
import { pkgJson } from './model'
import Descriptions from './components/descriptions.vue'

defineOptions({
  // 跟路由name保持一致
  name: 'about',
})

const themeStore = useThemeStore()
const { dependencies, devDependencies, name, version } = pkgJson

/** 生成环境依赖 */
const schema: SchemaItem[] = dependencies?.map(item => ({
  label: item.name,
  value: item.version,
})) || []

/** 开发环境依赖 */
const devSchema: SchemaItem[] = devDependencies?.map(item => ({
  label: item.name,
  value: item.version,
})) || []

/** 项目信息 */
const infoSchema: SchemaItem[] = [
  {
    label: '版本',
    value: version,
  },
  {
    label: '最后编译时间',
    value: PROJECT_BUILD_TIME,
  },
  {
    label: '预览地址',
    value: '<a href="https://bestgcc.online" target="_blank" style="color:#409EFF">预览地址</a>',
  },
  {
    label: '文档地址',
    value: '<a href="https://gitee.com/xia5800/zeta-web-layui/tree/master/_docs" target="_blank" style="color:#409EFF">_docs</a>',
  },
  {
    label: 'github',
    value: '<a href="https://github.com/xia5800/zeta-web-layui" target="_blank" style="color:#409EFF">https://github.com/xia5800/zeta-web-layui</a>',
  },
  {
    label: 'gitee',
    value: '<a href="https://gitee.com/xia5800/zeta-web-layui" target="_blank" style="color:#409EFF">https://gitee.com/xia5800/zeta-web-layui</a>',
  },
  {
    label: '许可',
    value: 'MIT',
  },
]
</script>

<template>
  <div>
    <!-- 如果多页签主题为“样式三”，为了美观添加了margin-top: 5px样式 -->
    <lay-card
      style="border-radius: 0;"
      :style="themeStore.settings.tabTheme == 'designer' ? 'margin-top: 5px' : ''"
    >
      <p class="header-title">
        关于
      </p>
      <p class="header-describe">
        {{ name }} 是一个基于Vue3、Vite5、Pinia、TypeScript、Layui-Vue 开发的前端脚手架项目。
        本项目只提供了一个最基础的RBAC用户角色权限功能。不像其它开源项目那样大而全，本项目相当精简
      </p>
    </lay-card>

    <lay-container fluid="true" class="z-container">
      <lay-card title="项目信息">
        <Descriptions :schema-item="infoSchema" :column="4" />
      </lay-card>

      <lay-card title="生产环境依赖">
        <Descriptions :schema-item="schema" :column="4" />
      </lay-card>

      <lay-card title="开发环境依赖">
        <Descriptions :schema-item="devSchema" :column="4" />
      </lay-card>
    </lay-container>
  </div>
</template>

<style scoped>
.header-title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 20px;
}

.header-describe {
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
