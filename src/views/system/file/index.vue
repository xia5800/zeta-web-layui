<script setup lang="ts">
import { layer } from '@layui/layer-vue'
import type { PageParam } from '~/types/global'
import type { SysFile } from '~/types/system/file'
import { columns } from './columns'
import { bytesToMB } from '~/utils/convert'
import FileSearchForm from './components/file-search.vue'
import FileUploadModal from './components/file-upload.vue'

defineOptions({
  // 跟路由name保持一致
  name: 'system_file',
})

const { loading, setLoading } = useLoading(true)
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
  layout: ['count', 'prev', 'page', 'next', 'limits', 'refresh', 'skip'],
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

/** 处理批量删除 */
async function handleBatchDelete() {
  // 参数校验
  const ids = selectedKeys.value
  if (ids.length === 0) {
    layer.msg('请选择文件', { icon: 2 })
    return
  }

  useConfirm('确定要删除这些文件吗？', async (layerId: string) => {
    try {
      // 批量删除
      const { success, message } = await batchDeleteFileApi(ids)
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
    <!-- 表格搜索栏 -->
    <lay-card>
      <FileSearchForm ref="searchForm" @on-search="handleSearch" />
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
        :height="'100%'"
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
            <lay-icon class="layui-icon-upload-drag" />
            上传
          </lay-button>
          <lay-button
            v-permission="'sys:file:delete'"
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
            v-permission="'sys:user:delete'"
            size="xs"
            type="danger"
            @click="handleDelete(row.id)"
          >
            删除
          </lay-button>
        </template>

        <template #path="{ row }">
          <a
            :href="row.url ? row.url : 'javascript:void(0)'"
            style="color: #1677ff"
            target="_blank"
          >
            {{ row.path }}
          </a>
        </template>

        <!-- 文件大小列 -->
        <template #size="{ row }">
          {{ bytesToMB(row.size).toFixed(2) }}MB
        </template>
      </lay-table>
    </div>

    <!-- 弹窗 -->
    <FileUploadModal v-model:visible="showUpload" @done="fetchTableData" />
  </lay-container>
</template>
