<script setup lang="ts">
// 自定义类型
interface Kv {
  id: number
  key: string
  value?: string | number
  valueType: string
}

// 表格字段
const columns = [
  {
    title: '键',
    key: 'key',
    width: '40%',
    fixed: 'left',
    customSlot: 'key',
  },
  {
    title: '值',
    key: 'value',
    width: '40%',
    customSlot: 'value',
  },
  {
    key: 'operator',
    title: '操作',
    align: 'center',
    width: '20%',
    customSlot: 'operator',
    fixed: 'right',
  },
]

withDefaults(defineProps<{
  /** 表格高度 */
  height?: string | number,
  /** 新增按钮的文字 */
  addBtnName?: string,
}>(), {
  height: '200px',
  addBtnName: '添加参数',
})

// 组件暴露的属性和方法
defineExpose({
  getTableData,
  setTableData
})

// 表格数据
const dataSource = ref<Kv[]>([])

/** 获取数据. 父组件调用 */
function getTableData(): string {
  if (dataSource.value.length === 0) return ""
  let result = {}

  // 把 [{"key: "age", value: "123"}, {"key": "name", value: "tom"}]
  // 转换成 {"age": "123", "name": "tom"}
  dataSource.value
    .filter((item: Kv) => item.key != '')
    .forEach((item: Kv) => {
      result = {
        ...result,
        ...{[item.key] : item.value }
      }
    })
  return JSON.stringify(result)
}

/** 设置数据. 父组件调用 */
function setTableData(data: string) {
  // {"age": "123", "name": "tom"}
  let parse = JSON.parse(data) as any

  // 把 {"age": "123", "name": "tom"}
  // 转换为[
  //   {"id": 1, "key": "age", "value": "123", "valueType": "string"}
  //   {"id": 2, "key": "name", "value": "tom", "valueType": "string"}
  // ]
  let tableData: Kv[] = new Array<Kv>()
  Object.entries(parse).forEach(([key, value], index:number) => {
    let valueType = typeof value === 'number' ? 'number' : 'string'
    tableData.push({
      id: index + 1,
      key,
      value,
      valueType
    } as Kv)
  })

  // 表格赋值
  dataSource.value = tableData
}


/** 处理添加 */
function handleAdd() {
  dataSource.value.push({
    id: dataSource.value.length + 1,
    key: '',
    value: '',
    valueType: 'string',
  })
}

/** 处理删除 */
function handleDelete(row: Kv) {
  dataSource.value = dataSource.value.filter((item) => item.id!== row.id)
}

/** 修改值类型 */
function changeValueType(row: Kv) {
  if (row.valueType === 'number') {
    row.valueType = 'string'
    row.value = ''
  } else {
    row.valueType = 'number'
    row.value = 0
  }
}

onMounted(() => {
  // 添加一条空白数据
  handleAdd()
})
</script>

<template>
  <div>
    <lay-table :columns="columns" :data-source="dataSource" :height="height" >
      <!-- key列 -->
      <template #key="{ row }">
        <lay-input
          :model-value="row.key"
          placeholder="请填写key"
          @change="(value: string) => row.key = value"
        />
      </template>

      <!-- value列 -->
      <template #value="{ row }">
        <lay-input
          v-if="row.valueType === 'string'"
          :model-value="row.value"
          placeholder="请填写value"
          @change="(value: string) => row.value = value"
        />
        <lay-input-number
          v-if="row.valueType === 'number'"
          position="right"
          style="width: 100%;"
          :model-value="row.value"
          @change="(value: number) => row.value = value"
        />
      </template>

      <!-- 操作列 -->
      <template #operator="{ row }">
        <lay-button type="primary" size="xs" @click="changeValueType(row)">
          {{ row.valueType === 'string'? 'num' : 'str' }}
        </lay-button>
        <lay-button type="danger" size="xs" @click="handleDelete(row)">
          删除
        </lay-button>
      </template>
    </lay-table>

    <!-- 新增按钮 -->
    <lay-button
      border="green"
      border-style="dashed"
      :fluid="true"
      @click="handleAdd"
      style="margin-top: 10px"
    >
      {{ addBtnName }}
    </lay-button>
  </div>
</template>

<style scoped>
/** 让数字输入框文字偏左 */
:deep(.layui-input-number .layui-input-number-input .layui-input .layui-input-wrapper input[type='number']) {
  text-align: left;
  padding-left: 10px;
}
</style>
