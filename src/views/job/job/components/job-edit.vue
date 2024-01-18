<script setup lang="ts">
import type { Rules } from 'async-validator'
import type { SelectOption } from '~/types/layui/select'
import type {
  Calendar, DailyTime, DaysOfWeek,
  JobSaveOrUpdateParam, QuartzJobDetailDTO, ScheduleType,
  Simple,
} from '~/types/job/job'
import { cloneDeep } from 'lodash-es'
import { convertCalendarWeek } from '~/utils/convert'
import KvTable from './kv-table.vue'
import CronSelect from './cron-select.vue'

const props = withDefaults(defineProps<{
  visible: boolean,
  /** 任务执行类 */
  jobClassOptions?: SelectOption[],
  /** 修改时必传，任务信息 */
  data?: QuartzJobDetailDTO
}>(), {
  visible: false
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

const refForm = ref()
const kvTable = ref()
// 是否修改弹窗
const isUpdate = ref(false)
// 时间范围
const timeRange = ref<string[]>(['00:00:00','12:00:00'])
// 表单数据
const baseFormData = {
  jobName: '',
  jobDescription: undefined,
  jobClassName: '',
  jobParam: undefined,
  priority: 0,
  scheduleType: 'CRON' as ScheduleType,
  cron: '',
  calendar: {
    timeInterval: 1,
    unit: 'SECOND',
  } as Calendar,
  dailyTime: {
    type: 'EveryDay',
    daysOfWeek: [],
    timeInterval: 1,
    unit: undefined,
    startTime: undefined,
    endTime: undefined
  } as DailyTime,
  simple: {
    unit: 'SECONDS',
    timeInterval: 1,
    repeatCount: undefined,
    repeatForever: false,
  } as Simple,
}
const form = reactive<JobSaveOrUpdateParam>({ ...baseFormData })
// 表单校验规则
const rules = ref<Rules>({
  jobName: { type: 'string', required: true, message: '任务名称不能为空' },
  jobClassName: { type: 'string', required: true, message: '任务执行类不能为空' },
  scheduleType: { type: 'string', required: true, message: '调度类型不能为空' },
})

/** 初始化表单数据 */
function initData() {
  if (props.data) {
    isUpdate.value = true
    let timeRangeArr = timeParse(props.data.strProp3)
    let weekArr = weekParse(props.data.strProp2)
    let dailyTimeUnit = props.data.strProp1

    form.jobName = props.data.jobName || ''
    form.jobDescription = props.data.jobDescription || ''
    form.jobClassName = props.data.jobClassName || ''
    form.jobParam = props.data.jobParam || ''
    form.priority = props.data.priority || 0

    // 设置调度类型
    form.scheduleType = props.data.triggerType || 'CRON'
    if (form.scheduleType !== 'DAILY_I') {
      weekArr = []
      dailyTimeUnit = ''
    }
    // 设置调度类型为CAL_INT时的参数
    form.calendar = {
      timeInterval: props.data.intProp1 || 1,
      unit: props.data.strProp1 || 'SECOND' as any
    }
    // 设置调度类型为DAILY_TIME时的参数
    form.dailyTime = {
      type: 'DaysOfTheWeek',
      daysOfWeek: weekArr as unknown as DaysOfWeek[],
      timeInterval: props.data.intProp1 || 1,
      unit: dailyTimeUnit || 'SECOND' as any,
      startTime: timeRangeArr[0],
      endTime: timeRangeArr[1],
    }
    // 设置调度类型为SIMPLE时的参数
    form.simple = {
      unit: 'MILLISECONDS',
      timeInterval: props.data.simpleRepeatInterval || 1,
      repeatCount: props.data.simpleRepeatCount,
      repeatForever: props.data.simpleRepeatCount == -1,
    }
    // 设置调度类型为CRON时的参数
    form.cron = props.data.cron || ''

    // 初始化时间范围
    if (form.dailyTime.startTime) {
      timeRange.value[0] = form.dailyTime.startTime
    }
    if (form.dailyTime.endTime) {
      timeRange.value[1] = form.dailyTime.endTime
    }

    // 设置任务参数
    kvTable.value.setTableData(props.data.jobParam)
  } else {
    Object.assign(form, baseFormData)
    isUpdate.value = false
  }
}

/**
 * 时间解析
 *
 * 说明：
 * 将5,0,0,10,20,0 转换成 [05:00:00,10:20:00]
 * @param strProp2
 */
function timeParse(strProp2?: string) {
  if (!strProp2) return []

  // 5,0,0,1,2,3 => [5,0,0,1,2,3]
  let timeArr = strProp2.split(',')
  if (timeArr.length != 6) return []

  let startHour = timeArr[0].length < 2? '0' + timeArr[0] : timeArr[0]
  let startMinute = timeArr[1].length < 2? '0' + timeArr[1] : timeArr[1]
  let startSecond = timeArr[2].length < 2? '0' + timeArr[2] : timeArr[2]
  let endHour = timeArr[3].length < 2? '0' + timeArr[3] : timeArr[3]
  let endMinute = timeArr[4].length < 2? '0' + timeArr[4] : timeArr[4]
  let endSecond = timeArr[5].length < 2? '0' + timeArr[5] : timeArr[5]
  return [`${startHour}:${startMinute}:${startSecond}`, `${endHour}:${endMinute}:${endSecond}`]
}

/**
 * 周解析
 * 说明：
 * 将1,2,3 转换成 ['SUNDAY', 'MONDAY', 'TUESDAY']
 * @param strProp1
 */
function weekParse(strProp1?: string) {
  if (!strProp1) return []

  let weekArr = strProp1.split(',')
  return weekArr.map(item => {
    return convertCalendarWeek(item, false)
  })
}

/** 时间组件Change事件处理 */
function timeRangeChange() {
  form.dailyTime.startTime = timeRange.value[0]
  form.dailyTime.endTime = timeRange.value[1]
}

/** 关闭弹窗 */
function handleClose() {
  // 关闭弹窗
  show.value = false

  // 重置表单
  refForm.value.reset()
  // 清空表单校验
  refForm.value?.clearValidate()
}

/** 保存数据 */
async function saveData(model: JobSaveOrUpdateParam, layerId: string) {
  try {
    // 创建任务
    const { success, message } = await addJobApi({
      ...cloneDeep(model) as JobSaveOrUpdateParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭弹窗
    handleClose()
    // 关闭loading
    layer.close(layerId)
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 修改数据 */
async function updateData(model: JobSaveOrUpdateParam, layerId: string) {
  try {
    // 修改任务
    const { success, message } = await updateJobApi({
      ...cloneDeep(model) as JobSaveOrUpdateParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭弹窗
    handleClose()
    // 关闭loading
    layer.close(layerId)
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 表单提交 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: JobSaveOrUpdateParam, _errors: any) => {
    if (!isValidate) return

    // 获取任务参数
    model.jobParam = kvTable.value.getTableData()

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      isUpdate.value
        ? await updateData(model, layerId)
        : await saveData(model, layerId)
      emit('done')
    })
  })
}

watch(
  () => props.visible,
  (visible: boolean) => {
    if (visible) {
      nextTick(() => {
        // 初始化弹窗数据
        initData()
      })
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    :title="isUpdate ? '编辑' : '新增'"
    :area="['40%','90%']"
    :shade-close="false"
    :maxmin="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" label-width="100" style="padding: 10px; padding-right: 30px;">
      <lay-field title="基本配置" />
      <lay-row>
        <!-- 左 -->
        <lay-col :md="12">
          <lay-form-item label="任务名称" prop="jobName" required>
            <lay-input v-model="form.jobName" placeholder="请填写" allow-clear :disabled="isUpdate" />
          </lay-form-item>
        </lay-col>
        <!-- 右 -->
        <lay-col :md="12">
          <lay-form-item label="触发器优先级" prop="priority">
            <lay-input-number v-model="form.priority" placeholder="请填写" allow-clear />
          </lay-form-item>
        </lay-col>
        <lay-form-item label="任务描述" prop="jobDescription">
          <lay-textarea v-model="form.jobDescription" placeholder="请填写" :span="2" allow-clear />
        </lay-form-item>
      </lay-row>

      <lay-field title="调度配置" />
      <lay-form-item label="调度类型" prop="jobClassName" required>
        <lay-select v-model="form.scheduleType" placeholder="请选择" allow-clear style="width: 100%">
          <lay-select-option value="CRON" label="CRON" />
          <lay-select-option value="CAL_INT" label="CAL_INT" />
          <lay-select-option value="DAILY_I" label="DAILY_I" />
          <lay-select-option value="SIMPLE" label="SIMPLE" />
        </lay-select>
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'CRON'" label="cron表达式" prop="cron" :required="form.scheduleType === 'CRON'">
        <cron-select v-model="form.cron" placeholder="请填写" allow-clear  />
      </lay-form-item>

      <lay-form-item v-if="form.scheduleType === 'CAL_INT'" label="间隔单位" prop="calendar.unit" :required="form.scheduleType === 'CAL_INT'">
        <lay-select v-model="form.calendar.unit" placeholder="请选择" allow-clear style="width: 100%">
          <lay-select-option value="MILLISECOND" label="毫秒" />
          <lay-select-option value="SECOND" label="秒" />
          <lay-select-option value="MINUTE" label="分钟" />
          <lay-select-option value="HOUR" label="小时" />
          <lay-select-option value="DAY" label="日" />
          <lay-select-option value="WEEK" label="周" />
          <lay-select-option value="MONTH" label="月" />
          <lay-select-option value="YEAR" label="年" />
        </lay-select>
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'CAL_INT'" label="间隔时间" prop="calendar.timeInterval" :required="form.scheduleType === 'CAL_INT'">
        <lay-input-number v-model="form.calendar.timeInterval" :min="1" placeholder="请填写" allow-clear />
      </lay-form-item>

      <lay-form-item v-if="form.scheduleType === 'DAILY_I'" label="执行类型" prop="dailyTime.type" :required="form.scheduleType === 'DAILY_I'">
        <lay-select v-model="form.dailyTime.type" placeholder="请选择" allow-clear style="width: 100%">
          <lay-select-option value="EveryDay" label="每天" />
          <lay-select-option value="MondayThroughFriday" label="周一至周五" />
          <lay-select-option value="SaturdayAndSunday" label="周六和周日" />
          <lay-select-option value="DaysOfTheWeek" label="自定义" />
        </lay-select>
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'DAILY_I'" label="间隔单位" prop="dailyTime.unit">
        <lay-select v-model="form.dailyTime.unit" placeholder="请选择" allow-clear style="width: 100%">
          <lay-select-option value="SECOND" label="秒" />
          <lay-select-option value="MINUTE" label="分钟" />
          <lay-select-option value="HOUR" label="小时" />
        </lay-select>
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'DAILY_I'" label="间隔时间" prop="dailyTime.timeInterval">
        <lay-input-number v-model="form.dailyTime.timeInterval" :min="1" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item
        label="周" prop="dailyTime.daysOfWeek"
        v-if="form.scheduleType === 'DAILY_I' && form.dailyTime.type === 'DaysOfTheWeek'"
        :required="form.scheduleType === 'DAILY_I' && form.dailyTime.type === 'DaysOfTheWeek'"
      >
        <lay-select v-model="form.dailyTime.daysOfWeek" placeholder="请选择" multiple allow-clear style="width: 100%">
          <lay-select-option value="SUNDAY" label="周日" />
          <lay-select-option value="MONDAY" label="周一" />
          <lay-select-option value="TUESDAY" label="周二" />
          <lay-select-option value="WEDNESDAY" label="周三" />
          <lay-select-option value="THURSDAY" label="周四" />
          <lay-select-option value="FRIDAY" label="周五" />
          <lay-select-option value="SATURDAY" label="周六" />
        </lay-select>
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'DAILY_I'" label="时间" prop="dailyTime.startTime">
        <lay-date-picker v-model="timeRange" range type="time" :placeholder="['开始日期','结束日期']" @change="timeRangeChange" />
      </lay-form-item>


      <lay-form-item v-if="form.scheduleType === 'SIMPLE'" label="间隔单位" prop="simple.unit" :required="form.scheduleType === 'SIMPLE'">
        <lay-select v-model="form.simple.unit" placeholder="请选择" allow-clear style="width: 100%">
          <lay-select-option value="MILLISECONDS" label="毫秒" />
          <lay-select-option value="SECOND" label="秒" />
          <lay-select-option value="MINUTE" label="分钟" />
          <lay-select-option value="HOUR" label="小时" />
        </lay-select>
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'SIMPLE'" label="间隔时间" prop="simple.timeInterval" :required="form.scheduleType === 'SIMPLE'">
        <lay-input-number v-model="form.simple.timeInterval" :min="1" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'SIMPLE'" label="重复次数" prop="simple.repeatCount">
        <lay-input-number v-model="form.simple.repeatCount" placeholder="请填写" allow-clear />
      </lay-form-item>
      <lay-form-item v-if="form.scheduleType === 'SIMPLE'" label="是否重复执行" prop="simple.repeatForever">
        <lay-radio v-model="form.simple.repeatForever" name="repeatForever" :value="true" label="是" @change="form.simple.repeatCount = -1"></lay-radio>
        <lay-radio v-model="form.simple.repeatForever" name="repeatForever" :value="false" label="否"></lay-radio>
      </lay-form-item>

      <lay-field title="任务配置" />
      <lay-form-item label="任务执行类" prop="jobClassName" required>
        <lay-select v-model="form.jobClassName" placeholder="请选择" allow-clear style="width: 100%">
          <template v-for="jobClass in jobClassOptions" :key="jobClass.value">
            <lay-select-option :value="jobClass.value" :label="jobClass.label" />
          </template>
        </lay-select>
      </lay-form-item>
      <lay-form-item prop="jobParam">
        <template #label>
          任务参数
          <lay-tooltip content="重复的键其值将会覆盖">
            <lay-icon type="layui-icon-about" />
          </lay-tooltip>
        </template>
        <kv-table ref="kvTable" />
      </lay-form-item>
    </lay-form>
  </lay-layer>
</template>
