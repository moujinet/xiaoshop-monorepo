<script lang="ts" setup>
import { GOODS_DELIVERY_TYPES } from '@/goods/constants'

defineOptions({
  name: 'GoodsDeliveryTypesCheckbox',
})
</script>

<template>
  <a-checkbox-group>
    <a-checkbox v-for="item in GOODS_DELIVERY_TYPES" :key="item.value" :value="item.value">
      {{ item.label }}
    </a-checkbox>
  </a-checkbox-group>
</template>
