<script lang="ts" setup>
import { GOODS_TYPES } from '@/goods/constants'

defineOptions({
  name: 'GoodsTypeSelector',
})
</script>

<template>
  <FormSelect
    :options="GOODS_TYPES"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
