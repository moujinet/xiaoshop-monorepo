<script lang="ts" setup>
defineOptions({
  name: 'CommonCard',
  inheritAttrs: false,
})

withDefaults(defineProps<{
  title?: string
  bordered?: boolean
  loading?: boolean
  hoverable?: boolean
}>(), {
  bordered: false,
})
</script>

<template>
  <a-card
    class="common-card"
    :class="{
      'no-border': !bordered,
    }"
    :bordered="bordered"
    :hoverable="hoverable"
  >
    <template v-if="title || $slots.title" #title>
      <CommonGroupTitle>
        <slot name="title">
          {{ title }}
        </slot>
      </CommonGroupTitle>
    </template>

    <template v-if="$slots.actions" #extra>
      <slot name="actions" />
    </template>

    <template v-if="$slots.extra" #cover>
      <slot name="extra" />
    </template>

    <a-spin :loading="loading" class="w-full">
      <slot />
    </a-spin>
  </a-card>
</template>

<style lang="less" scoped>
.common-card {
  border-radius: 3px;

  &.no-border {
    :deep(.arco-card-header) {
      border: none;
      padding-bottom: 0;
    }
  }
}
</style>
