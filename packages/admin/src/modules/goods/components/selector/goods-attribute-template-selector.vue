<script lang="ts" setup>
import { fetchGoodsAttributeTemplateList } from '@/goods/apis/attribute'

defineOptions({
  name: 'GoodsAttributeTemplateSelector',
})

const { loading, data, refreshData } = fetchGoodsAttributeTemplateList()

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
