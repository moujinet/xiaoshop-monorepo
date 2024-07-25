<script lang="ts" setup>
defineOptions({
  name: 'FormNumberInput',
})

const props = defineProps<{
  showZero?: boolean
}>()

function formatter(value: string) {
  return !props.showZero && value === '0' ? '' : value
}
</script>

<template>
  <a-input-number :formatter="formatter" hide-button>
    <template #suffix>
      <slot name="suffix" />
    </template>
  </a-input-number>
</template>
