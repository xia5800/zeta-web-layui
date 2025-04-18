<script setup lang="ts">
import { columns } from './columns'
import type { PageParam } from '~/types/global'
import type { SysUser } from '~/types/system/user'
import UserSearchForm from './components/user-search.vue'
import UserEdit from './components/user-edit.vue'

defineOptions({
  // 跟路由name保持一致
  name: 'system_user',
})

const { loading, setLoading } = useLoading(true)
const downloadLoading = ref<boolean>(false)
const exportLoading = ref<boolean>(false)
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
  layout: ['count', 'prev', 'page', 'next', 'limits', 'refresh', 'skip'],
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
  } catch {
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

/** 排序事件 */
function changeSort(columnName: string, order: string) {
  // 获取搜索组件查询条件
  const formModel = searchForm.value.formModel

  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...{ page: page.value.current, limit: page.value.limit },
    sort: columnName,
    order,
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
async function changeState(val: number, row: SysUser) {
  const { success, message } = await updateUserStateApi({ id: row.id as string, state: val })
  if (!success) {
    layer.msg(message || '修改失败', { icon: 2 })
    return
  }
  layer.msg(message || '修改成功', { icon: 1 })
  row.state = val
}

/** 导出数据 */
async function exportData() {
  exportLoading.value = true
  try {
    // UserExportUrl 在 ~/api/system/user.ts 中定义
    await useExportExcel(UserExportUrl, {
      fileName: '用户数据',
      queryParam: { ...searchForm.value.formModel }
    })
  } catch (err) {
    layer.msg((err as Error).message, { icon: 2 })
  } finally {
    exportLoading.value = false
  }
}

/** 下载导入模板 */
async function downloadTmpl() {
  downloadLoading.value = true
  try {
    // UserImportTemplateUrl 在 ~/api/system/user.ts 中定义
    await useDownloadExcelTemplate(UserImportTemplateUrl, '用户数据模板')
  } catch (err) {
    layer.msg((err as Error).message, { icon: 2 })
  } finally {
    downloadLoading.value = false
  }
}

/**
 * 处理excel上传成功回调
 *
 * @param result
 */
function handleImportSuccess(result: ApiResult<boolean>) {
  const { success, message } = result
  if (!success) {
    layer.msg(message || '上传失败', { icon: 2 })
    return
  }

  // 重新获取表格数据
  fetchTableData()
}

/**
 * 处理excel上传失败回调
 */
function handleImportError(msg: string) {
  layer.msg(msg || '上传失败', { icon: 2 })
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 表格搜索栏 -->
    <lay-card>
      <UserSearchForm ref="searchForm" @on-search="handleSearch" />
    </lay-card>

    <!-- 数据表格 -->
    <div class="z-table-box">
      <!-- 导入导出按钮 -->
      <div style="display: flex; justify-content: end;">
        <lay-space style="margin-bottom: 10px;">
          <lay-button v-any-permission="['sys:user:view', 'sys:user:export']" :loading="exportLoading" @click="exportData">
            {{ exportLoading ? '导出中...' : '导出数据' }}
          </lay-button>

          <lay-button v-any-permission="['sys:user:view', 'sys:user:import']" :loading="downloadLoading" @click="downloadTmpl">
            {{ downloadLoading ? '下载中...' : '下载模板' }}
          </lay-button>

          <!-- UserExcelImportUrl 在 ~/api/system/user.ts 中定义 -->
          <ExcelFileUpload
            v-any-permission="['sys:user:save', 'sys:user:import']"
            :url="UserExcelImportUrl"
            text="导入数据"
            @success="handleImportSuccess"
            @error="handleImportError"
          />
        </lay-space>
      </div>

      <lay-table
        id="id"
        v-model:selected-keys="selectedKeys"
        :loading="loading"
        :page="page"
        :columns="columns"
        :data-source="dataSource"
        :default-toolbar="defaultToolbar"
        :auto-cols-width="true"
        :resize="true"
        height="540px"
        @change="changePage"
        @sort-change="changeSort"
      >
        <!-- 工具栏 -->
        <template #toolbar>
          <lay-button
            v-any-permission="['sys:user:add', 'sys:user:save']"
            size="sm"
            type="primary"
            @click="openEditModal()"
          >
            <lay-icon class="layui-icon-addition" />
            新增
          </lay-button>
          <lay-button
            v-permission="'sys:user:delete'"
            size="sm"
            type="danger"
            @click="handleBatchDelete"
          >
            <lay-icon class="layui-icon-delete" />
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
            编辑
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
            :model-value="row.state"
            onswitch-text="启用"
            :onswitch-value="1"
            unswitch-text="停用"
            :unswitch-value="0"
            @change="(val: number) => changeState(val, row)"
          />
        </template>
      </lay-table>
    </div>

    <!-- 弹窗 -->
    <UserEdit v-model:visible="showEdit" :data="current" @done="fetchTableData" />
  </lay-container>
</template>
