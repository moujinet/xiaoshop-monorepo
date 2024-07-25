<script lang="ts" setup>
defineOptions({
  name: 'CommonBadge',
})

defineProps<{
  label?: string
  icon?: string
  color?: IColorName
  rounded?: boolean
  linear?: boolean
  blocked?: boolean
  filled?: boolean
  dotted?: boolean
  colorText?: boolean
}>()
</script>

<template>
  <span class="flex-(inline v-center) gap-1">
    <span
      v-if="dotted || icon"
      :class="{
        [`is-colorful is-${color}`]: color,
        'is-fill': !icon || filled,
        'rounded-full flex-inline w-2 h-2 m-r-1': !icon,
        'bg-transparent!': icon && !rounded && !filled,
        'p-0.5 rounded-full flex-(inline center) w-4 h-4': rounded,
      }"
    >
      <CommonIcon
        v-if="icon"
        :name="icon"
        :class="rounded ? 'text-3' : 'text-4'"
        :inline="!blocked && !rounded"
        :active="!linear"
      />
    </span>

    <span v-if="label" :class="{ [`bg-transparent! is-colorful is-${color}`]: colorText && color }">
      {{ label }}
    </span>
  </span>
</template>
