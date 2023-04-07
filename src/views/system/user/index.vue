<script setup lang="ts">
import { layer } from '@layui/layer-vue'
import { columns } from './columns'
import UserSearchForm from './components/user-search.vue'
import UserEdit from './components/user-edit.vue'
import type { PageParam, SysUser } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_user',
})

const { loading, setLoading } = useLoading(true)
const searchForm = ref()
// 表格数据
const dataSource = ref<SysUser[]>([])
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
})
// 是否显示"新增/编辑"弹窗
const showEdit = ref(false)
// 当前需要编辑的用户
const current = ref<SysUser>()
// 默认分页查询参数
const pageParam: PageParam<SysUser> = { page: 1, limit: 10, sort: 'id', order: 'desc' }

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysUser>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageUserApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysUser[]
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
  } as PageParam<SysUser>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: SysUser) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<SysUser>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 打开编辑弹窗
 * @param row 需要编辑的用户数据。可以为空，新增的时候不需要传
 */
function openEditModal(row?: SysUser) {
  current.value = row
  showEdit.value = true
}

/** 处理单体删除 */
function handleDelete(id: string) {
  if (!id) {
    layer.msg('请选择用户', { icon: 2 })
    return
  }

  useConfirm('确定要删除这条数据吗？', async (layerId: string) => {
    try {
      // 单体删除
      const { success, message } = await deleteUserApi(id)
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
    layer.msg('请选择用户', { icon: 2 })
    return
  }

  useConfirm('确定要删除这些数据吗？', async (layerId: string) => {
    try {
      // 批量删除
      const { success, message } = await batchDeleteUserApi(ids)
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

/** 处理重置密码 注意：重置密码会强制该用户下线，请谨慎操作 */
function handlerResetPwd(id: string) {
  useConfirm('确定要将该用户的密码重置为\'123456\'吗？', async (layerId: string) => {
    try {
      // 重置用户密码
      const { success, message } = await resetUserPasswordApi({
        id,
        password: '123456',
      })
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

/** 修改用户状态 */
async function changeState(val: number, id: string) {
  const { success, message } = await updateUserStateApi({ id, state: val })
  if (!success) {
    // TODO: 不知道修改失败之后，怎么让switch还原
    layer.msg(message || '修改失败', { icon: 2 })
    return
  }
  layer.msg(message || '修改成功', { icon: 1 })
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 表格搜索栏 -->
    <UserSearchForm ref="searchForm" @on-search="handleSearch" />

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
        :auto-cols-width="true"
        max-height="450px"
        @change="changePage"
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
            @click="handleBatchDelete"
          >
            删除
          </lay-button>
        </template>

        <!-- 操作列 -->
        <template #operator="{ row }">
          <lay-button
            v-any-permission="['sys:user:edit', 'sys:user:update']"
            size="xs"
            type="primary"
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
          <lay-button
            v-any-permission="['sys:user:edit', 'sys:user:update']"
            size="xs"
            @click="handlerResetPwd(row.id)"
          >
            重置密码
          </lay-button>
        </template>

        <!-- 头像列 -->
        <template #avatar="{ row }">
          <lay-avatar :src="row.avatar" radius />
        </template>

        <!-- 角色列 -->
        <template #roles="{ row }">
          <lay-tag v-for="role in row.roles" :key="role.id" max-width="100px">
            {{ role?.name || '无' }}
          </lay-tag>
        </template>

        <!-- 性别列 -->
        <template #sex="{ row }">
          <span v-if="row.sex">{{ row.sex === 1 ? '男' : '女' }}</span>
          <span v-else>未知</span>
        </template>

        <!-- 状态列 -->
        <template #state="{ row }">
          <lay-switch
            v-model="row.state"
            onswitch-text="启用"
            :onswitch-value="1"
            unswitch-text="停用"
            :unswitch-value="0"
            @change="(val) => changeState(val as number, row.id)"
          />
        </template>
      </lay-table>
    </lay-card>

    <!-- 弹窗 -->
    <UserEdit v-model:visible="showEdit" :data="current" @done="fetchTableData" />
  </lay-container>
</template>
