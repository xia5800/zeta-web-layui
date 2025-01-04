<script setup lang="ts">
import {
  TheContent,
  TheFooter,
  TheHeader,
  TheLogo,
  TheMenu,
  TheTabs,
} from './components'
// fix bug 手动引入LayBacktop组件以解决在linux环境下build报错问题 --by gcc
import { LayBacktop } from '@layui/layui-vue'
import '@layui/layui-vue/es/backTop/index.css'

const themeStore = useThemeStore()
const sideWidth = computed(() =>
  themeStore.collaspeSide
    ? 'var(--layout-side-fold-width)'
    : 'var(--layout-side-unfold-width)',
)
const menuTheme = computed(() => {
  if (themeStore.settings.sideThemeInverse) {
    return themeStore.settings.themeMode === 'dark' ? 'light' : 'dark'
  } else {
    return themeStore.settings.themeMode
  }
})
</script>

<template>
  <div class="zeta-admin">
    <lay-layout>
      <!-- 侧边栏 -->
      <lay-side v-show="isPC" :width="sideWidth" :class="menuTheme" @contextmenu.prevent>
        <!-- logo -->
        <lay-logo v-if="themeStore.settings.showLogo">
          <TheLogo />
        </lay-logo>
        <!-- 菜单 -->
        <lay-scroll
          class="menu-scroll"
          :style="{
            height: themeStore.settings.showLogo
              ? 'calc(100% - var(--layout-nav-height))'
              : '100%',
          }"
        >
          <TheMenu :theme="menuTheme" />
        </lay-scroll>
      </lay-side>

      <lay-layout>
        <!-- header -->
        <lay-header @contextmenu.prevent>
          <!-- 头部 -->
          <TheHeader />
          <!-- 多页签 -->
          <TheTabs v-if="themeStore.settings.showTabs" />
        </lay-header>

        <!-- 内容 -->
        <lay-body>
          <TheContent />
          <!-- 回到顶部 -->
          <LayBacktop :show-height="200" :bottom="60" :right="20" />
        </lay-body>

        <!-- 页脚 -->
        <lay-footer v-if="themeStore.settings.showFoot">
          <TheFooter />
        </lay-footer>
      </lay-layout>
    </lay-layout>
  </div>
</template>

<style scoped>
/** 隐藏菜单滚动条 */
:deep(.menu-scroll .layui-scroll-y .layui-scroll-track) {
  display: none;
}

/** 侧边栏亮色 */
.layui-side.light {
  background-color: white;
}
</style>
