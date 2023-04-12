<script setup lang="ts">
import { layer } from '@layui/layui-vue'
import type { Rules } from 'async-validator'
import { cloneDeep } from 'lodash-es'
import { filterMenu, toTreeData } from '../utils'
import type { SysMenu, SysMenuSaveParam, SysMenuUpdateParam } from '~/types'
import { BLANK_LAYOUT_NAME, FRAME_VIEW_NAME } from '~/types'

const {
  visible = false,
  pid,
  pPath = '',
  data,
} = defineProps<{
  visible: boolean
  /** 新增子级菜单时必传，父级菜单id */
  pid: string
  /** 新增子级菜单时必传，父级菜单path */
  pPath: string
  /** 修改时必传，菜单基本数据 */
  data?: SysMenu
}>()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'update:visible', visible: boolean): void
}>()

const show = computed({
  get() {
    return visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  },
})

const refForm = ref()
// 是否修改弹窗
const isUpdate = ref(false)
// 表单数据
const baseFormData = {
  id: undefined,
  parentId: '0',
  label: '',
  sortValue: 0,
  name: '',
  path: '',
  component: '',
  redirect: undefined,
  icon: '',
  type: 'MENU',
  hide: false,
  keepAlive: false,
  href: undefined,
  frameSrc: undefined,
} as SysMenu
const form = reactive<SysMenu>({ ...baseFormData })
// treeSelect默认选中的值
const parentId = ref<string>(pid)
// 父级菜单的路由路径
const parentPath = ref<string>(pPath)
// 表单校验规则
const rules = ref<Rules>({
  label: { type: 'string', required: true, message: '菜单名称不能为空' },
  type: { type: 'string', required: true, message: '菜单类型不能为空' },
})
// 菜单树数据
const menuTreeData = ref<any[]>([])
// 菜单api数据
const menuApiData = ref<SysMenu[]>([])
// 菜单打开方式。1：组件， 2：内链， 3：外链
const openType = ref<string>('1')

/** 获取菜单树数据 */
async function getMenuTreeData() {
  try {
    // 查询菜单树。排除掉按钮
    const { success, message, data } = await menuTreeApi()
    if (!success) {
      layer.msg(message || '获取菜单列表失败', { icon: 2 })
      return
    }
    menuApiData.value = data || []

    // 回显, 在返回结果外面再包裹一层父级
    menuTreeData.value = [{
      id: '0',
      title: '父级',
      field: '',
      children: toTreeData(data),
    }]
    // 如果不是新增子级菜单（即；新增、修改菜单），给treeSelect设置默认值
    if (!pid) {
      parentId.value = isUpdate.value ? form.parentId as string : '0'
    } else {
      parentId.value = pid
    }
  } catch (err) {
    layer.msg((err as Error).message, { icon: 2 })
  }
}

/** 处理树值改变事件 ps:因为这里是单选，所以值的类型是string */
function treeChangeHandler(value: string) {
  const menu = filterMenu(menuApiData.value, value)
  if (!menu) return

  parentPath.value = menu.path || ''
}

/** 初始化表单数据 */
function initData() {
  if (data) {
    isUpdate.value = true
    Object.assign(form, data)

    // 计算openType
    if (form.href) openType.value = '2'
    if (form.frameSrc) openType.value = '3'
  } else {
    isUpdate.value = false
    Object.assign(form, baseFormData)
    if (pPath) parentPath.value = pPath
  }
}

/** 关闭弹窗 */
function handleClose() {
  // 重置表单
  refForm.value.reset()
  // 清空表单校验
  refForm.value?.clearValidate()
  parentId.value = ''
  parentPath.value = ''
  // 关闭弹窗
  show.value = false
}

/** 处理待提交数据 */
function handlerSubmitData(model: SysMenu) {
  // 处理上级菜单id。
  if (!model.parentId) {
    model.parentId = '0'
  } else {
    model.parentId = parentId.value
  }

  // 处理组件路径、内链、外链地址
  switch (openType.value) {
    case '1': // 组件打开
      model.href = ''
      model.frameSrc = ''
      break
    case '2': // 内链打开
      model.component = FRAME_VIEW_NAME
      model.href = ''
      break
    case '3': // 外链打开
      model.component = ''
      model.frameSrc = ''
      break
  }

  // 处理菜单图标。 说明：如果是按钮，没有打开方式、图标、frameSrc、href
  if (model.type === 'RESOURCE') {
    model.icon = ''
  }
}

/** 保存数据 */
async function saveData(model: SysMenu, layerId: string) {
  try {
    // 计算path
    if (parentPath.value) model.path = parentPath.value + (model.path || '')

    // 新增菜单
    const { success, message } = await addMenuApi({
      ...cloneDeep(model) as SysMenuSaveParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭loading
    layer.close(layerId)
    // 关闭弹窗
    handleClose()
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 修改数据 */
async function updateData(model: SysMenu, layerId: string) {
  try {
    // 修改菜单数据
    const { success, message } = await updateMenuApi({
      ...cloneDeep(model) as SysMenuUpdateParam,
    })
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }

    layer.msg(message || '操作成功', { icon: 1 })
    // 关闭loading
    layer.close(layerId)
    // 关闭弹窗
    handleClose()
  } catch (e) {
    layer.close(layerId)
    layer.msg((e as Error).message, { icon: 2 })
  }
}

/** 表单提交 */
function handleSubmit() {
  refForm.value.validate((isValidate: boolean, model: SysMenu, _errors: any) => {
    if (!isValidate) return

    // 提交前，数据处理
    handlerSubmitData(model)

    layer.msg('正在提交数据...', { icon: 16 }, async (layerId: string) => {
      isUpdate.value
        ? await updateData(model, layerId)
        : await saveData(model, layerId)
      emit('done')
    })
  })
}

/** 菜单类型，单选按钮切换事件处理 */
function handleMenuTypeChange(current: string) {
  // 如果是按钮，没有打开方式、路由地址、组件路径、图标、frameSrc、href
  if (current === 'RESOURCE') {
    form.icon = ''
    form.frameSrc = ''
    form.href = ''
    form.path = ''
    // 打开方式重置为组件打开
    openType.value = '1'
    form.component = ''
  }
}

/** 打开方式，单选按钮切换事件处理 */
function handleOpenTypeChange(current: string) {
  // 如果选中的是内链打开
  if (current === '2') {
    form.component = FRAME_VIEW_NAME
    return
  }

  if (current === '3') {
    form.component = BLANK_LAYOUT_NAME
    return
  }

  // 如果是组件打开
  form.component = ''
}

watch(
  () => visible,
  (visible: boolean) => {
    if (visible) {
      // 初始化弹窗数据
      initData()
      // 获取菜单树数据
      getMenuTreeData()
    }
  },
)
</script>

<template>
  <lay-layer
    v-model="show"
    area="900px"
    :title="isUpdate ? '编辑' : '新增'"
    :shade-close="false"
    :move="true"
    :maxmin="true"
    :btn="[
      { text: '提交', callback: () => handleSubmit() },
      { text: '关闭', callback: () => handleClose() },
    ]"
    @close="handleClose"
  >
    <lay-form ref="refForm" :model="form" :rules="rules" style="padding: 10px">
      <lay-row>
        <!-- 左 -->
        <lay-col :md="12">
          <lay-form-item label="上级菜单" prop="parentId" required>
            <!-- 修改或添加下级菜单时，不可编辑 -->
            <lay-tree-select
              v-model="parentId"
              :data="menuTreeData"
              :disabled="isUpdate || pid !== '0'"
              style="width: 100%;"
              @change="(value) => treeChangeHandler(value as string)"
            />
          </lay-form-item>
          <lay-form-item label="菜单名称" prop="label" required>
            <lay-input v-model="form.label" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item prop="name">
            <template #label>
              路由名称
              <lay-tooltip content="Vue Router的路由标识，需要唯一值。建议用英文命名">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>
            <lay-input
              v-model="form.name"
              placeholder="请填写"
              :disabled="form.type === 'RESOURCE'"
              allow-clear
            />
          </lay-form-item>
          <lay-form-item prop="path">
            <template #label>
              路由地址
              <!-- 如果是子级路由，需要拼接父级路由 -->
              <lay-tooltip
                :content="parentId
                  ? '如果是子级路由，需要拼接父级路由'
                  : '如果菜单类型是按钮，路由地址可以不用填写'
                "
              >
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>

            <lay-input
              v-model="form.path"
              placeholder="请填写"
              :disabled="form.type === 'RESOURCE'"
              allow-clear
            >
              <template v-if="parentPath" #prepend>
                {{ parentPath }}
              </template>
            </lay-input>
          </lay-form-item>
          <lay-form-item prop="component">
            <template #label>
              组件路径
              <lay-tooltip content="如果新增的菜单是层级菜单，组件路径可以不用填写">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>

            <lay-input
              v-model="form.component"
              placeholder="请填写"
              :disabled="form.type === 'RESOURCE' || openType === '2' || openType === '3'"
              allow-clear
            />
          </lay-form-item>
          <lay-form-item prop="redirect">
            <template #label>
              重定向地址
              <lay-tooltip content="影响面包屑点击之后，跳转到哪个路由地址">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>

            <lay-input
              v-model="form.redirect"
              placeholder="请填写"
              :disabled="form.type === 'RESOURCE' || openType === '2' || openType === '3'"
              allow-clear
            />
          </lay-form-item>
          <lay-form-item label="权限标识" prop="authority">
            <template #label>
              权限标识
              <lay-tooltip content="菜单类型为'菜单'时,权限标识不需要填写">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>

            <lay-input
              v-model="form.authority"
              placeholder="请填写"
              :disabled="form.type === 'MENU'"
              allow-clear
            />
          </lay-form-item>
        </lay-col>
        <!-- 右 -->
        <lay-col :md="12">
          <lay-form-item label="菜单类型" prop="type" required>
            <lay-radio-group
              v-model="form.type"
              name="type"
              :disabled="isUpdate"
              @change="(current) => handleMenuTypeChange(current as string)"
            >
              <lay-radio value="MENU" label="菜单" />
              <lay-radio value="RESOURCE" label="按钮" />
            </lay-radio-group>
          </lay-form-item>
          <lay-form-item label="打开方式" prop="openType">
            <!-- 影响到 外链,内链输入框的显示与隐藏 -->
            <lay-radio-group
              v-model="openType"
              name="type"
              :disabled="form.type === 'RESOURCE'"
              @change="(current) => handleOpenTypeChange(current as string)"
            >
              <lay-radio value="1" label="组件" />
              <lay-radio value="2" label="内链" />
              <lay-radio value="3" label="外链" />
            </lay-radio-group>
          </lay-form-item>
          <lay-form-item v-if="openType === '2'" label="内链地址" prop="frameSrc">
            <lay-input v-model="form.frameSrc" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item v-if="openType === '3'" label="外链地址" prop="href">
            <lay-input v-model="form.href" placeholder="请填写" allow-clear />
          </lay-form-item>
          <lay-form-item label="菜单图标" prop="icon">
            <lay-icon-picker v-model="form.icon" :disabled="form.type === 'RESOURCE'" allow-clear />
          </lay-form-item>
          <lay-form-item label="排序" prop="sortValue">
            <lay-input-number v-model="form.sortValue" position="right" :min="0" />
          </lay-form-item>
          <lay-form-item prop="hide" class="switch-fix">
            <template #label>
              是否隐藏
              <lay-tooltip content="如果隐藏，则不会出现在左侧菜单栏">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>
            <lay-switch
              v-model="form.hide"
              :onswitch-value="true"
              onswitch-text="是"
              :unswitch-value="false"
              unswitch-text="否"
            />
          </lay-form-item>
          <lay-form-item prop="keepAlive" class="switch-fix">
            <template #label>
              keepAlive
              <lay-tooltip content="页面缓存，需要搭配路由name使用">
                <lay-icon type="layui-icon-about" />
              </lay-tooltip>
            </template>
            <lay-switch
              v-model="form.keepAlive"
              :onswitch-value="true"
              onswitch-text="是"
              :unswitch-value="false"
              unswitch-text="否"
            />
          </lay-form-item>
        </lay-col>
      </lay-row>
    </lay-form>
  </lay-layer>
</template>

<style scoped>
:deep(.switch-fix .layui-input-block) {
  display: flex;
  align-items: center;
}
</style>
