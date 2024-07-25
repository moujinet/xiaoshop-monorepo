<script lang="ts" setup>
defineOptions({
  name: 'CommonTag',
})

defineProps<{
  size?: 'sm' | 'lg'
  color?: IColorName
  bordered?: boolean
  rounded?: boolean
  fill?: boolean
}>()
</script>

<template>
  <span
    class="common-tag is-colorful"
    :class="{
      'is-bordered': bordered,
      'is-rounded': rounded,
      'is-fill': fill,
      [`is-${color}`]: !!color,
      [`is-${size}`]: !!size,
    }"
  >
    <slot />
  </span>
</template>

<style lang="less">
.common-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  user-select: none;
  font-size: 12px;
  line-height: 14px;
  padding: 4px 8px;
  color: var(--color-text-1);
  border-color: var(--color-border-2);
  background-color: var(--color-fill-2);
  gap: 4px;

  &.is-bordered {
    border-width: 1px;
    border-style: solid;
  }

  &.is-rounded {
    border-radius: 50%;
  }

  &.is-sm {
    font-size: 12px;
    line-height: 12px;
    padding: 3px 6px;
  }

  &.is-lg {
    font-size: 14px;
    line-height: 16px;
    padding: 6px 10px;
    gap: 6px;
  }
}
</style>
