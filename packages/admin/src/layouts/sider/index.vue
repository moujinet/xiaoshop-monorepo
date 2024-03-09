<script lang="ts" setup>
import type { MenuValue } from 'tdesign-vue-next'
import SiderSubmenu from '../sider/sider-submenu.vue'

defineOptions({
  name: 'LayoutSider',
})

const { visible } = storeToRefs(useLayout())
const { getNestedMenu } = useContext()

const route = useRoute()
const activeModule = ref('')
const activeMenu = ref('')

const mainMenu = computed(() => getNestedMenu(route.meta.space || ''))
const subMenu = computed(() => mainMenu.value.find(m => m.module === activeModule.value)?.children || [])

const defaultExpandedKeys = computed<MenuValue[]>(() => subMenu.value.length ? [subMenu.value.map(m => m.id)[0]] : [])
const expandedKeys = ref<MenuValue[]>([])

watch(
  () => route.fullPath,
  () => {
    activeModule.value = route.meta.module || ''
    activeMenu.value = route.meta.id || ''
    expandedKeys.value = defaultExpandedKeys.value
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <TAside
    class="layout-sider"
    :class="{
      'no-sider': mainMenu.length <= 1 && !subMenu.length,
      'only-main': mainMenu.length > 1 && !subMenu.length,
      'only-sub': subMenu.length && mainMenu.length <= 1,
    }"
  >
    <div
      v-if="visible.mainMenu && mainMenu.length > 1"
      class="layout-sider-main"
    >
      <TTooltip
        v-for="menu in mainMenu"
        :key="menu.id"
        :content="menu.desc"
        placement="right"
      >
        <RouterLink
          class="layout-sider-main__menu"
          :class="{ 'is-active': activeModule === menu.id }"
          :to="menu.path"
        >
          <i class="layout-sider-main__menu--icon">
            <CommonIcon
              :name="menu.icon"
              :active="activeModule === menu.id"
            />
          </i>
          <span>{{ menu.name }}</span>
        </RouterLink>
      </TTooltip>
    </div>

    <div v-if="visible.subMenu && subMenu.length" class="layout-sider-sub">
      <TMenu
        v-model:expanded="expandedKeys"
        class="layout-sider-sub__menu"
        width="100%"
        :default-expanded="defaultExpandedKeys"
        :value="activeMenu"
      >
        <SiderSubmenu :menus="subMenu" />
      </TMenu>
    </div>
  </TAside>
</template>
