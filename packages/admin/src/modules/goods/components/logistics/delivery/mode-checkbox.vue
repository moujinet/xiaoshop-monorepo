<script lang="ts" setup>
import {
  LOGISTICS_DELIVERY_MODES,
  LogisticsDeliveryMode,
} from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsDeliveryModeCheckbox',
})

const settings = useSettings().getOptions(
  'logistics.deliveryMode',
  {},
  ['enableExpress', 'enableSelf', 'enableLocal'],
)

function isDisabled(value: string) {
  const key = `enable${titleCase(value)}`

  return value !== LogisticsDeliveryMode.NONE && !settings[key]
}
</script>

<template>
  <a-checkbox-group>
    <a-checkbox
      v-for="item in LOGISTICS_DELIVERY_MODES"
      :key="item.value"
      :value="item.value"
      :disabled="isDisabled(item.value)"
    >
      {{ item.label }}
    </a-checkbox>
  </a-checkbox-group>
</template>
