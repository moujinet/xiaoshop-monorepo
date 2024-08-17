<script lang="ts" setup>
import {
  type IMemberSource,
  MEMBER_SOURCES,
} from '@xiaoshop/schema'

defineOptions({
  name: 'MemberSourceBadge',
})

const props = defineProps<{
  value: IMemberSource | string
}>()

const color = computed<IColorName | undefined>(() => {
  return MEMBER_SOURCES.find(item => item.value === props.value)?.color as IColorName
})

const label = computed(() => {
  return MEMBER_SOURCES.find(item => item.value === props.value)?.label
})

const icon = computed(() => {
  return MEMBER_SOURCES.find(item => item.value === props.value)?.icon
})
</script>

<template>
  <CommonBadge :icon="icon" :label="label" :color="color" />
</template>
