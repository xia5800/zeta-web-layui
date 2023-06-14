<script setup lang="ts">
import { layer } from '@layui/layer-vue'
import { columns } from './columns'
import MenuEdit from './components/menu-edit.vue'
import type { SysMenu } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_menu',
})

const { loading, setLoading } = useLoading(true)
const route = useRoute()
const cardTitle = (route.meta?.title || '') as string
// 表格数据
const dataSource = ref<SysMenu[]>([])
// 表格选中数据的key
const selectedKeys = ref([])
// 表格树展开、收起
const expand = ref<boolean>(true)
// 表格工具栏配置
const defaultToolbar = ref<boolean | string[]>(['filter'])
// 是否显示"新增/编辑"弹窗
const showEdit = ref(false)
// 当前需要编辑的菜单
const current = ref<SysMenu>()
// 子级菜单的parentId
const pid = ref<string>('')
// 子级菜单的path
const parentPath = ref<string>('')

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(sysMenu?: SysMenu) {
  setLoading(true)
  try {
    // 树查询
    const { success, data } = await menuTreeApi({
      ...sysMenu,
    })

    if (!success) return

    // 表格数据赋值
    dataSource.value = data! as unknown as SysMenu[]
  } catch (err) {
  } finally {
    setLoading(false)
  }
}
fetchTableData()

/**
 * 打开编辑弹窗
 * @param row 需要编辑的菜单数据。可以为空，新增的时候不需要传
 */
function openEditModal(row?: SysMenu) {
  current.value = row

  // 初始化
  pid.value = ''
  parentPath.value = ''
  showEdit.value = true
}

/**
 * 打开新增子级弹窗
 * @param row 需要新增子级菜单的菜单数据。
 */
function openAddModal(row: SysMenu) {
  // 子级的parentId即为当前菜单的id
  pid.value = row.id || ''
  // 子级的path即为当前菜单的path
  parentPath.value = row.path || ''

  // 初始化
  current.value = undefined
  showEdit.value = true
}

/** 处理单体删除 */
function handleDelete(id: string) {
  if (!id) {
    layer.msg('请选择菜单', { icon: 2 })
    return
  }

  useConfirm('确定要删除这条数据吗？', async (layerId: string) => {
    try {
      // 单体删除
      const { success, message } = await deleteMenuApi(id)
      if (!success) {
        layer.msg(message || '操作失败', { icon: 2 })
        return
      }

      layer.msg(message || '操作成功', { icon: 1 })
      // 重新获取表格数据
      fetchTableData()
      // 关闭当前弹窗
      layer.close(layerId)
    } catch (err) {
      layer.msg((err as Error).message, { icon: 2 })
    }
  })
}

/** 处理展开折叠 */
async function handleExpand() {
  expand.value = !expand.value
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 树形表格 -->
    <lay-card :title="cardTitle">
      <lay-table
        id="id"
        v-model:selected-keys="selectedKeys"
        :default-expand-all="expand"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :default-toolbar="defaultToolbar"
      >
        <!-- 工具栏 -->
        <template #toolbar>
          <lay-button
            v-any-permission="['sys:user:add', 'sys:user:save']"
            size="sm"
            type="primary"
            @click="openEditModal()"
          >
            新增
          </lay-button>
          <lay-button
            v-permission="'sys:user:delete'"
            size="sm"
            type="danger"
            @click="handleExpand"
          >
            {{ expand ? '全部收起' : '全部展开' }}
          </lay-button>
        </template>

        <!-- 操作列 -->
        <template #operator="{ row }">
          <lay-button
            v-any-permission="['sys:user:add', 'sys:user:save']"
            size="xs"
            type="primary"
            @click="openAddModal(row)"
          >
            新增子级
          </lay-button>
          <lay-button
            v-any-permission="['sys:user:edit', 'sys:user:update']"
            size="xs"
            @click="openEditModal(row)"
          >
            修改
          </lay-button>
          <lay-button
            v-permission="'sys:user:delete'"
            size="xs"
            type="danger"
            @click="handleDelete(row.id)"
          >
            删除
          </lay-button>
        </template>

        <!-- 菜单标题列 -->
        <template #label="{ row }">
          <span>
            <lay-icon v-if="row.icon" :type="row.icon" style="margin-right: 4px;" />
            {{ row.label }}
          </span>
        </template>

        <!-- 是否隐藏列 -->
        <template #hide="{ row }">
          {{ row.hide ? '是' : '否' }}
        </template>

        <!-- 菜单类型列 -->
        <template #type="{ row }">
          <lay-tag v-if="row.type === 'MENU'" type="normal" bordered>
            菜单
          </lay-tag>
          <lay-tag v-else type="warm" bordered>
            按钮
          </lay-tag>
        </template>
      </lay-table>
    </lay-card>

    <!-- 弹窗 -->
    <MenuEdit v-model:visible="showEdit" :pid="pid" :p-path="parentPath" :data="current" @done="fetchTableData" />
  </lay-container>
</template>
