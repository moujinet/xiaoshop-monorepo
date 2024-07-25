<script lang="ts" setup>
import { fetchGoodsTagDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsTagSelector',
})

const { loading, data, refreshData } = fetchGoodsTagDictList()

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
