<script setup lang="ts">
import { layer } from '@layui/layer-vue'
import { columns } from './columns'
import FileSearchForm from './components/file-search.vue'
import FileUploadModal from './components/file-upload.vue'
import type { PageParam, SysFile } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_file',
})

const { loading, setLoading } = useLoading(true)
const route = useRoute()
const cardTitle = (route.meta?.title || '') as string
const searchForm = ref()
// 表格数据
const dataSource = ref<SysFile[]>([])
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
// 是否显示"文件上传"弹窗
const showUpload = ref(false)
// 默认分页查询参数
const pageParam: PageParam<SysFile> = { page: 1, limit: 10, sort: 'id', order: 'desc' }

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysFile>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageFileApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysFile[]
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
  } as PageParam<SysFile>

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
  } as PageParam<SysFile>

  // 获取表格数据
  fetchTableData(param)
}

/** 表单搜索事件 */
function handleSearch(formModel: SysFile) {
  // 自定义分页查询参数
  const param = {
    ...{ model: formModel },
    ...pageParam,
    page: 1,
  } as PageParam<SysFile>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 打开上传弹窗
 */
function openUploadModal() {
  showUpload.value = true
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
      const { success, message } = await deleteFileApi(id)
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
</script>

<template>
  <lay-container fluid="true" class="z-container">
    <!-- 内容区域 -->
    <lay-card :title="cardTitle">
      <!-- 表格搜索栏 -->
      <FileSearchForm ref="searchForm" @on-search="handleSearch" />

      <!-- 数据表格 -->
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
        @sort-change="changeSort"
      >
        <!-- 工具栏 -->
        <template #toolbar>
          <lay-button
            v-any-permission="['sys:file:add', 'sys:user:save']"
            size="sm"
            type="primary"
            @click="openUploadModal"
          >
            上传
          </lay-button>
        </template>

        <!-- 操作列 -->
        <template #operator="{ row }">
          <lay-button
            v-permission="'sys:user:delete'"
            size="xs"
            type="danger"
            @click="handleDelete(row.id)"
          >
            删除
          </lay-button>
        </template>

        <!-- 文件大小列 -->
        <template #size="{ row }">
          {{ (row.size / 1024).toFixed(2) }}kb
        </template>
      </lay-table>
    </lay-card>

    <!-- 弹窗 -->
    <FileUploadModal v-model:visible="showUpload" @done="fetchTableData" />
  </lay-container>
</template>
