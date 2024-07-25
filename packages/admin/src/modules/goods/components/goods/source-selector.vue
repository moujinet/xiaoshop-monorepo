<script lang="ts" setup>
import { GOODS_SOURCES } from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsSourceSelector',
})
</script>

<template>
  <FormSelect
    :options="GOODS_SOURCES"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
