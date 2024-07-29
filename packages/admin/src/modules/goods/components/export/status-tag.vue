<script lang="ts" setup>
import { GOODS_EXPORT_RECORD_STATUSES, type IGoodsExportRecordStatus } from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsExportStatusTag',
})

const props = defineProps<{
  value: IGoodsExportRecordStatus
}>()

const color = computed(() => {
  return GOODS_EXPORT_RECORD_STATUSES.find(item => item.value === props.value)?.color as IColorName
})

const label = computed(() => {
  return GOODS_EXPORT_RECORD_STATUSES.find(item => item.value === props.value)?.label
})
</script>

<template>
  <CommonBadge
    :color="color"
    :label="label"
  />
</template>
