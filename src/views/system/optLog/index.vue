<script setup lang="ts">
import { columns } from './columns'
import OptLogSearchForm from './components/opt-log-search.vue'
import OptLogViewModel from './components/opt-log-view.vue'
import type { PageParam, SelectOption, SysOptLog } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_optLog',
})

// 操作类型选项
const typeOptions: SelectOption[] = [
  { label: '操作', value: 'OPERATION' },
  { label: '异常', value: 'EXCEPTION' },
]

const { loading, setLoading } = useLoading(true)
const searchForm = ref()
// 表格数据
const dataSource = ref<SysOptLog[]>([])
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
// 当前需要查看的日志
const current = ref<string>()
// 默认分页查询参数
const pageParam: PageParam<SysOptLog> = { page: 1, limit: 10, sort: 'id', order: 'desc' }

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysOptLog>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageOptLogApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysOptLog[]
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
  } as PageParam<SysOptLog>

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
  } as PageParam<SysOptLog>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: SysOptLog) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<SysOptLog>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 打开详情弹窗
 * @param row
 */
function openViewModal(id: string) {
  current.value = id
  showEdit.value = true
}
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 表格搜索栏 -->
    <OptLogSearchForm ref="searchForm" :type-options="typeOptions" @on-search="handleSearch" />

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
        :height="450"
        max-height="450px"
        @change="changePage"
        @sort-change="changeSort"
      >
        <!-- 操作列 -->
        <template #operator="{ row }">
          <lay-button
            size="xs"
            type="primary"
            @click="openViewModal(row.id)"
          >
            查看
          </lay-button>
        </template>

        <!-- 操作类型列 -->
        <template #type="{ row }">
          {{ typeOptions.find(type => type.value === row.type)?.label }}
        </template>

        <!-- 消耗时间列 -->
        <template #spendTime="{ row }">
          {{ row.spendTime }}ms
        </template>
      </lay-table>
    </lay-card>

    <!-- 弹窗 -->
    <OptLogViewModel v-model:visible="showEdit" :type-options="typeOptions" :data="current" @done="fetchTableData" />
  </lay-container>
</template>
