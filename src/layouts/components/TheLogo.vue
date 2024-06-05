<script setup lang="ts">
import { PROJECT_NAME } from '~/config/setting'

const themeStore = useThemeStore()

function renderLottie() {
  // 不显示logo，不渲染
  if (!themeStore.settings.showLogo) return
  // 渲染前先销毁，防止重复渲染显示多个logo
  lottie.destroy('lottie-logo')
  useLottie({
    name: 'lottie-logo',
    containerId: '#lottie-logo',
    path: 'https://image.bestgcc.online/lottie/lf20_sfiiilbf.json',
  })
}

onMounted(() => renderLottie())
onUpdated(() => renderLottie())
</script>

<template>
  <div class="the-logo">
    <div id="lottie-logo" class="logo" />
    <span v-if="!themeStore.collaspeSide" class="logo-title">{{ PROJECT_NAME }}</span>
  </div>
</template>
