<script setup lang="ts">
// 初始化主题设置
const themeStore = useThemeStore()
themeStore.initSettings()

const { loading, endLoading } = useLoading(true)
const LOADING_INTERVAL = 1500
const BEFORE_LEAVING_MS = 1000
useTimeoutFn(endLoading, LOADING_INTERVAL)
</script>

<template>
  <lay-config-provider
    :theme="themeStore.settings.themeMode"
    :theme-variable="themeStore.themeVariable"
  >
    <PreLoadPage v-if="loading" :before-leaving-ms="BEFORE_LEAVING_MS" />
    <RouterView v-else />
  </lay-config-provider>
</template>
