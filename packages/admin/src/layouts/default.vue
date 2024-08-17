<script lang="ts" setup>
import 'video.js/dist/video-js.css'

import LayoutHeader from './header/index.vue'
import LayoutSider from './sider/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'

defineOptions({
  name: 'DefaultLayout',
})

const { visible } = storeToRefs(useTheme())
</script>

<template>
  <a-layout class="layout">
    <LayoutHeader />
    <a-layout>
      <a-layout>
        <LayoutSider v-if="visible.main || visible.sidebar" :visible="visible" />
        <a-layout
          class="layout-content"
          :class="{
            'no-sider': !visible.main && !visible.sidebar,
            'only-main': visible.main && !visible.sidebar,
            'only-sidebar': visible.sidebar && !visible.main,
          }"
        >
          <a-layout-content>
            <LayoutContent />
          </a-layout-content>
          <LayoutFooter v-if="visible.footer" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;

  &-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--layout-content-bg-color);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    padding: var(--layout-header-height) 0 0 calc(var(--layout-sider-main-width) + var(--layout-sider-sub-width));

    &.no-sider {
      padding: var(--layout-header-height) 0 0 0;
    }

    &.only-main {
      padding: var(--layout-header-height) 0 0 var(--layout-sider-main-width);
    }

    &.only-sidebar {
      padding: var(--layout-header-height) 0 0 var(--layout-sider-sub-width);
    }
  }
}
</style>
