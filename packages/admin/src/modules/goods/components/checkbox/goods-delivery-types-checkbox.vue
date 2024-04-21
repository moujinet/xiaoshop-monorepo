<script lang="ts" setup>
import { GOODS_DELIVERY_TYPES } from '@/goods/constants'

defineOptions({
  name: 'GoodsDeliveryTypesCheckbox',
})

const settings = useSettings().getOptions('shop.goods', {}, ['enableExpress', 'enableSelf', 'enableLocal'])

function isDisabled(value: string) {
  const key = `enable${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`

  return !settings[key]
}
</script>

<template>
  <a-checkbox-group>
    <a-checkbox
      v-for="item in GOODS_DELIVERY_TYPES"
      :key="item.value"
      :value="item.value"
      :disabled="isDisabled(item.value)"
    >
      {{ item.label }}
    </a-checkbox>
  </a-checkbox-group>
</template>
