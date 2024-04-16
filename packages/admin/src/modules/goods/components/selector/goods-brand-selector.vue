<script lang="ts" setup>
import { fetchGoodsBrandList } from '@/goods/apis/brand'

defineOptions({
  name: 'GoodsBrandSelector',
})

const { loading, data, refreshData } = fetchGoodsBrandList()

refreshData()
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
