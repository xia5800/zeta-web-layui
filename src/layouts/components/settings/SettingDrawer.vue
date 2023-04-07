<script setup lang="ts">
import SettingColor from './SettingColor.vue'

const {
  value,
} = defineProps<{
  /** 抽屉显隐 */
  value: boolean
}>()
const emit = defineEmits(['update:value'])

const show = computed({
  get() {
    return value
  },
  set(val: boolean) {
    emit('update:value', val)
  },
})

const themeStore = useThemeStore()
const settings = computed(() => themeStore.settings)

/** 保存设置 */
function handleSave() {
  themeStore.saveSettins({
    callback: () => {
      show.value = false
    },
  })
}

/** 重置设置 */
function handleReset() {
  themeStore.resetSettings()
}

/** 关闭抽屉 */
function handleClose() {
  show.value = false
  // 自动保存设置
  themeStore.saveSettins({ showTips: false })
}

/** 切换灰色模式 */
function changeGreyMode(val: boolean) {
  if (val) {
    document.body.parentElement!.className += 'grey-mode'
  } else {
    document.body.parentElement!.classList.remove('grey-mode')
  }
}
</script>

<template>
  <div class="the-settings-drawer">
    <lay-layer
      v-model="show"
      title="系统设置"
      type="drawer"
      area="340px"
      :close-btn="false"
      @close="handleClose"
    >
      <!-- 布局设置 -->
      <lay-field title="布局设置">
        <div class="setting-item">
          <span>
            开启黑暗模式
            <lay-tooltip content="目前layui-vue的黑暗模式有不少样式问题, 请耐心等待作者修复">
              <!-- 比如黑暗模式下修改主题不生效 -->
              <lay-icon type="layui-icon-about" />
            </lay-tooltip>
          </span>
          <lay-switch v-model="settings.themeMode" onswitch-value="dark" unswitch-value="light" />
        </div>
      </lay-field>

      <!-- 主题色 -->
      <lay-field title="主题色">
        <SettingColor v-model="settings.primaryColor" />
      </lay-field>

      <!-- 基础设置 -->
      <lay-field title="基础设置">
        <div class="setting-item">
          是否显示Logo
          <lay-switch v-model="settings.showLogo" />
        </div>
        <div class="setting-item">
          是否显示面包屑
          <lay-switch v-model="settings.showBreadcrumb" />
        </div>
        <div class="setting-item">
          是否显示页脚
          <lay-switch v-model="settings.showFoot" />
        </div>
        <div class="setting-item">
          是否显示灰色模式
          <lay-switch v-model="settings.showGreyMode" @change="changeGreyMode" />
        </div>
      </lay-field>

      <!-- 菜单设置 -->
      <lay-field title="菜单设置">
        <div class="setting-item">
          菜单手风琴效果
          <lay-switch v-model="settings.accordion" />
        </div>
        <div class="setting-item">
          菜单主题是否相反
          <lay-switch v-model="settings.sideThemeInverse" />
        </div>
      </lay-field>

      <!-- 多页签 -->
      <lay-field title="多页签">
        <div class="setting-item">
          是否显示多页签
          <lay-switch v-model="settings.showTabs" />
        </div>
        <div class="setting-item">
          <span>
            是否缓存多页签
            <lay-tooltip content="不缓存会导致刷新页面后tab栏标签都关闭">
              <lay-icon type="layui-icon-about" />
            </lay-tooltip>
          </span>
          <lay-switch v-model="settings.cacheTabs" />
        </div>
        <div class="setting-item">
          是否显示页面切换动画
          <lay-switch v-model="settings.showAnimation" />
        </div>
        <div class="setting-item">
          页面切换动画类型
          <lay-select
            v-model="settings.animationMode"
            :disabled="!settings.showAnimation"
            style="width: 120px"
          >
            <lay-select-option value="fade-slide" label="滑动" />
            <lay-select-option value="fade" label="消退" />
            <lay-select-option value="fade-bottom" label="底部消退" />
            <lay-select-option value="fade-scale" label="缩放消退" />
            <lay-select-option value="zoom-fade" label="渐变" />
            <lay-select-option value="zoom-out" label="闪现" />
          </lay-select>
        </div>
      </lay-field>

      <div style="padding: 15px">
        <lay-space direction="vertical" fill wrap>
          <lay-button border="green" border-style="dashed" :fluid="true" @click="handleSave">
            保存配置
          </lay-button>
          <lay-button border="red" border-style="dashed" :fluid="true" @click="handleReset">
            重置配置
          </lay-button>
        </lay-space>
      </div>
    </lay-layer>
  </div>
</template>

<style scoped>
.the-settings-drawer {
  display: flex;
}

.the-settings-drawer .setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
