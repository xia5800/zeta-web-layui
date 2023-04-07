<script setup lang="ts">
const router = useRouter()
const route = useRoute()
function reloadPage() {
  router.push({
    path: `/redirect${unref(route).fullPath}`,
  })
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <lay-card class="pear-container error-page">
      <lay-exception status="404" title="404" describe="跳转页面失败">
        <template #extra>
          <lay-button @click="reloadPage">
            刷新
          </lay-button>
          <lay-button type="primary" @click="router.back()">
            返回
          </lay-button>
        </template>
      </lay-exception>
    </lay-card>
  </lay-container>
</template>

<style scoped>
.error-page {
  padding-top: 200px;
  padding-bottom: 200px;
}
</style>
