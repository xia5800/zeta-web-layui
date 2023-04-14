<script setup lang="ts">
import PasswordModal from './PasswordModal.vue'
import defaultAvatar from '~/assets/default-avatar.jpg'
import { LOGIN_ROUTE, USER_PROFILE_ROUTE } from '~/types'

const router = useRouter()
const userStore = useUserStore()
const avatar = computed(() => userStore.info?.avatar || defaultAvatar)
// 是否显示"修改密码"弹窗
const showModal = ref(false)

/**
 * 注销登录
 *
 * 说明：
 * 如果是修改密码，不需要调用注销登录接口，因为后端已经进行了注销登录操作。
 * @param request 是否要调用注销登录接口。
 */
async function logout(request = true) {
  if (request) {
    const { success, message } = await logoutApi()
    if (!success) {
      layer.msg(message || '操作失败', { icon: 2 })
      return
    }
  }

  layer.notifiy({
    title: '登出成功',
    content: '记得回来~',
    area: '300px',
    time: 1000,
  })
  userStore
    .logout()
    .then(() => router.push(LOGIN_ROUTE))
}
</script>

<template>
  <div>
    <lay-dropdown trigger="hover">
      <div class="avatar">
        <lay-avatar :src="avatar" radius />
        {{ userStore.info?.username }}
      </div>
      <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="router.push(USER_PROFILE_ROUTE)">
            <template #prefix>
              <lay-icon type="layui-icon-username" />
            </template>
            用户信息
          </lay-dropdown-menu-item>
          <lay-dropdown-menu-item @click="showModal = true">
            <template #prefix>
              <lay-icon type="layui-icon-hide" />
            </template>
            修改密码
          </lay-dropdown-menu-item>
          <lay-line margin="5px" theme="#EEE" />
          <lay-dropdown-menu-item @click="logout">
            <template #prefix>
              <lay-icon type="layui-icon-unlink" />
            </template>
            注销登录
          </lay-dropdown-menu-item>
        </lay-dropdown-menu>
      </template>
    </lay-dropdown>

    <!-- 修改密码弹窗 -->
    <PasswordModal v-model:visible="showModal" @done="logout(false)" />
  </div>
</template>
