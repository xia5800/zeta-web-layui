<script setup lang="ts">
const currentRoute = useRoute()
const frameSrc = ref<string>('')

if (unref(currentRoute.meta)?.frameSrc) {
  frameSrc.value = unref(currentRoute.meta)?.frameSrc as string
}
</script>

<template>
  <div style="height: 100%;">
    <iframe
      style="width: 100%; min-height: 100%;"
      :src="frameSrc"
    />
  </div>
</template>
