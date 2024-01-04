<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'
import type { Tab } from '~/types/theme'

const route = useRoute()
const data = ref<Tab[]>([])

/** 获取面包屑数据 */
function getBreadCrumbs() {
  const matched = route.matched.filter((i: RouteLocationMatched) => i.meta && i.meta.title)
  if (!matched.length) return
  data.value = matched.map(i => ({
    title: i.meta.title,
    name: i.name,
    path: i.path,
  } as Tab))
}
getBreadCrumbs()

watch(
  () => route.path,
  (path) => {
    if (!path.startsWith('/redirect/')) {
      getBreadCrumbs()
    }
  },
)
</script>

<template>
  <div>
    <lay-breadcrumb>
      <lay-breadcrumb-item v-for="{ title, path } of data" :key="title">
        <router-link :to="path">
          {{ title }}
        </router-link>
      </lay-breadcrumb-item>
    </lay-breadcrumb>
  </div>
</template>
