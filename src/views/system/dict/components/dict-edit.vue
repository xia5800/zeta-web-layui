<script setup lang="ts">
import type { Rules } from 'async-validator'
import { cloneDeep } from 'lodash-es'
import type { SysDict, SysDictSaveParam, SysDictUpdateParam } from '~/types'

const {
  visible = false,
  data,
} = defineProps<{
  visible: boolean
  /** 修改时必传，角色基本数据 */
  data?: SysDict
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
  name: '',
  code: '',
  describe: '',
  sortValue: undefined,
}
const form = reactive<SysDict>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  name: { type: 'string', required: true, message: '字典名不能为空' },
  code: { type: 'string', required: true, message: '字典编码不能为空' },
})

/** 初始化表单数据 */
function initData() {
  if (data) {
    Object.assign(form, cloneDeep(data))
    isUpdate.value = true
  } else {
    Object.assign(form, baseFormData)
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
async function saveData(model: SysDict, layerId: string) {
  try {
    // 新增
    const { success, message } = await addDictApi({
      ...cloneDeep(model) as SysDictSaveParam,
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
async function updateData(model: SysDict, layerId: string) {
  try {
    // 修改
    const { success, message } = await updateDictApi({
      ...cloneDeep(model) as SysDictUpdateParam,
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
  refForm.value.validate((isValidate: boolean, model: SysDict, _errors: any) => {
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
    :title="isUpdate ? '编辑字典' : '新增字典'"
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
      <lay-form-item label="字典名" prop="name" required>
        <lay-input v-model="form.name" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item label="字典编码" prop="code" required>
        <lay-input v-model="form.code" placeholder="请填写" allow-clear />
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
