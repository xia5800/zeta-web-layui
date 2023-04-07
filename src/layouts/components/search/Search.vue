<script setup lang="ts">
import SearchModal from './SearchModal.vue'

const { bool: show, toggle } = useBool()
function handleSearch() {
  toggle()
}
</script>

<template>
  <div>
    <lay-tooltip content="菜单搜索" position="bottom">
      <lay-icon type="layui-icon-search" @click="handleSearch" />
    </lay-tooltip>

    <SearchModal v-model:value="show" />
  </div>
</template>
