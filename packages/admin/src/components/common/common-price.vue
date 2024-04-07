<script lang="ts" setup>
defineOptions({
  name: 'CommonPrice',
})

withDefaults(defineProps<{
  symbol?: string

  mode?: 'prefix' | 'suffix' | 'none'
  price?: number
  fractionDigits?: number
}>(), {
  mode: 'none',
  fractionDigits: 2,
  icon: true,
})
</script>

<template>
  <span v-if="price || $slots.default" flex="~ gap-1">
    <span v-if="symbol">{{ symbol }} </span>
    <span flex="~ items-baseline gap-0.5">
      <small v-if="mode === 'prefix'" c-gray>¥</small>
      <span>
        <slot>
          {{ price?.toFixed(fractionDigits) }}
        </slot>
      </span>
      <small v-if="mode === 'suffix'" c-gray>元</small>
    </span>
  </span>
</template>
