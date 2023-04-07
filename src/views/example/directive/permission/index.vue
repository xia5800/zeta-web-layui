<script setup lang="ts">
const useStore = useUserStore()
</script>

<template>
  <div>
    <lay-card>
      <p class="header-title">
        权限指令
      </p>
      <p class="header-describe">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式.
      </p>
    </lay-card>

    <lay-container fluid="true" class="z-container">
      <lay-card title="我的权限">
        {{ useStore.permissions }}
      </lay-card>

      <lay-card title="我的按钮">
        <lay-button-container>
          <lay-button v-permission="['sys:user:save']" type="primary">
            新增
          </lay-button>
          <lay-button v-permission="['sys:user:update']" type="normal">
            修改
          </lay-button>
          <lay-button v-permission="['sys:user:delete']" type="danger">
            删除
          </lay-button>
          <lay-button v-permission="['sys:user:import']">
            导入
          </lay-button>
          <lay-button v-permission="['sys:user:export']">
            导出
          </lay-button>
        </lay-button-container>
      </lay-card>
    </lay-container>
  </div>
</template>

<style scoped>
.header-title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 20px;
}

.header-describe {
  font-size: 14px;
  margin-bottom: 12px;
}
</style>
