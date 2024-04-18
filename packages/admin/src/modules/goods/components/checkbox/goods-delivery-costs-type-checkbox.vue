<script lang="ts" setup>
import { GOODS_DELIVERY_COSTS_TYPES } from '@/goods/constants'

defineOptions({
  name: 'GoodsDeliveryCostsTypeCheckbox',
})
</script>

<template>
  <a-radio-group direction="vertical" :options="GOODS_DELIVERY_COSTS_TYPES" />
</template>
