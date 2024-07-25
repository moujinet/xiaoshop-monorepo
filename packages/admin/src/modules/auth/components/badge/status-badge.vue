<script lang="ts" setup>
import { type IStaffAccountStatus, STAFF_ACCOUNT_STATUSES } from '@xiaoshop/schema'

defineOptions({
  name: 'StaffAccountStatusBadge',
})

const props = defineProps<{
  value: IStaffAccountStatus
}>()

const color = computed(() => {
  return STAFF_ACCOUNT_STATUSES.find(item => item.value === props.value)?.color as IColorName
})

const label = computed(() => {
  return STAFF_ACCOUNT_STATUSES.find(item => item.value === props.value)?.label
})
</script>

<template>
  <CommonBadge
    :color="color"
    :label="label"
  />
</template>
