<script lang="ts" setup>
import { fetchGoodsCategoryTree } from '@/goods/apis'

defineOptions({
  name: 'GoodsCategorySelector',
})
const { loading, data, refreshData } = fetchGoodsCategoryTree()

refreshData()

defineExpose({
  refresh: refreshData,
})
</script>

<template>
  <a-cascader
    :options="data"
    :loading="loading"
    :field-names="{ label: 'name', value: 'id' }"
    :allow-search="false"
    :fallback="false"
    placeholder="请选择"
    expand-child
    check-strictly
    allow-clear
  />
</template>
