<script setup lang="ts">
import type { SelectOption, SysOptLog } from '~/types'

const props = withDefaults(defineProps<{
  visible: boolean
  /** 操作类型选项 */
  typeOptions: SelectOption[]
  /** 操作日志id */
  data?: string
}>(), {
  visible: false,
})

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'update:visible', visible: boolean): void
}>()

const show = computed({
  get() {
    return props.visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  },
})

const refForm = ref()
// 表单数据
const baseFormData = {
  id: '',
  type: undefined,
  description: '',
  url: '',
  httpMethod: '',
  classPath: '',
  params: '',
  result: '',
  exception: '',
  spendTime: '',
  os: '',
  device: '',
  browser: '',
  ip: '',
  ipRegion: '',
  createTime: '',
  userName: '',
}
const form = reactive<SysOptLog>({ ...baseFormData })

/** 获取操作日志详情 */
async function getOptLogInfo(id: string) {
  try {
    // 单体查询
    const { success, message, data } = await getOptLogApi(id)
    if (!success) {
      layer.msg(message || '获取数据失败', { icon: 2 })
      return
    }

    // 设置表单的值
    Object.assign(form, data)

    // 获取修改人
    const resp = await getUserApi(data!.createdBy!)
    if (!resp.success) return
    form.userName = resp.data?.username
  } catch (e) {
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 初始化表单数据 */
function initData() {
  if (props.data) {
    getOptLogInfo(props.data)
  } else {
    Object.assign(form, baseFormData)
  }
}

/** 关闭弹窗 */
function handleClose() {
  // 关闭弹窗
  show.value = false
}

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      // 初始化弹窗数据
      initData()
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    area="780px"
    title="详情"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" style="padding: 10px">
      <lay-row>
        <!-- 基本信息 -->
        <lay-col :md="12">
          <lay-form-item class="text-center" label="操作人:" prop="userName">
            {{ form.userName }}
          </lay-form-item>
          <lay-form-item class="text-center" label="操作时间:" prop="createTime">
            {{ form.createTime }}
          </lay-form-item>
          <lay-form-item class="text-center" label="请求方式:" prop="httpMethod">
            {{ form.httpMethod }}
          </lay-form-item>
          <lay-form-item class="text-center" label="请求耗时:" prop="spendTime">
            {{ form.spendTime }}
          </lay-form-item>
          <lay-form-item class="text-center" label="操作类型:" prop="type">
            {{ typeOptions.find(type => type.value === form.type)?.label }}
          </lay-form-item>
        </lay-col>
        <lay-col :md="12">
          <lay-form-item class="text-center" label="ip地址:" prop="ip">
            {{ form.ip }}
          </lay-form-item>
          <lay-form-item class="text-center" label="操作系统:" prop="os">
            {{ form.os }}
          </lay-form-item>
          <lay-form-item class="text-center" label="设备名称:" prop="device">
            {{ form.device }}
          </lay-form-item>
          <lay-form-item class="text-center" label="浏览器类型:" prop="browser">
            {{ form.browser }}
          </lay-form-item>
          <lay-form-item class="text-center" label="操作描述:" prop="ipRegion">
            {{ form.description }}
          </lay-form-item>
        </lay-col>
        <lay-line margin="5px" theme="#EEE" />
        <!-- 接口方法信息 -->
        <lay-col :md="24">
          <lay-form-item class="text-center" label="请求地址:" prop="url">
            {{ form.url }}
          </lay-form-item>
          <lay-form-item class="text-center" label="调用方法:" prop="classPath">
            {{ form.classPath }}
          </lay-form-item>
          <lay-form-item label="请求参数:" prop="params">
            <lay-textarea v-model="form.params" disabled />
          </lay-form-item>
          <lay-form-item label="返回结果:" prop="result">
            <lay-textarea v-model="form.result" disabled />
          </lay-form-item>
          <lay-form-item label="异常描述:" prop="exception">
            <lay-textarea v-model="form.exception" disabled />
          </lay-form-item>
        </lay-col>
      </lay-row>
    </lay-form>
  </lay-layer>
</template>

<style scoped>
:deep(.text-center .layui-input-block) {
  display: flex;
  align-items: center;
}

:deep(.layui-form-label) {
  font-weight: 700;
}
</style>
