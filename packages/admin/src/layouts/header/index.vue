<script lang="ts" setup>
import HeaderMenus from './header-menus.vue'
import HeaderNotification from './header-notification.vue'
import HeaderUsermenus from './header-usermenus.vue'
import HeaderLinks from './header-links.vue'

defineOptions({
  name: 'LayoutHeader',
})
</script>

<template>
  <THeader class="layout-header">
    <div class="layout-header__logo">
      <CommonLogo />
    </div>

    <HeaderMenus />

    <div class="layout-header__user">
      <HeaderLinks />
      <TDivider layout="vertical" />
      <HeaderUsermenus />
      <HeaderNotification />
    </div>
  </THeader>
</template>
