<script setup lang="ts">
import { columns } from './columns'
import LoginLogSearchForm from './components/login-log-search.vue'
import type { PageParam, SelectOption, SysLoginLog } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_loginLog',
})

// 登录日志状态选项
const stateOptions: SelectOption[] = [
  { label: '登录成功', value: 'SUCCESS' },
  { label: '登录失败', value: 'FAIL' },
  { label: '密码不正确', value: 'ERROR_PWD' },
  { label: '注销登录', value: 'LOGOUT' },
]

const { loading, setLoading } = useLoading(true)
const searchForm = ref()
// 表格数据
const dataSource = ref<SysLoginLog[]>([])
// 表格选中数据的key
const selectedKeys = ref([])
// 表格工具栏配置
const defaultToolbar = ref<boolean | string[]>(false)
// 表格分页器配置
const page = ref({
  total: 0,
  limit: 10,
  current: 1,
  showRefresh: true,
})
// 默认分页查询参数
const pageParam: PageParam<SysLoginLog> = { page: 1, limit: 10, sort: 'id', order: 'desc' }

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysLoginLog>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageLoginLogApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysLoginLog[]
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
  } as PageParam<SysLoginLog>

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
  } as PageParam<SysLoginLog>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: SysLoginLog) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<SysLoginLog>

  // 获取表格数据
  fetchTableData(param)
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 表格搜索栏 -->
    <LoginLogSearchForm ref="searchForm" :state-options="stateOptions" @on-search="handleSearch" />

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
        max-height="450px"
        @change="changePage"
        @sort-change="changeSort"
      >
        <template #state="{ row }">
          {{ stateOptions.find(state => state.value === row.state)?.label }}
        </template>
      </lay-table>
    </lay-card>
  </lay-container>
</template>
