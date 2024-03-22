<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderMenus',
})

const { spaces } = useApp()
</script>

<template>
  <a-space>
    <a-tooltip v-for="space in spaces" :key="space.id" :content="space.desc" mini>
      <router-link
        class="layout-header__menu"
        :class="{ 'is-active': space.id === $route.meta.space }"
        :to="space.path || ''"
      >
        <CommonIcon
          class="layout-header__menu--icon"
          :name="space.icon"
          :active="space.id === $route.meta.space"
        />
        <span>{{ space.name }}</span>
      </router-link>
    </a-tooltip>
  </a-space>
</template>

<style lang="less" scoped>
.layout-header__menu {
  display: flex;
  align-items: center;
  font-size: 14px;
  text-decoration: none;
  padding: 0 16px;
  transition: all 0.3s ease;
  height: var(--layout-header-height);
  color: var(--layout-header-text-color);

  &.is-active {
    font-weight: 500;
    color: var(--layout-header-text-color-active);
    background-image: linear-gradient(to top, var(--primary-color) 15%, var(--primary-color-dark) 85%, var(--primary-color-darker) 100%);
  }

  &:hover {
    color: var(--layout-header-text-color-active);
  }

  &--icon {
    font-size: 18px;
    margin-right: 6px;
  }
}
</style>
