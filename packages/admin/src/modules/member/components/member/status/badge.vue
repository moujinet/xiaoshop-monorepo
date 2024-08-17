<script lang="ts" setup>
import {
  type IMemberStatus,
  MEMBER_STATUSES,
} from '@xiaoshop/schema'

defineOptions({
  name: 'MemberStatusBadge',
})

const props = defineProps<{
  status: IMemberStatus
  hideLabel?: boolean
}>()

const color = computed<IColorName | undefined>(() => {
  return MEMBER_STATUSES.find(item => item.value === props.status)?.color as IColorName
})

const label = computed(() => {
  return MEMBER_STATUSES.find(item => item.value === props.status)?.label
})
</script>

<template>
  <CommonBadge :color="color" :label="!hideLabel ? label : ''" />
</template>
