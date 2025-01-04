<script lang="ts" setup>
import { layer } from '@layui/layer-vue'
import type { Tab } from '~/types/theme'
import 'iconify-icon'

const route = useRoute()
const router = useRouter()
const currentPath = computed(() => route.path)
const themeStore = useThemeStore()
const tabStore = useTabStore()
tabStore.createTabs()

const tabs = computed(() => tabStore.tabs)

// 上一个打开的下拉菜单
const lastOpenDropdown = ref<string>()
// 存储所有下拉菜单的ref
const tabDropdownRefs = ref<Record<string, any>>({})

/** 动态添加、减少下拉菜单的ref */
function setDropdownRef(name: string, el: any) {
  if (el) {
    tabDropdownRefs.value[name] = el
  } else {
    delete tabDropdownRefs.value[name]
  }
}

/** 添加tab */
function addTab() {
  // 解构当前路由，判断是否是hide隐藏路由，如果是，则不添加tab
  const { name, path, meta: { title, hide, icon, keepAlive, affix } } = route
  if (hide) return

  // 判断title和path是否为空，如果为空则不添加tab
  if ([title, path].some(i => !i)) return
  tabStore.addTab({
    path,
    name,
    icon,
    title,
    keepAlive,
    affix,
  } as Tab)
}
addTab()
watch(() => route.path, addTab)

/**
 * change事件处理
 * @param id 路由path
 */
function handleChange(id: string) {
  router.push(id)
}

/**
 * close事件处理
 * @param id 路由path
 */
function handleClose(id: string) {
  if (tabs.value.length === 1) {
    layer.msg('已经是最后一个标签了', { icon: 7 })
    return
  }

  // 找到当前tab对象
  const currentTab = tabs.value.find(i => i.path === id) as unknown as Tab
  if (!currentTab) return

  // 删除tab的下拉菜单
  setDropdownRef(id, null)

  // 删除tab
  tabStore
    .removeOneTab(currentTab)
    .then(() => {
      if (currentTab.path === route.path) {
        // 找到最后一个
        const latest = tabs.value.slice(-1)[0]
        router.push(latest?.path ?? '/')
      }
    })
}

/** 关闭左边 */
function closeLeft(idx?: number) {
  const index = idx || tabs.value.findIndex(i => i.name === route.name) as number
  const hasLeftTabs = tabs.value.length > 1 && index > 0
  const currentTab = tabs.value[index]
  if (!currentTab || !hasLeftTabs) return
  tabStore
    .removeListTabs(tabs.value.slice(0, index))
    .then(() => router.push(currentTab.path))
}

/** 关闭右边 */
function closeRight(idx?: number) {
  const index = idx || tabs.value.findIndex(i => i.name === route.name) as number
  const hasRightTabs = tabs.value.length > 1 && index < tabs.value.length - 1
  const currentTab = tabs.value[index]
  if (!currentTab || !hasRightTabs) return
  tabStore
    .removeListTabs(tabs.value.slice(index + 1))
    .then(() => router.push(currentTab.path))
}

/** 关闭当前 */
function closeCurrent(tab?: Tab) {
  if (tabs.value.length === 1) {
    layer.msg('已经是最后一个标签了', { icon: 7 })
    return
  }
  const currentTab = tab || tabs.value.find(i => i.name === route.name) as unknown as Tab
  if (!currentTab) return
  tabStore
    .removeOneTab(currentTab)
    .then(() => {
      if (currentTab.path === route.path) {
        // 找到最后一个
        const latest = tabs.value.slice(-1)[0]
        router.push(latest?.path ?? '/')
      }
    })
}

/** 关闭其它 */
function closeOther(tab?: Tab) {
  const currentTab = tab || tabs.value.find(i => i.name === route.name) as unknown as Tab
  if (!currentTab) return
  tabStore
    .removeOtherTabs(currentTab)
    .then(() => router.push(currentTab.path))
}

/** tabDropdown显示事件 */
function tabDropdownShow(name: string) {
  if (lastOpenDropdown.value !== undefined) {
    // 关闭上一个dropdown
    tabDropdownRefs.value[lastOpenDropdown.value]?.hide()
  }
  // 打开当前dropdown
  tabDropdownRefs.value[name]?.show()

  // 更新上一次打开的下拉菜单
  lastOpenDropdown.value = name
}
</script>

<template>
  <div class="the-tab" :class="themeStore.settings.tabTheme">
    <lay-tab
      :model-value="currentPath"
      :allow-close="true"
      @change="handleChange"
      @close="handleClose"
    >
      <lay-tab-item v-for="tab, index in tabs" :id="tab.path" :key="index" :closable="!tab.affix">
        <template #title>
          <lay-dropdown
            :ref="(el: any) => setDropdownRef(tab.path, el)"
            trigger="contextMenu"
            @show="tabDropdownShow(tab.path)"
          >
            <div style="height: 100%; display: inline-block;">
              <span class="dot" />
              {{ tab.title }}
            </div>
            <template #content>
              <lay-dropdown-menu>
                <lay-dropdown-menu-item @click="closeLeft(index)">
                  <template #prefix><iconify-icon icon="ph:arrow-left-bold" /></template>
                  <template #default>关闭左边</template>
                </lay-dropdown-menu-item>
              </lay-dropdown-menu>
              <lay-dropdown-menu>
                <lay-dropdown-menu-item @click="closeRight(index)">
                  <template #prefix><iconify-icon icon="ph:arrow-right-bold" /></template>
                  <template #default>关闭右边</template>
                </lay-dropdown-menu-item>
              </lay-dropdown-menu>
              <lay-dropdown-menu>
                <lay-dropdown-menu-item @click="closeOther(tab)">
                  <template #prefix><iconify-icon icon="ph:arrow-u-up-right-bold" /></template>
                  <template #default>关闭其他</template>
                </lay-dropdown-menu-item>
              </lay-dropdown-menu>
              <lay-dropdown-menu>
                <lay-dropdown-menu-item @click="closeCurrent(tab)">
                  <template #prefix><iconify-icon icon="ph:x-bold" /></template>
                  <template #default>关闭当前</template>
                </lay-dropdown-menu-item>
              </lay-dropdown-menu>
            </template>
          </lay-dropdown>
        </template>
      </lay-tab-item>
    </lay-tab>

    <lay-dropdown>
      <lay-icon type="layui-icon-down" :trigger="['click', 'contextmenu']" :class="themeStore.settings.tabTheme === 'designer' ? 'designer-last-icon' : ''" />
      <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeLeft()">
            <template #prefix><iconify-icon icon="ph:arrow-left-bold" /></template>
            <template #default>关闭左边</template>
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeRight()">
            <template #prefix><iconify-icon icon="ph:arrow-right-bold" /></template>
            <template #default>关闭右边</template>
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeOther()">
            <template #prefix><iconify-icon icon="ph:arrow-u-up-right-bold" /></template>
            <template #default>关闭其他</template>
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeCurrent()">
            <template #prefix><iconify-icon icon="ph:x-bold" /></template>
            <template #default>关闭当前</template>
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
      </template>
    </lay-dropdown>
  </div>
</template>

<style scoped>
.the-tab > i {
  width: 40px;
  background-color: white;
  line-height: var(--layout-tab-height);
  text-align: center;
  border-left: 1px solid whitesmoke;
}
</style>
