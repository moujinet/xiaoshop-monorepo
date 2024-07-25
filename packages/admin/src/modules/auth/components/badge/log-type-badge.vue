<script lang="ts" setup>
import { type IStaffLogType, STAFF_LOG_TYPES } from '@xiaoshop/schema'

defineOptions({
  name: 'StaffLogTypeBadge',
})

const props = defineProps<{
  value: IStaffLogType
}>()

const color = computed(() => {
  return STAFF_LOG_TYPES.find(item => item.value === props.value)?.color as IColorName
})

const label = computed(() => {
  return STAFF_LOG_TYPES.find(item => item.value === props.value)?.label
})
</script>

<template>
  <CommonBadge
    :color="color"
    :label="label"
  />
</template>
