<script lang="ts" setup>
import { fetchFreightTemplateDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsLogisticsTemplateSelector',
})

const { loading, data, refreshData } = fetchFreightTemplateDictList()

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
