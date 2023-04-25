<script setup lang="ts">
import { dictItemColumns } from '../columns'
import DictItemEdit from './dict-item-edit.vue'
import type { PageParam, SysDictItem } from '~/types'

const {
  dictId,
} = defineProps<{
  /** 字典id */
  dictId?: string
}>()

defineOptions({
  name: 'SysDictItem',
})

// 表格数据
const dataSource = ref<SysDictItem[]>([])
// 表格选中数据的key
const selectedKeys = ref([])
// 表格工具栏配置
const defaultToolbar = ref<boolean | string[]>(false)
// 表格分页器配置
const page = ref({
  total: 0,
  limit: 10,
  current: 1,
  showSkip: false,
  showLimit: false,
})
// 是否显示"新增/编辑"弹窗
const showEdit = ref(false)
// 当前需要编辑的字典
const current = ref<SysDictItem>()
// 默认分页查询参数
const pageParam: PageParam<SysDictItem> = { page: 1, limit: 10, sort: 'sortValue', order: 'desc' }
// 表格搜索参数
const searchForm = reactive({
  name: '',
  dictId,
})

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysDictItem>) {
  // 如果没有字典id，则不获取表格数据
  if (!dictId) return

  try {
    // 分页查询
    const { success, data } = await pageDictItemApi({
      ...pageParam,
      ...param,
      model: { dictId: dictId! } as SysDictItem,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysDictItem[]
  } catch (err) {
  }
}

/** 分页事件 */
function changePage(data: any) {
  // 自定义分页查询参数
  const param = {
    ...{ model: searchForm },
    ...pageParam,
    page: data.current,
    limit: data.limit,
  } as PageParam<SysDictItem>

  // 获取表格数据
  fetchTableData(param)
}

/** 排序事件 */
function changeSort(columnName: string, order: string) {
  // 自定义分页查询参数
  const param = {
    ...{ model: searchForm },
    ...{ page: page.value.current, limit: page.value.limit },
    sort: columnName,
    order,
  } as PageParam<SysDictItem>

  // 获取表格数据
  fetchTableData(param)
}

/** 表格搜索事件处理 */
function handleSearch() {
  // 判断是否有字典id
  if (!dictId) {
    layer.msg('请先选择字典', { icon: 2 })
    return
  }

  // 查询条件携带字典id
  searchForm.dictId = dictId

  // 自定义分页查询参数
  const param = {
    ...{ model: searchForm },
    ...pageParam,
    page: 1,
  } as PageParam<SysDictItem>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 打开编辑弹窗
 * @param row
 */
function openEditModal(row?: SysDictItem) {
  // 判断是否有字典id
  if (!dictId) {
    layer.msg('请先选择字典', { icon: 2 })
    return
  }

  current.value = row
  showEdit.value = true
}

/** 处理单体删除 */
function handleDelete(id: string) {
  if (!id) {
    layer.msg('请选择字典项', { icon: 2 })
    return
  }

  useConfirm('确定要删除这条数据吗？', async (layerId: string) => {
    try {
      // 单体删除
      const { success, message } = await deleteDictItemApi(id)
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
    layer.msg('请选择字典项', { icon: 2 })
    return
  }

  useConfirm('确定要删除这些数据吗？', async (layerId: string) => {
    try {
      // 批量删除
      const { success, message } = await batchDeleteDictItemApi(ids)
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

// 监听字典id的值
watch(
  () => dictId,
  () => {
    // 发生变化才获取表格数据
    fetchTableData()
  },
)
</script>

<template>
  <div>
    <lay-table
      id="id"
      v-model:selected-keys="selectedKeys"
      :page="page"
      :columns="dictItemColumns"
      :data-source="dataSource"
      :default-toolbar="defaultToolbar"
      :height="450"
      @change="changePage"
      @sort-change="changeSort"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <div class="search-input">
          <lay-input v-model="searchForm.name" size="xs" placeholder="输入关键字搜索" allow-clear />
        </div>
        <lay-button
          size="sm"
          type="primary"
          @click="handleSearch"
        >
          查询
        </lay-button>

        <lay-button
          v-any-permission="['sys:dictItem:add', 'sys:dictItem:save']"
          size="sm"
          type="primary"
          @click="openEditModal()"
        >
          新增
        </lay-button>
        <lay-button
          v-permission="'sys:dictItem:delete'"
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
          v-any-permission="['sys:dictItem:edit', 'sys:dictItem:update']"
          size="xs"
          type="primary"
          @click="openEditModal(row)"
        >
          修改
        </lay-button>
        <lay-button
          v-permission="'sys:dictItem:delete'"
          size="xs"
          type="danger"
          @click="handleDelete(row.id)"
        >
          删除
        </lay-button>
      </template>
    </lay-table>

    <DictItemEdit v-model:visible="showEdit" :dict-id="dictId" :data="current" @done="fetchTableData" />
  </div>
</template>

<style lang="less" scoped>
.search-input {
  width: 220px;
  float: left;
  margin-right: 8px;

  :deep(.layui-input-block) {
    margin-left: 0!important;
  }

  :deep(.layui-input-append) {
    padding: 0;
  }

  :deep(.layui-input-wrapper) {
    background-color: white;
  }

  .layui-input[size=xs] {
    height: 32px;
  }
}
</style>
