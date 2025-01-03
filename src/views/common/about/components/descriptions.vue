<script setup lang="ts">
import type { SchemaItem } from './interface'

withDefaults(defineProps<{
  /** 表格项 */
  schemaItem: SchemaItem[]
  /** 总列数 */
  column?: number
}>(), {
  column: 2,
})
</script>

<template>
  <lay-descriptions :column="column" border>
    <lay-descriptions-item v-for="(info, index) in schemaItem" :key="index">
      <template #label>
        {{ info.label }}
      </template>
      <span v-html="info.value" />
    </lay-descriptions-item>
  </lay-descriptions>
</template>

<style scoped>

</style>
