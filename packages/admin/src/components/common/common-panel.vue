<script lang="ts" setup>
defineOptions({
  name: 'CommonPanel',
})

const props = defineProps<{
  height?: string
  loading?: boolean
}>()

const { visible } = useTheme()

const computedHeight = computed(() => {
  return props.height
    || `calc(100vh - var(--layout-header-height)${visible.footer ? ' - var(--layout-footer-height)' : ''}${visible.container ? ' - var(--page-padding) - 86px' : ' - 3px'} - 32px)`
})
</script>

<template>
  <div class="common-panel">
    <a-spin :loading="loading" class="w-full">
      <a-scrollbar :style="{ height: computedHeight, overflow: 'auto' }">
        <slot />
      </a-scrollbar>
    </a-spin>
  </div>
</template>

<style lang="less" scoped>
.common-panel {
  padding: 16px;
  border-radius: 3px;
  background-color: var(--color-bg-3);
}
</style>
