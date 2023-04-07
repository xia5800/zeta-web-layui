<script lang="ts" setup>
import { layer } from '@layui/layer-vue'
import type { Tab } from '~/types'

const route = useRoute()
const router = useRouter()
const currentPath = computed(() => route.path)
const tabStore = useTabStore()
tabStore.createTabs()

const tabs = computed(() => tabStore.tabs)

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
    layer.msg('已经是最后一个标签了', { icon: 3 })
    return
  }
  const currentTab = tabs.value.find(i => i.path === id) as unknown as Tab
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

/** 关闭左边 */
function closeLeft() {
  const index = tabs.value.findIndex(i => i.name === route.name) as number
  const hasLeftTabs = tabs.value.length > 1 && index > 0
  const currentTab = tabs.value[index]
  if (!currentTab || !hasLeftTabs) return
  tabStore
    .removeListTabs(tabs.value.slice(0, index))
    .then(() => router.push(currentTab.path))
}

/** 关闭右边 */
function closeRight() {
  const index = tabs.value.findIndex(i => i.name === route.name) as number
  const hasRightTabs = tabs.value.length > 1 && index < tabs.value.length - 1
  const currentTab = tabs.value[index]
  if (!currentTab || !hasRightTabs) return
  tabStore
    .removeListTabs(tabs.value.slice(index + 1))
    .then(() => router.push(currentTab.path))
}

/** 关闭当前 */
function closeCurrent() {
  if (tabs.value.length === 1) {
    layer.msg('已经是最后一个标签了', { icon: 3 })
    return
  }
  const currentTab = tabs.value.find(i => i.name === route.name) as unknown as Tab
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
function closeOther() {
  const currentTab = tabs.value.find(i => i.name === route.name) as unknown as Tab
  if (!currentTab) return
  tabStore
    .removeOtherTabs(currentTab)
    .then(() => router.push(currentTab.path))
}
</script>

<template>
  <div class="the-tab">
    <lay-tab
      :model-value="currentPath"
      :allow-close="true"
      @change="handleChange"
      @close="handleClose"
    >
      <template v-for="tab in tabs" :key="tab">
        <lay-tab-item :id="tab.path" :title="tab.title" :closable="!tab.affix">
          <template #title>
            <span class="dot" />
            {{ tab.title }}
          </template>
        </lay-tab-item>
      </template>
    </lay-tab>
    <lay-dropdown>
      <lay-icon type="layui-icon-down" />
      <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeLeft">
            关闭左边
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeRight">
            关闭右边
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeOther">
            关闭其他
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeCurrent">
            关闭当前
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
      </template>
    </lay-dropdown>
  </div>
</template>

<style scoped>
.the-tab > i {
  width: 40px;
  background: white;
  height: 100%;
  line-height: var(--layout-tab-height);
  text-align: center;
  border-left: 1px solid whitesmoke;
}
</style>
