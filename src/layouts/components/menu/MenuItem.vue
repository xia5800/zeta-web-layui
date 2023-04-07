<script setup lang="ts">
import type { Meta, RouteItem } from '~/types'

defineProps<{
  menuOptions: RouteItem[]
}>()

const router = useRouter()
const themeStore = useThemeStore()

/** 点击菜单 */
function clickMenuItem(path: string, meta?: Meta) {
  // 判断是否有外链地址，如果有则打开外链，否则路由跳转
  meta?.href ? useOpenWindow(meta?.href) : router.push(path)
}
</script>

<template>
  <template v-for="{ name, path, meta, children } of menuOptions" :key="name">
    <template v-if="children?.length">
      <lay-sub-menu v-if="!(meta?.hide)" :id="name">
        <template #icon>
          <lay-icon
            v-if="meta?.icon"
            :class="themeStore.collaspeSide ? 'nav-fold-icon' : 'nav-unfold-icon'"
            :type="meta.icon"
          />
        </template>
        <template #title>
          {{ meta?.title }}
        </template>

        <template v-if="children.length > 0">
          <MenuItem :menu-options="children as RouteItem[]" />
        </template>
      </lay-sub-menu>
    </template>
    <template v-else>
      <lay-menu-item
        v-if="!(meta?.hide)"
        :id="name"
        @click="clickMenuItem(path, meta)"
      >
        <template #icon>
          <lay-icon
            v-if="meta?.icon"
            :class="themeStore.collaspeSide ? 'nav-fold-icon' : 'nav-unfold-icon'"
            :type="meta.icon"
          />
        </template>
        <template #title>
          {{ meta?.title }}
        </template>
      </lay-menu-item>
    </template>
  </template>
</template>

<style scoped>
/** 侧边栏-菜单图标 */
:deep(.layui-sub-menu-icon) {
  margin-right: 12px!important;
}

/** 侧边栏-菜单标题 */
:deep(a span) {
  /* letter-spacing: 2px!important; */
  font-size: 13.5px!important;
}

/** 一级菜单 */
:deep(.layui-nav-item a) {
  margin-left: 15px !important;
}

/** 二级菜单 */
:deep(.layui-nav-item .layui-nav-item a) {
  margin-left: 30px !important;
}

/** 三级菜单 说明：四级、五级、n级菜单的左边距都不变化了 */
:deep(.layui-nav-item .layui-nav-item .layui-nav-item a) {
  margin-left: 45px !important;
}
</style>
