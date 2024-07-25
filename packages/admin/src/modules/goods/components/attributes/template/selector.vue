<script lang="ts" setup>
import { fetchGoodsAttributeTemplateDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsAttributeTemplateSelector',
})

const { loading, data, refreshData } = fetchGoodsAttributeTemplateDictList()

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
