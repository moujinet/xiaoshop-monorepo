<script lang="ts" setup>
defineOptions({
  name: 'CommonPanel',
})

const props = defineProps<{
  height?: string | 'auto'
}>()

const { visible } = useTheme()

const computedHeight = computed(() => {
  return props.height === 'auto'
    ? `calc(100vh - var(--layout-header-height)${visible.footer ? ' - var(--layout-footer-height)' : ''}${visible.container ? ' - var(--page-padding) - 86px' : ' - 3px'} - 32px)`
    : props.height || 'auto'
})
</script>

<template>
  <div class="common-panel">
    <a-scrollbar :style="{ height: computedHeight, overflow: 'auto' }">
      <slot />
    </a-scrollbar>
  </div>
</template>

<style lang="less" scoped>
.common-panel {
  padding: 16px;
  border-radius: 3px;
  background-color: var(--color-bg-3);
}
</style>
