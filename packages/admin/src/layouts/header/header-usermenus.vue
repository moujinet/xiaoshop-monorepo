<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderUserMenus',
})

const greeting = getGreeting()

const usermenus = [
  { name: '个人资料', icon: 'mingcute:user-1', url: '' },
  { name: '退出登录', icon: 'mingcute:exit', url: '' },
]
</script>

<template>
  <a-dropdown position="br">
    <div class="layout-header__usermenus">
      {{ greeting }}, Administrator
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
