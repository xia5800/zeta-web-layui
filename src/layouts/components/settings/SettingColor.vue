<script lang="ts" setup>
interface Color {
  name: string
  value: string
}
const {
  modelValue,
} = defineProps<{
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])
const options: Color[] = [
  { name: '主题色一(保存配置方可生效)', value: '#009688' },
  { name: '主题色二(保存配置方可生效)', value: '#16baaa' },
  { name: '主题色三(保存配置方可生效)', value: '#36b368' },
  { name: '主题色四(保存配置方可生效)', value: '#2d8cf0' },
  { name: '主题色五(保存配置方可生效)', value: '#f6ad55' },
  { name: '主题色六(保存配置方可生效)', value: '#f56c6c' },
  { name: '主题色七(保存配置方可生效)', value: '#3963bc' },
]

/**
 * 颜色修改
 *
 * 说明：
 * 此处只修改themeStore.settings.primaryColor的值。
 * 修改该值并不会马上改变主题色，需要保存主题设置才生效
 * 详情看：themeStore.saveSettins()方法
 * @param color 主题色
 */
const handlerChange = function (color: string) {
  emits('update:modelValue', color)
}
</script>

<template>
  <div class="color-list">
    <template v-for="(option, index) in options" :key="index">
      <lay-tooltip :content="option.name" position="bottom">
        <span :style="{ background: option.value }" @click="handlerChange(option.value)">
          <lay-icon v-if="option.value === modelValue" type="layui-icon-ok" />
        </span>
      </lay-tooltip>
    </template>
  </div>
</template>

<style>
.color-list {
  display: flex;
  justify-content: center;
}

.color-list span {
  text-align: center;
  width: 24px;
  height: 24px;
  line-height: 24px;
  margin-left: 14px;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
  color: white;
}
</style>
