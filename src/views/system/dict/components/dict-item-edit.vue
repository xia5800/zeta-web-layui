<script setup lang="ts">
import { layer } from '@layui/layui-vue'
import type { Rules } from 'async-validator'
import { cloneDeep } from 'lodash-es'
import type { SysDictItem, SysDictItemSaveParam, SysDictItemUpdateParam } from '~/types'

const {
  visible = false,
  dictId,
  data,
} = defineProps<{
  visible: boolean
  /** 字典id */
  dictId?: string
  /** 修改时必传，字典项基本数据 */
  data?: SysDictItem
}>()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'update:visible', visible: boolean): void
}>()

const show = computed({
  get() {
    return visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  },
})

const refForm = ref()
// 是否修改弹窗
const isUpdate = ref(false)
// 表单数据
const baseFormData = {
  id: undefined,
  dictId: undefined,
  name: '',
  value: '',
  describe: '',
  sortValue: undefined,
}
const form = reactive<SysDictItem>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  name: { type: 'string', required: true, message: '字典项不能为空' },
  value: { type: 'string', required: true, message: '值不能为空' },
})

/** 初始化表单数据 */
function initData() {
  if (data) {
    Object.assign(form, data, { dictId })
    isUpdate.value = true
  } else {
    Object.assign(form, baseFormData, { dictId })
    isUpdate.value = false
  }
}

/** 关闭弹窗 */
function handleClose() {
  // 重置表单
  refForm.value.reset()
  // 清空表单校验
  refForm.value?.clearValidate()
  // 关闭弹窗
  show.value = false
}

/** 保存数据 */
async function saveData(model: SysDictItem, layerId: string) {
  try {
    // 新增
    const { success, message } = await addDictItemApi({
      ...cloneDeep(model) as SysDictItemSaveParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭loading
    layer.close(layerId)
    // 关闭弹窗
    handleClose()
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 修改数据 */
async function updateData(model: SysDictItem, layerId: string) {
  try {
    // 修改
    const { success, message } = await updateDictItemApi({
      ...cloneDeep(model) as SysDictItemUpdateParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭loading
    layer.close(layerId)
    // 关闭弹窗
    handleClose()
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 表单提交 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: SysDictItem, _errors: any) => {
    if (!isValidate) return

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      isUpdate.value
        ? await updateData(model, layerId)
        : await saveData(model, layerId)
      emit('done')
    })
  })
}

watch(
  () => visible,
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
    area="450px"
    :title="isUpdate ? '编辑字典项' : '新增字典项'"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" style="padding: 10px">
      <lay-form-item label="字典项" prop="name" required>
        <lay-input v-model="form.name" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="值" prop="value" required>
        <lay-input v-model="form.value" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="描述" prop="describe">
        <lay-textarea v-model="form.describe" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="排序" prop="sortvalue">
        <lay-input-number
          v-model="form.sortValue"
          :min="0"
          placeholder="请填写"
          position="right"
          allow-clear
        />
      </lay-form-item>
    </lay-form>
  </lay-layer>
</template>
