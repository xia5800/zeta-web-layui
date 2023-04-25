<script setup lang="ts">
import { filterCheckedMenuId, toTreeData } from '../../menu/utils'
import type { TreeData } from '~/types'

const {
  visible = false,
  roleId,
} = defineProps<{
  visible: boolean
  /** 当前编辑的角色id */
  roleId: string
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

// 树选中项
const checkedKeys = ref<string[]>([])
// 树数据
const treeData = ref<TreeData[]>([] as TreeData[])

/** 初始化弹窗数据 */
async function initData() {
  try {
    // 获取树数据
    const { success, message, data } = await listRoleMenuApi(roleId)
    if (!success) {
      layer.msg(message || '获取数据失败', { icon: 2 })
      return
    }

    // 赋值
    treeData.value = toTreeData(data, true)
    checkedKeys.value = filterCheckedMenuId(data)
  } catch (e) {
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 关闭弹窗 */
function handleClose() {
  // 初始化数据
  checkedKeys.value = []
  treeData.value = []
  // 关闭弹窗
  show.value = false
}

/** 表单提交 */
async function handleSubmit() {
  try {
    // 修改角色菜单关联关系
    const { success, message } = await updateRoleMenuApi({
      roleId,
      menuIds: checkedKeys.value, // 菜单id列表 为空代表清空角色与菜单的关联
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭弹窗
    handleClose()
    emit('done')
  } catch (e) {
    layer.msg((e as Error).message, { icon: 2 })
  }
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
    :area="['300px', '700px']"
    title="分配权限"
    :shade-close="false"
    :move="true"
    :maxmin="false"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <!--
      TODO: 注释待删除，
      下面data类型报错的原因是，lay-tree组件的data类型搞错了，文档上说可以传数组，但是组件里data类型并不支持数组
    -->
    <lay-tree
      v-model:checkedKeys="checkedKeys"
      :data="treeData"
      :show-checkbox="true"
      :show-line="false"
    />
  </lay-layer>
</template>
