<script lang="ts" setup>
import { GOODS_STATUSES } from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsStatusSelector',
})
</script>

<template>
  <FormSelect
    :options="GOODS_STATUSES"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
