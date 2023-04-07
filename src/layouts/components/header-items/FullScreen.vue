<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div>
    <lay-icon
      :type="isFullscreen ? 'layui-icon-screen-restore' : 'layui-icon-screen-full'"
      @click="toggle"
    />
  </div>
</template>
