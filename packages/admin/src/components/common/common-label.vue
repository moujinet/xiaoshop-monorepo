<script lang="ts" setup>
defineOptions({
  name: 'CommonLabel',
})

withDefaults(defineProps<{
  type?: 'text' | 'number' | 'price'
  value?: string | number
  prefix?: string
  suffix?: string
}>(), {
  type: 'text',
})
</script>

<template>
  <span>
    <small v-if="prefix" class="text-$color-text-3 font-normal mr-0.5">
      {{ prefix }}
    </small>

    {{ type === 'text' ? value : formatNumber(type === 'price' ? Number(value).toFixed(2) : value === 0 ? 0 : value || '') }}

    <small v-if="suffix" class="text-$color-text-3 font-normal ml-0.5" v-html="suffix" />
  </span>
</template>
