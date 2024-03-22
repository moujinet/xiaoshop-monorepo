<script lang="ts" setup>
import type { IModule } from '~/types'

defineOptions({
  name: 'LayoutSiderMain',
})

const route = useRoute()
const { getSpaceModules } = useApp()

const modules: Ref<IModule[]> = ref([])

watch(
  () => route.fullPath,
  () => {
    modules.value = getSpaceModules(route.meta.space || '').value
  },
  { immediate: true },
)
</script>

<template>
  <div class="layout-sider-main">
    <div class="layout-sider-main-wrapper">
      <div class="layout-sider-main__menu">
        <a-tooltip v-for="mod in modules" :key="mod.id" :content="mod.desc" position="right" mini>
          <router-link
            class="layout-sider-main__menu-item"
            :class="{ 'is-active': mod.id === $route.meta.module }"
            :to="mod.path"
          >
            <CommonIcon
              class="layout-sider-main__menu-item--icon"
              :name="mod.icon"
              :active="mod.id === $route.meta.module"
            />
            <span>{{ mod.name }}</span>
          </router-link>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-sider-main {
  position: fixed;
  height: 100%;
  width: var(--layout-sider-main-width);
  background-color: var(--layout-sider-main-bg-color);
  border-right: 1px solid var(--layout-sider-border-color);

  &-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border: 1px solid transparent;
      background-clip: padding-box;
      border-radius: 3px;
      background-color: var(--color-text-4);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }

  &__menu {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    transition: var(--page-transition);
    padding: var(--page-padding-sm) 0;

    &-item {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: var(--layout-sider-main-text-color);
      height: calc(var(--layout-sider-main-width) * 0.8);

      span {
        font-size: 12px;
      }

      &--icon {
        font-size: 24px;
      }

      &:hover {
        color: var(--layout-sider-main-text-color-hover);
      }

      &.is-active,
      &:active {
        color: var(--layout-sider-main-text-color-active);
      }
    }
  }
}
</style>
