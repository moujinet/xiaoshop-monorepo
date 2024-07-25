<script lang="ts" setup>
defineOptions({
  name: 'CommonPanel',
})

const props = defineProps<{
  height?: string | 'auto'
  collapsed?: boolean
}>()

const { visible } = useTheme()

const computedHeight = computed(() => {
  return props.height === 'auto'
    ? `calc(100vh - var(--layout-header-height)${visible.footer ? ' - var(--layout-footer-height)' : ''}${visible.container ? ' - var(--page-padding) - 86px' : ' - 3px'} )`
    : props.height || 'auto'
})
</script>

<template>
  <div
    class="common-panel"
    :class="{
      'is-auto': props.height === 'auto',
      'is-collapsed': props.collapsed,
    }"
    :style="{ height: computedHeight }"
  >
    <slot />
  </div>
</template>

<style lang="less" scoped>
.common-panel {
  padding: 16px;
  border-radius: 3px;
  background-color: var(--color-bg-3);

  &.is-collapsed {
    padding: 0;
  }

  &.is-auto {
    overflow: hidden;
  }
}
</style>
