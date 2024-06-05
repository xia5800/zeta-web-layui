<script setup lang="ts">
import { columns } from './columns'
import type { PageParam } from '~/types/global'
import type { SelectOption } from '~/types/layui/select'
import type { TaskLogDTO, TaskLog } from '~/types/job/taskLog'
import type { JobClassListResult } from '~/types/job/job'
import JobLogSearchForm from './components/job-log-search.vue'

defineOptions({
  // 跟路由name保持一致
  name: 'job_log',
})

// 任务日志类型选项
const typeOptions: SelectOption[] = [
  { label: '执行成功', value: 'SUCCESS' },
  { label: '执行异常', value: 'EXCEPTION' },
]

const { loading, setLoading } = useLoading(true)
const searchForm = ref()
// 表格数据
const dataSource = ref<TaskLogDTO[]>([])
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
// 默认分页查询参数
const pageParam: PageParam<TaskLog> = { page: 1, limit: 10, sort: 'id', order: 'desc' }
// 任务执行类列表数据
const jobClassOptions = ref<SelectOption[]>()

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<TaskLog>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageTaskLogApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as TaskLogDTO[]
  } catch (err) {
  } finally {
    setLoading(false)
  }
}

/**
 * 获取任务执行类列表
 */
async function getJobClassList() {
  try {
    // 获取任务执行类列表
    const { success, data } = await queryJobClassListApi()
    if (!success) return

    // 回显
    jobClassOptions.value = data!.map((jobClass: JobClassListResult) => ({
      label: jobClass.description,
      value: jobClass.value,
    }))
  } catch (err) {}
}

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
  } as PageParam<TaskLog>

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
  } as PageParam<TaskLog>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: TaskLog) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<TaskLog>

  // 获取表格数据
  fetchTableData(param)
}

onMounted(() => {
  // 获取任务执行类列表
  getJobClassList()
  // 获取表格数据
  fetchTableData()
})
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 表格搜索栏 -->
    <lay-card>
      <JobLogSearchForm
        ref="searchForm"
        :type-options="typeOptions"
        :job-class-options="jobClassOptions"
        @on-search="handleSearch"
      />
    </lay-card>

    <!-- 数据表格 -->
    <div class="z-table-box">
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
        height="600px"
        @change="changePage"
        @sort-change="changeSort"
      >
        <!-- 日志类型列 -->
        <template #type="{ row }">
          <lay-tag v-if="row.type === 'SUCCESS'" type="normal" variant="light">
            执行成功
          </lay-tag>
          <lay-tag v-else-if="row.type === 'EXCEPTION'" type="danger" variant="light">
            执行异常
          </lay-tag>
        </template>

        <!-- 耗时列 -->
        <template #spendTime="{ row }">
          {{ row.spendTime }}ms
        </template>

        <!-- 任务执行类列 -->
        <template #jobClass="{ row }">
          <lay-tag v-if="jobClassOptions">
            {{ jobClassOptions?.find(state => state.value === row.jobClassName)?.label }}
          </lay-tag>
        </template>

        <!-- 执行情况列 -->
        <template #result="{ row }">
          {{ row.type === 'SUCCESS' ? row.result : row.exception }}
        </template>"
      </lay-table>
    </div>
  </lay-container>
</template>
