<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderUserMenus',
})

const greeting = getGreeting()

const usermenus = [
  { name: '个人资料', icon: 'ph:user', url: '' },
  { name: '退出登录', icon: 'ph:sign-out', url: '' },
]
</script>

<template>
  <a-dropdown position="br">
    <div class="layout-header__usermenus">
      {{ greeting }}, Administrator
      <CommonIcon name="ph:caret-down" />
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
