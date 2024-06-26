<script setup lang="ts">
import { dictItemColumns } from '../columns'
import type { PageParam } from '~/types/global'
import type { SysDictItem } from '~/types/system/dictItem'
import DictItemEdit from './dict-item-edit.vue'

defineOptions({
  name: 'SysDictItem',
})

const props = defineProps<{
  /** 字典id */
  dictId?: string
}>()

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
  layout: ['count', 'prev', 'page', 'next'],
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
  dictId: props.dictId,
})

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysDictItem>) {
  // 如果没有字典id，则不获取表格数据
  if (!props.dictId) return

  try {
    // 分页查询
    const { success, data } = await pageDictItemApi({
      ...pageParam,
      ...param,
      model: { dictId: props.dictId! } as SysDictItem,
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
  if (!props.dictId) {
    layer.msg('请先选择字典', { icon: 2 })
    return
  }

  // 查询条件携带字典id
  searchForm.dictId = props.dictId

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
  if (!props.dictId) {
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
  () => props.dictId,
  () => {
    // 发生变化才获取表格数据
    fetchTableData()
  },
)
</script>

<template>
  <div class="z-table-box">
    <lay-table
      id="id"
      v-model:selected-keys="selectedKeys"
      :page="page"
      :columns="dictItemColumns"
      :data-source="dataSource"
      :default-toolbar="defaultToolbar"
      :resize="true"
      :height="'100%'"
      @change="changePage"
      @sort-change="changeSort"
    >
      <!-- 工具栏 -->
      <template #toolbar>
        <lay-input v-model="searchForm.name" size="sm" placeholder="输入关键字搜索" allow-clear style="width: 200px; margin-right: 10px; background: #fff" />
        <lay-button
          size="sm"
          @click="handleSearch"
        >
          <lay-icon class="layui-icon-search" />
          查询
        </lay-button>

        <lay-button
          v-any-permission="['sys:dictItem:add', 'sys:dictItem:save']"
          size="sm"
          type="primary"
          @click="openEditModal()"
        >
          <lay-icon class="layui-icon-addition" />
          新增
        </lay-button>
        <lay-button
          v-permission="'sys:dictItem:delete'"
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
          v-any-permission="['sys:dictItem:edit', 'sys:dictItem:update']"
          size="xs"
          type="primary"
          @click="openEditModal(row)"
        >
          编辑
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
