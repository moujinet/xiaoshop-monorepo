<script lang="ts" setup>
defineOptions({
  name: 'CommonCard',
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
    :loading="loading"
    :hoverable="hoverable"
  >
    <template v-if="title || $slots.title" #title>
      <CommonGroupTitle>
        <slot name="title">
          {{ title }}
        </slot>
      </CommonGroupTitle>
    </template>

    <slot />
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
