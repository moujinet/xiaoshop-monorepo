<script lang="ts" setup>
defineOptions({
  name: 'CommonIconBlock',
})

defineProps<{
  icon: string
  color?: IColorName
  linear?: boolean
  rounded?: boolean
  circle?: boolean
  filled?: boolean
  blocked?: boolean
}>()
</script>

<template>
  <span
    class="flex-(inline center) p-2"
    :class="{
      [`is-colorful is-${color}`]: color,
      'rounded': rounded,
      'rounded-full': circle,
      'is-fill': filled,
    }"
  >
    <CommonIcon
      :name="icon"
      :inline="!blocked"
      :active="!linear"
    />
  </span>
</template>
