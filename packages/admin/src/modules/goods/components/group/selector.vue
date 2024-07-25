<script lang="ts" setup>
import { fetchGoodsGroupDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsGroupSelector',
})

const { loading, data, refreshData } = fetchGoodsGroupDictList()

refreshData()

defineExpose({
  refresh: refreshData,
})
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
