<script lang="ts" setup>
defineOptions({
  name: 'CommonPrice',
})

defineProps<{
  price?: number
}>()
</script>

<template>
  <span>
    <slot>
      {{ price?.toFixed(2) }}
    </slot>
    <small c-gray>元</small>
  </span>
</template>
