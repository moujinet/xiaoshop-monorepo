<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderLinks',
})
</script>

<template>
  <a-space size="medium">
    <div class="layout-header__link">
      <CommonIcon class="layout-header__link--icon" name="ph:qr-code" />
      访问店铺
    </div>

    <div class="layout-header__link">
      <CommonIcon class="layout-header__link--icon" name="ph:question" />
      使用帮助
    </div>
  </a-space>
</template>

<style lang="less" scoped>
.layout-header__link {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--layout-header-text-color);
  text-decoration: none;
  column-gap: 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  &--icon {
    font-size: 16px;
    color: var(--secondary-color-light);
  }

  &:hover {
    color: var(--layout-header-text-color-active);

    .layout-header__link--icon {
      color: var(--layout-header-text-color-active);
    }
  }
}
</style>
