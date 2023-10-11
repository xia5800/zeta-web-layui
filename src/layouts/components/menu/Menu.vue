<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import { findMenuKeyParentName } from './util'
import type { RouteItem, UserMenu } from '~/types'

withDefaults(defineProps<{
  /** 主题 */
  theme?: string
  /** 是否菜单树 */
  tree?: boolean
}>(), {
  theme: 'dark',
  tree: true,
})

const route = useRoute()
const themeStore = useThemeStore()
const userStore = useUserStore()

/** 生成菜单 */
function generateMenuOption(userMenu: UserMenu): RouteItem {
  const { name, path, meta, children } = userMenu
  return {
    name,
    path,
    meta,
    children: children?.map((child: UserMenu) => generateMenuOption(child)),
  }
}
/** 计算菜单选项 */
const menuOptions = computed<RouteItem[]>(() => (
  userStore.menus.map(i => generateMenuOption(i))
))

/** 计算展开的菜单 */
function calcuOpenKey() {
  const data = route.matched
    .filter(item => item.children.length > 0)
    .map(item => item.name as string)
  return data
}
// 展开的菜单
const openKey = ref<string[]>(calcuOpenKey())
// 选中的菜单
const selectedKey = ref<string>(route.name as string)

/** 计算是否手风琴模式 */
const accordion = computed(() => themeStore.settings.accordion)

/** 展开目录回调 */
function changeOpenKeys(keys: string[]) {
  // 判断是否手风琴模式。 如果是手风琴模式，则删除其它打开的key，取最新的key
  if (accordion.value) {
    // 最新打开的菜单
    // TODO:ps：此处取值有问题，在展开了第3级子菜单的情况下，点击1级菜单收起。name获取到的还是3级子菜单。
    // 等待layui-vue添加回调方法返回值
    const name = keys[keys.length - 1]
    keys = findMenuKeyParentName(menuOptions.value, name)
  }
  openKey.value = keys
}

/** 计算当前展开的菜单 */
function computedOpenKey() {
  if (accordion.value) {
    // 如果开启手风琴，计算当前路由可以展开的菜单
    // eg: old = ["系统管理", "测试菜单"]， route.name = ["多级菜单一"]，  new = ["多级菜单", "多级菜单一"]
    // eg: old = ["多级菜单", "多级菜单一"]， route.name = ["多级菜单一"]，  new = ["多级菜单", "多级菜单一"]
    openKey.value = calcuOpenKey()
  } else {
    // 如果不开启手风琴，添加当前路由可以展开的菜单
    // eg: old = ["系统管理", "测试菜单"]， route.name = ["多级菜单一"]，  new = ["系统管理", "测试菜单", "多级菜单", "多级菜单一"]
    // eg: old = ["多级菜单", "多级菜单一"]， route.name = ["多级菜单一"]，  new = ["多级菜单", "多级菜单一"]
    openKey.value = [...new Set(openKey.value.concat(calcuOpenKey()))]
  }
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    // 计算当前展开的菜单
    computedOpenKey()
    // 计算选中的菜单
    selectedKey.value = route.name as string
  },
)
</script>

<template>
  <lay-menu
    v-model:open-keys="openKey"
    v-model:selected-key="selectedKey"
    :collapse="themeStore.collaspeSide"
    :theme="theme"
    :tree="tree"
    @change-open-keys="changeOpenKeys"
  >
    <MenuItem :menu-options="menuOptions" />
  </lay-menu>
</template>
