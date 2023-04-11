<script setup lang="ts">
import { dictColumns } from './columns'
import DictEditModel from './components/dict-edit.vue'
import DictItemTable from './components/dict-item-table.vue'
import type { PageParam, SysDict } from '~/types'

defineOptions({
  // 跟路由name保持一致
  name: 'system_dict',
})

const { loading, setLoading } = useLoading(true)
// 表格数据
const dataSource = ref<SysDict[]>([])
// 表格选中数据的key,即: dictId
const selectedKey = ref('')
// 表格工具栏配置
const defaultToolbar = ref<boolean | string[]>(false)
// 表格分页器配置
const page = ref({
  total: 0,
  limit: 10,
  current: 1,
  showSkip: false,
  showLimit: false,
  theme: primaryColor, // auto import hooks/ui.ts
})
// 是否显示"新增/编辑"弹窗
const showEdit = ref(false)
// 当前需要编辑的字典
const current = ref<SysDict>()
// 默认分页查询参数
const pageParam: PageParam<SysDict> = { page: 1, limit: 10, sort: 'id', order: 'desc' }

/**
 * 获取表格数据
 * @param param 自定义分页查询参数
 */
async function fetchTableData(param?: PageParam<SysDict>) {
  setLoading(true)
  try {
    // 分页查询
    const { success, data } = await pageDictApi({
      ...pageParam,
      ...param,
    })

    if (!success) return

    // 修改分页器的页码、数据总条数
    if (param && param.page) page.value.current = param.page
    page.value.total = Number(data!.count)
    // 表格数据赋值
    dataSource.value = data!.list as unknown as SysDict[]

    // 默认选中表格第一条数据
    if (!selectedKey.value) {
      nextTick(() => {
        selectedKey.value = dataSource.value[0].id!
      })
    }
  } catch (err) {
  } finally {
    setLoading(false)
  }
}
fetchTableData()

/** 表格行单击事件处理 */
function rowClick(row: SysDict) {
  selectedKey.value = row.id!
}

/** 分页事件 */
function changePage(data: any) {
  // 自定义分页查询参数
  const param = {
    ...pageParam,
    page: data.current,
    limit: data.limit,
  } as PageParam<SysDict>

  // 获取表格数据
  fetchTableData(param)
}

/**
 * 打开编辑弹窗
 * @param isUpdate 是否是编辑弹窗 默认false，即：打开新增弹窗
 */
function openEditModal(isUpdate = false) {
  if (isUpdate) {
    const key = selectedKey.value
    if (!key) {
      layer.msg('请选择要编辑的字典', { icon: 2 })
      return
    }

    // 查找当前需要编辑的字典
    current.value = dataSource.value.find(row => row.id === key)
  }
  showEdit.value = true
}

/** 处理单体删除 */
async function handleDelete() {
  // 参数校验
  const id = selectedKey.value
  if (!id) {
    layer.msg('请选择要删除的数据', { icon: 2 })
    return
  }

  useConfirm('确定要删除这条数据吗？', async (layerId: string) => {
    try {
      // 批量删除
      const { success, message } = await deleteDictApi(id)
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
    <lay-card>
      <lay-row>
        <lay-col :lg="6" :md="10" :sm="24" :xs="24">
          <lay-table
            id="id"
            v-model:selected-key="selectedKey"
            :loading="loading"
            :page="page"
            :columns="dictColumns"
            :data-source="dataSource"
            :default-toolbar="defaultToolbar"
            :height="450"
            @change="changePage"
            @row="rowClick"
          >
            <!-- 工具栏 -->
            <template #toolbar>
              <lay-button
                v-any-permission="['sys:role:add', 'sys:role:save']"
                size="sm"
                type="primary"
                @click="openEditModal()"
              >
                新增
              </lay-button>
              <lay-button
                v-any-permission="['sys:dict:edit', 'sys:dict:update']"
                size="sm"
                type="normal"
                @click="openEditModal(true)"
              >
                修改
              </lay-button>
              <lay-button
                v-permission="'sys:dict:delete'"
                size="sm"
                type="danger"
                @click="handleDelete"
              >
                删除
              </lay-button>
            </template>
          </lay-table>
        </lay-col>
        <lay-col :lg="18" :md="14" :sm="24" :xs="24">
          <DictItemTable :dict-id="selectedKey" style="padding-left: 8px;" />
        </lay-col>
      </lay-row>
    </lay-card>

    <!-- 编辑弹窗 -->
    <DictEditModel v-model:visible="showEdit" :data="current" @done="fetchTableData" />
  </lay-container>
</template>
