<script setup lang="ts">
import { columns } from './columns'
import JobSearchForm from './components/job-search.vue'
import JobEdit from './components/job-edit.vue'
import type { PageParam, SelectOption, JobQueryParam, QuartzJobDetailDTO, JobClassListResult } from '~/types'
import { convertIntervalUnit, convertCalendarWeek } from '~/utils/convert'

defineOptions({
  // 跟路由name保持一致
  name: 'job_index',
})

const { loading, setLoading } = useLoading(true)
const searchForm = ref()
// 表格数据
const dataSource = ref<QuartzJobDetailDTO[]>([])
// 表格选中数据的key
const selectedKeys = ref([])
// 表格工具栏配置
const defaultToolbar = ref<boolean | string[]>(['filter'])
// 表格分页器配置
const page = ref({
  total: 0,
  limit: 10,
  current: 1,
  layout: ['count', 'prev', 'page', 'next', 'limits',  'refresh', 'skip'],
})
// 是否显示编辑弹窗
const showEdit = ref(false)
// 当前需要编辑的任务
const current = ref<QuartzJobDetailDTO>()
// 默认分页查询参数
const pageParam: PageParam<JobQueryParam> = { page: 1, limit: 10, sort: 'id', order: 'desc' }
// 任务执行类列表数据
const jobClassOptions = ref<SelectOption[]>()

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<JobQueryParam>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageJobApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)

    // 表格数据赋值
    dataSource.value = data!.list as unknown as QuartzJobDetailDTO[]
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
  } as PageParam<JobQueryParam>

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
  } as PageParam<JobQueryParam>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: JobQueryParam) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<JobQueryParam>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 时间解析
 *
 * 说明：
 * 将5,0,0,10,20,0 转换成 05:00:00-10:20:00
 * @param strProp2
 */
function timeParse(strProp2: string) {
  if (!strProp2) return ''

  // 5,0,0,1,2,3 => [5,0,0,1,2,3]
  let timeArr = strProp2.split(',')
  if (timeArr.length != 6) return ''

  let startHour = timeArr[0].length < 2? '0' + timeArr[0] : timeArr[0]
  let startMinute = timeArr[1].length < 2? '0' + timeArr[1] : timeArr[1]
  let startSecond = timeArr[2].length < 2? '0' + timeArr[2] : timeArr[2]
  let endHour = timeArr[3].length < 2? '0' + timeArr[3] : timeArr[3]
  let endMinute = timeArr[4].length < 2? '0' + timeArr[4] : timeArr[4]
  let endSecond = timeArr[5].length < 2? '0' + timeArr[5] : timeArr[5]
  return `${startHour}:${startMinute}:${startSecond}-${endHour}:${endMinute}:${endSecond}`
}

/**
 * 打开编辑弹窗
 * @param row 需要编辑的用户数据。
 */
 function openEditModal(row?: QuartzJobDetailDTO) {
  current.value = row
  showEdit.value = true
}

/** 处理：单体删除 */
function handleDelete(jobName?: string) {
  if (!jobName) {
    layer.msg('任务名不能为空', { icon: 2 })
    return
  }

  useConfirm('确定要删除这条数据吗？', async (layerId: string) => {
    try {
      // 单体删除
      const { success, message } = await deleteJobApi({jobName})
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

/** 处理：暂停/恢复 */
async function pauseOrResume(triggerState: string, jobName: string) {
  if (triggerState == 'PAUSED') {
    try {
      // 恢复任务
      const {success, message} = await resumeJobApi({jobName})
      if (!success) {
        layer.msg(message || '操作失败', { icon: 2 })
        return
      }

      layer.msg(message || '操作成功', { icon: 1 })
      // 重新获取表格数据
      fetchTableData()
    }catch(err) {}
  } else {
    try {
      // 暂停任务
      const {success, message} = await pauseJobApi({jobName})
      if (!success) {
        layer.msg(message || '操作失败', { icon: 2 })
        return
      }

      layer.msg(message || '操作成功', { icon: 1 })
      // 重新获取表格数据
      fetchTableData()
    } catch(err){}
  }
}

/** 处理：立即运行一次 */
async function handlerRunOnce(jobName: string, jobParam?: string) {
  try {
    const { success, message } = await runOnceJobApi({jobName, jobParam})
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 重新获取表格数据
    fetchTableData()
  }catch(err){}
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
      <JobSearchForm
        ref="searchForm"
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
        <!-- 工具栏 -->
        <template #toolbar>
          <lay-button
            v-any-permission="['task:add', 'task:save']"
            size="sm"
            type="primary"
            @click="openEditModal()"
          >
            <lay-icon class="layui-icon-addition" />
            新增
          </lay-button>
        </template>

        <!-- 操作列 -->
        <template #operator="{ row }">
          <lay-button
            v-any-permission="['task:edit', 'task:update']"
            size="xs"
            type="primary"
            @click="openEditModal(row)"
          >
            编辑
          </lay-button>
          <lay-button
            v-permission="'task:delete'"
            size="xs"
            type="danger"
            @click="handleDelete(row.jobName)"
          >
            删除
          </lay-button>
          <!-- 暂停、恢复 -->
          <lay-button
            v-any-permission="['task:edit', 'task:update']"
            size="xs"
            @click="pauseOrResume(row.triggerState, row.jobName)"
          >
            <div v-if="row.triggerState == 'PAUSED'">恢复</div>
            <div v-else>暂停</div>
          </lay-button>
          <lay-button
            v-any-permission="['task:edit', 'task:update']"
            size="xs"
            @click="handlerRunOnce(row.jobName, row.jobParam)"
          >
            立即运行一次
          </lay-button>
        </template>


        <!-- 触发器状态列 -->
        <template #triggerState="{ row }">
          <lay-tag v-if="row.triggerState === 'NORMAL'" type="primary" variant="light">
            运行
          </lay-tag>
          <lay-tag v-else-if="row.triggerState === 'PAUSED'" type="warm" variant="light">
            暂停
          </lay-tag>
          <lay-tag v-else-if="row.triggerState === 'COMPLETE'" type="primary" variant="light">
            完成
          </lay-tag>
          <lay-tag v-else-if="row.triggerState === 'ERROR'" type="danger" variant="light">
            出错
          </lay-tag>
          <lay-tag v-else-if="row.triggerState === 'BLOCKED'" type="warm" variant="light">
            阻塞
          </lay-tag>
          <lay-tag v-else type="danger" variant="light">
            无效
          </lay-tag>
        </template>

        <!-- 触发器类型 -->
        <template #triggerType="{ row }">
          <div v-if="row.triggerType === 'CRON'">
            <div class="trigger-type-title">Cron:</div>
            <div class="trigger-type-content">{{ row.cron }}</div>
          </div>
          <div v-if="row.triggerType === 'CAL_INT'">
            <div class="trigger-type-title">Calendar:</div>
            <div class="trigger-type-content">每{{ convertIntervalUnit(row.strProp1) }}触发{{ row.intProp1 }}次</div>
          </div>
          <div v-if="row.triggerType === 'DAILY_I'">
            <div class="trigger-type-title">DailyTime:</div>
            <div class="trigger-type-content">每周{{ row.strProp2.split(',').map((item: string) => convertCalendarWeek(item)).join('、') }}，{{ timeParse(row.strProp3) || '00:00:00' }}执行，每{{ row.intProp1 }}{{ convertIntervalUnit(row.strProp1) }}触发一次</div>
          </div>
          <div v-if="row.triggerType === 'SIMPLE'">
            <div class="trigger-type-title">Simple:</div>
            <div class="trigger-type-content">每{{ row.simpleRepeatInterval }}毫秒触发{{ row.simpleRepeatCount == -1 ? '一' : row.simpleRepeatCount }}次<span v-if="row.simpleRepeatCount == -1">，一直重复</span></div>
          </div>
        </template>

        <!-- 任务执行类列 -->
        <template #jobClass="{ row }">
          {{ jobClassOptions?.find(state => state.value === row.jobClassName)?.label }}
        </template>
      </lay-table>
    </div>

    <!-- 弹窗 -->
    <JobEdit v-model:visible="showEdit" :data="current" :job-class-options="jobClassOptions" @done="fetchTableData" />
  </lay-container>
</template>

<style scoped>
.trigger-type-title {
  width: 70px;
  font-weight: bold;
  display: inline-block;
}

.trigger-type-content {
  margin-left: 10px;
  display: inline-block;
}
</style>
