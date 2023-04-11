<script setup lang="ts">
import { layer } from '@layui/layer-vue'
import { columns } from './columns'
import RoleSearchForm from './components/role-search.vue'
import RoleEdit from './components/role-edit.vue'
import roleMenuEdit from './components/role-menu-edit.vue'
import type { PageParam, SysRole } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_role',
})

const { loading, setLoading } = useLoading(true)
const searchForm = ref()
// 表格数据
const dataSource = ref<SysRole[]>([])
// 表格选中数据的key
const selectedKeys = ref([])
// 表格工具栏配置
const defaultToolbar = ref<boolean | string[]>(['filter'])
// 表格分页器配置
const page = ref({
  total: 0,
  limit: 10,
  current: 1,
  showRefresh: true,
  theme: primaryColor, // auto import hooks/ui.ts
})
// 是否显示"新增/编辑"弹窗
const showEdit = ref(false)
// 是否显示“分配权限”弹窗
const showEditRoleMenu = ref(false)
// 当前需要编辑的角色
const current = ref<SysRole>()
// 当前需要分配权限的角色id
const roleId = ref<string>('')
// 默认分页查询参数
const pageParam: PageParam<SysRole> = { page: 1, limit: 10, sort: 'id', order: 'desc' }

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysRole>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageRoleApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysRole[]
  } catch (err) {
  } finally {
    setLoading(false)
  }
}
fetchTableData()

/** 分页事件 */
function changePage(data: any) {
  // 获取搜索组件查询条件
  const formModel = searchForm.value.formModel

  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: data.current,
    limit: data.limit,
  } as PageParam<SysRole>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: SysRole) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<SysRole>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 打开编辑弹窗
 * @param row 需要编辑的数据。可以为空，新增的时候不需要传
 */
function openEditModal(row?: SysRole) {
  current.value = row
  showEdit.value = true
}

/**
 * 打开分配权限弹窗
 * @param row
 */
function openEditRoleMenuModal(row: SysRole) {
  roleId.value = row.id!
  showEditRoleMenu.value = true
}

/** 处理单体删除 */
function handleDelete(id: string) {
  if (!id) {
    layer.msg('请选择角色', { icon: 2 })
    return
  }

  useConfirm('确定要删除这条数据吗？', async (layerId: string) => {
    try {
      // 单体删除
      const { success, message } = await deleteRoleApi(id)
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

/** 处理批量删除 */
async function handleBatchDelete() {
  // 参数校验
  const ids = selectedKeys.value
  if (ids.length === 0) {
    layer.msg('请选择角色', { icon: 2 })
    return
  }

  useConfirm('确定要删除这些数据吗？', async (layerId: string) => {
    try {
      // 批量删除
      const { success, message } = await batchDeleteRoleApi(ids)
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
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 表格搜索栏 -->
    <RoleSearchForm ref="searchForm" @on-search="handleSearch" />

    <!-- 数据表格 -->
    <lay-card>
      <lay-table
        id="id"
        v-model:selected-keys="selectedKeys"
        :loading="loading"
        :page="page"
        :columns="columns"
        :data-source="dataSource"
        :default-toolbar="defaultToolbar"
        :height="450"
        max-height="450px"
        @change="changePage"
      >
        <!-- 工具栏 -->
        <template #toolbar>
          <lay-button
            v-any-permission="['sys:role:add', 'sys:role:save']"
            size="sm"
            type="primary"
            @click="openEditModal()"
          >
            新增
          </lay-button>
          <lay-button
            v-permission="'sys:role:delete'"
            size="sm"
            type="danger"
            @click="handleBatchDelete"
          >
            删除
          </lay-button>
        </template>

        <!-- 操作列 -->
        <template #operator="{ row }">
          <lay-button
            v-any-permission="['sys:role:edit', 'sys:role:update']"
            size="xs"
            type="primary"
            @click="openEditModal(row)"
          >
            修改
          </lay-button>
          <lay-button
            v-permission="'sys:role:delete'"
            size="xs"
            type="danger"
            @click="handleDelete(row.id)"
          >
            删除
          </lay-button>
          <lay-button
            v-any-permission="['sys:role:edit', 'sys:role:update']"
            size="xs"
            type="normal"
            @click="openEditRoleMenuModal(row)"
          >
            分配权限
          </lay-button>
        </template>
      </lay-table>
    </lay-card>

    <!-- 弹窗 -->
    <RoleEdit v-model:visible="showEdit" :data="current" @done="fetchTableData" />
    <roleMenuEdit v-model:visible="showEditRoleMenu" :role-id="roleId" />
  </lay-container>
</template>
