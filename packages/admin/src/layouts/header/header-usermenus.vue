<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderUserMenus',
})

const router = useRouter()
const greeting = getGreeting()

const usermenus = [
  { name: '个人资料', icon: 'mingcute:user-1', url: '' },
  { name: '退出登录', icon: 'mingcute:exit', url: '#logout' },
]

const { profile, logout } = useSession()

function handleSelect(value: string) {
  if (value === '#logout') {
    logout().then(() => {
      useMessage({
        onClose: () => {
          router.push({ path: '/login' })
        },
      }).success('退出登录成功')
    })
  }
}
</script>

<template>
  <a-dropdown position="br" @select="handleSelect">
    <div class="layout-header__usermenus">
      {{ greeting }}, {{ profile?.name }}
      <CommonIcon name="mingcute:down" />
    </div>
    <template #content>
      <a-doption v-for="(item, index) in usermenus" :key="index" :value="item.url">
        <template #icon>
          <CommonIcon :name="item.icon" />
        </template>
        {{ item.name }}
      </a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped>
.layout-header__usermenus {
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
}
</style>
