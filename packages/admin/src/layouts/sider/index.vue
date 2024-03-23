<script lang="ts" setup>
import LayoutSiderMain from './sider-main.vue'
import LayoutSiderSub from './sider-sub.vue'

defineOptions({
  name: 'LayoutSider',
})

withDefaults(defineProps<{
  visible: {
    main: boolean
    sidebar: boolean
  }
}>(), {
  visible: () => ({ main: true, sidebar: true }),
})
</script>

<template>
  <a-layout-sider
    class="layout-sider"
    :class="{
      'only-main': visible.main && !visible.sidebar,
      'only-sidebar': visible.sidebar && !visible.main,
    }"
    :style="{ width: 'var(--layout-sider-width)' }"
    hide-trigger
  >
    <LayoutSiderMain v-if="visible.main" />
    <LayoutSiderSub v-if="visible.sidebar" :has-main="visible.main" />
  </a-layout-sider>
</template>

<style lang="less" scoped>
.layout-sider {
  --layout-sider-width: calc(var(--layout-sider-main-width) + var(--layout-sider-sub-width));

  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: var(--layout-header-height);
  border-right: 1px solid var(--layout-sider-border-color);
  transition: var(--page-transition);
  z-index: var(--layout-sider-zindex);
  box-shadow: none;
  user-select: none;

  &.only-main {
    --layout-sider-width: var(--layout-sider-main-width);
  }

  &.only-sidebar {
    --layout-sider-width: var(--layout-sider-sub-width);
  }

  :deep(.arco-layout-sider-children) {
    overflow-x: hidden;
  }
}
</style>
