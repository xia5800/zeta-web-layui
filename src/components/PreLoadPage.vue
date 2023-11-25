<!--
说明：
从[https://github.com/cosmoscatts/parfait]项目抄过来的
-->
<script setup lang="ts">
import { PROJECT_NAME } from '~/config/setting'

const props = withDefaults(defineProps<{
  beforeLeavingMs: number
}>(), {
  beforeLeavingMs: 1200,
})

const { loading, endLoading } = useLoading(true)
useTimeoutFn(endLoading, props.beforeLeavingMs)
onMounted(() => useLottie({
  name: 'lottie-loading',
  containerId: '#lottie-loading',
  path: 'https://image.bestgcc.online/lottie/lf20_z9ed2jna.json',
}))
</script>

<template>
  <div class="loading-mask" />
  <Transition leave-active-class="animate__animated animate__bounceOut">
    <div v-if="loading" class="loading-wrapper">
      <div style="margin-bottom: 100px;">
        <div id="lottie-loading" style="width: 300px; height: 300px;" />
        <div class="flex-center animate__animated animate__fadeInUpBig animate__faster">
          <div class="project-title">
            {{ PROJECT_NAME }}
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  pointer-events: none;
  z-index: 10000;
}
.loading-wrapper {
  position: fixed;
  left: -300px;
  top: -300px;
  bottom: -300px;
  right: -300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 10001;
}

.project-title {
  font-size: 48px;
  font-weight: 700;
  text-align: center;
}
</style>
