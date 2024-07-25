<script lang="ts" setup>
import LayoutHeaderLogo from './header-logo.vue'
import LayoutHeaderMenus from './header-menus.vue'
import LayoutHeaderLinks from './header-links.vue'
import LayoutHeaderUserMenus from './header-usermenus.vue'
import LayoutHeaderNotice from './header-notice.vue'

defineOptions({
  name: 'LayoutHeader',
})
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="layout-header__wrapper">
      <a-space>
        <!-- <div class="layout-header__collapse-btn">
          <CommonIcon name="mingcute:dot-grid" />
          <a-divider direction="vertical" class="layout-header__divider" />
        </div> -->
        <LayoutHeaderLogo />
        <LayoutHeaderMenus />
      </a-space>
      <a-space size="medium">
        <LayoutHeaderLinks />
        <a-divider direction="vertical" class="layout-header__divider" />
        <LayoutHeaderUserMenus />
        <LayoutHeaderNotice />
      </a-space>
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  user-select: none;
  color: var(--layout-header-text-color);
  height: var(--layout-header-height);
  z-index: var(--layout-header-zindex);

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--layout-header-height);
    background-color: var(--layout-header-bg-color);
    padding: 0 var(--page-padding);
  }

  &__collapse-btn {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: var(--layout-header-text-color);
    gap: 8px;
  }

  &__divider {
    border-color: var(--layout-header-border-color);
  }
}
</style>
