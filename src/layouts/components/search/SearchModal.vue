<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import SearchResult from './SearchResult.vue'
import type { OptionsItem } from './interfaces'
import type { UserMenu } from '~/types'

const {
  value = false,
} = defineProps<{
  /** 弹窗显隐 */
  value: boolean
}>()
const emit = defineEmits(['update:value'])

const router = useRouter()
const keyword = ref('')
const activePath = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const resultOptions = shallowRef([] as UserMenu[])

/** 菜单树形结构 */
const menusData = computed(() => (cloneDeep(useUserStore().menus)))

/** 弹窗显示隐藏 */
const show = computed({
  get() {
    return value
  },
  set(val: boolean) {
    emit('update:value', val)
  },
})
watch(show, async (val) => {
  if (val) {
    /** 自动聚焦 */
    await nextTick()
    inputRef.value?.focus()
  }
})

/** 关闭弹窗 */
function handleClose() {
  show.value = false
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = []
    keyword.value = ''
  }, 200)
}

/** 将菜单树形结构扁平化为一维数组，用于菜单查询 */
function flatTree(arr: UserMenu[]) {
  const res: any[] = []
  const deep = (arr: UserMenu[]) => {
    arr.forEach((item: UserMenu) => {
      res.push(item)
      item.children && deep(item.children)
    })
  }
  deep(arr)
  return res
}

/** 菜单搜索 */
function search() {
  const flatMenusData = flatTree(menusData.value)
  resultOptions.value = flatMenusData.filter(
    menu =>
      keyword.value
      && menu.meta?.title
        .toLocaleLowerCase()
        .includes(keyword.value.toLocaleLowerCase().trim()),
  )
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path || ''
  } else {
    activePath.value = ''
  }
}
/** 搜索防抖处理 */
const handleSearch = useDebounceFn(search, 300)

/** key up */
function handleUp() {
  inputRef.value?.blur()
  const { length } = resultOptions.value
  if (length === 0) return
  const index = resultOptions.value.findIndex(
    item => item.path === activePath.value,
  )
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].path || ''
  } else {
    activePath.value = resultOptions.value[index - 1].path || ''
  }
}

/** key down */
function handleDown() {
  inputRef.value?.blur()
  const { length } = resultOptions.value
  if (length === 0) return
  const index = resultOptions.value.findIndex(
    item => item.path === activePath.value,
  )
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].path || ''
  } else {
    activePath.value = resultOptions.value[index + 1].path || ''
  }
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value
  if (length === 0 || activePath.value === '') return
  router.push(activePath.value)
  handleClose()
}

onKeyStroke('Enter', handleEnter)
onKeyStroke('ArrowUp', handleUp)
onKeyStroke('ArrowDown', handleDown)
</script>

<template>
  <div>
    <!-- 设置teleport-disable，解决无法修改layui-layer样式问题 -->
    <lay-layer
      v-model="show"
      :title="false"
      :close-btn="false"
      :teleport-disabled="true"
      offset="80px"
      :area="['600px']"
      shade
      shade-close
      @close="handleClose"
    >
      <lay-input
        ref="inputRef"
        v-model="keyword"
        prefix-icon="layui-icon-search"
        @input="handleSearch"
      />

      <div class="search-result-container">
        <lay-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
        <lay-scroll v-else class="menu-scroll">
          <SearchResult
            v-model:value="activePath"
            :options="resultOptions as OptionsItem[]"
            @click="handleEnter"
          />
        </lay-scroll>
      </div>
    </lay-layer>
  </div>
</template>

<style scoped>
:deep(.layui-layer) {
  border-radius: 4px;
  padding: 24px 32px 32px!important;
}

:deep(.menu-scroll .layui-scroll-y .layui-scroll-track) {
  display: none;
}

.layui-input  {
  margin-top: 10px;
}
.search-result-container {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
