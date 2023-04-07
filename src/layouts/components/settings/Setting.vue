<script setup lang="ts">
import SettingDrawer from './SettingDrawer.vue'

const show = ref<boolean>(false)
function toggle() {
  show.value = !show.value
}
</script>

<template>
  <div>
    <lay-icon type="layui-icon-more-vertical" @click="toggle" />

    <SettingDrawer v-model:value="show" />
  </div>
</template>
