<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { TreeData } from '~/types/layui/tree'
import { filterCheckedMenuId, toTreeData } from '../../menu/utils'

const props = withDefaults(defineProps<{
  visible: boolean
  /** 当前编辑的角色id */
  roleId: string
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

// 树选中项
const checkedKeys = ref<string[]>([])
// 树数据
const treeData = ref<TreeData[]>([] as TreeData[])

/** 初始化弹窗数据 */
async function initData() {
  try {
    // 获取树数据
    const { success, message, data } = await listRoleMenuApi(props.roleId)
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
  // fix bug: 解决“一级菜单下有多个二级菜单，如果只选择一部分二级菜单，则一级菜单的id不会包含在内”问题  --by gcc
  let menuIds = [...cloneDeep(checkedKeys.value)]
  if (menuIds.length > 0) {
    // 对menuIds,进行子id找父id操作
    menuIds = getAncestorsAndSelectedIds(treeData.value, menuIds)
  }

  try {
    // 修改角色菜单关联关系
    const { success, message } = await updateRoleMenuApi({
      roleId: props.roleId,
      menuIds, // 菜单id列表 为空代表清空角色与菜单的关联
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

/**
 * 获取所有父节点id
 *
 * @param tree
 * @param selectedIds
 */
function getAncestorsAndSelectedIds(tree: TreeData[], selectedIds: string[]): string[] {
  const result = new Set<string>(selectedIds)

  function findParents(node: TreeData, path: string[]) {
    if (selectedIds.includes(node.id)) {
      path.forEach(id => result.add(id))
    }
    if (node.children) {
      node.children.forEach((child) => {
        findParents(child, [...path, node.id])
      })
    }
  }

  tree.forEach((rootNode) => {
    findParents(rootNode, [])
  })

  return Array.from(result).sort()
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
    <lay-tree
      v-model:checked-keys="checkedKeys"
      :data="treeData"
      :show-checkbox="true"
      :show-line="false"
    />
  </lay-layer>
</template>
