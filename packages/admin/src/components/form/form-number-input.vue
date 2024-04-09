<script lang="ts" setup>
defineOptions({
  name: 'FormNumberInput',
})

function formatter(value: string) {
  return value === '0' ? '' : value
}
</script>

<template>
  <a-input-number :formatter="formatter" hide-button>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </a-input-number>
</template>
