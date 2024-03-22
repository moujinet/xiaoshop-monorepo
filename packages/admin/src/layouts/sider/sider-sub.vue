<script lang="ts" setup>
defineOptions({
  name: 'LayoutSiderSub',
})

withDefaults(defineProps<{
  hasMain?: boolean
}>(), {
  hasMain: true,
})

const route = useRoute()
const router = useRouter()
const { getModuleMenus } = useApp()
const menus = getModuleMenus(route.meta.module || '')
const selectedKeys = ref<string[]>([])

function onMenuItemClick(path: string) {
  router.push(path)
}

watch(
  () => route.fullPath,
  () => {
    selectedKeys.value = [route.fullPath]
  },
  { immediate: true },
)
</script>

<template>
  <div class="layout-sider-sub" :class="{ 'has-main': hasMain }">
    <a-menu
      v-model:selected-keys="selectedKeys"
      auto-open
      @menu-item-click="onMenuItemClick"
    >
      <template v-for="menu in menus">
        <template v-if="menu.isShow">
          <template v-if="menu.type === 'page' || menu.type === 'index'">
            <a-menu-item :key="menu.path">
              <template v-if="menu.icon" #icon>
                <CommonIcon :name="menu.icon" />
              </template>
              {{ menu.name }}
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="menu.id" :title="menu.name">
              <template v-if="menu.icon" #icon>
                <CommonIcon :name="menu.icon" />
              </template>
              <a-menu-item v-for="child in menu.children" :key="child.path">
                <template v-if="child.icon" #icon>
                  <CommonIcon :name="child.icon" />
                </template>
                {{ child.name }}
              </a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.layout-sider-sub {
  width: var(--layout-sider-sub-width);
  min-height: 100%;
  background-color: var(--layout-sider-sub-bg-color);

  .common-icon {
    font-size: 18px;
  }

  &.has-main {
    margin-left: var(--layout-sider-main-width);
  }
}
</style>
