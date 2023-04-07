<script setup lang="ts">
import TheMenu from '../menu/Menu.vue'

const show = ref(false)
function toggle() {
  show.value = !show.value
}

const themeStore = useThemeStore()
const sideWidth = computed(() =>
  themeStore.collaspeSide ? 'var(--layout-side-fold-width)' : 'var(--layout-side-unfold-width)',
)
</script>

<template>
  <div>
    <lay-icon type="layui-icon-more" @click="toggle" />

    <lay-layer
      v-model="show"
      :title="false"
      type="drawer"
      :area="sideWidth"
      :close-btn="false"
      @close="toggle"
    >
      <!-- 菜单 -->
      <TheMenu theme="light" />
    </lay-layer>
  </div>
</template>

<style lang="less" scoped>
.layui-nav {
  width: 100%;
  background-color: transparent;
}

/** 菜单图标(展开) */
:deep(.layui-nav .layui-nav-item .nav-unfold-icon) {
  font-size: var(--layout-side-icon-unfold-size)
}

/** 菜单图标(收起) */
:deep(.layui-nav .layui-nav-item .nav-fold-icon) {
  display: flex;
  justify-content: center;
  font-size: var(--layout-side-icon-fold-size)
}
</style>
