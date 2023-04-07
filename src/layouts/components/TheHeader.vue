<script setup lang="ts">
import {
  Avatar,
  Breadcrumb,
  FullScreen,
  ResponsivePanel,
} from './header-items'
import TheSearch from './search'
import TheSetting from './settings'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()

/** 刷新页面 */
function reloadPage() {
  router.push({
    path: `/redirect${unref(route).fullPath}`,
  })
}
</script>

<template>
  <div class="the-nav">
    <!-- 菜单展开收起 -->
    <div v-if="isPC" class="the-nav-item">
      <lay-icon
        :type="themeStore.collaspeSide ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'"
        @click="themeStore.toggle()"
      />
    </div>

    <!-- 刷新图标 -->
    <div class="the-nav-item">
      <lay-icon type="layui-icon-refresh-three" @click="reloadPage" />
    </div>

    <!-- 面包屑 -->
    <Breadcrumb v-if="isPC && themeStore.settings.showBreadcrumb" class="the-nav-item" />

    <!-- 通告栏 -->
    <div class="the-nav-item" style="flex: auto;">
      <lay-notice-bar left-icon="layui-icon-mute" text="页面数据为 Mock 示例数据，非真实数据。" />
    </div>

    <!-- 占位 -->
    <!-- <div style="flex: auto;" /> -->

    <!-- 系统功能 -->
    <div v-if="isPC" class="end-nav">
      <TheSearch class="the-nav-item" />
      <FullScreen class="the-nav-item" />
      <Avatar class="the-nav-item" />
      <TheSetting class="the-nav-item" />
    </div>
    <div v-else class="end-nav">
      <div class="the-nav-item">
        <ResponsivePanel />
      </div>
    </div>
  </div>
</template>

<style scoped>
.the-nav {
  border-bottom: 1px solid #eee;
}

.end-nav {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 16px;
}
</style>
