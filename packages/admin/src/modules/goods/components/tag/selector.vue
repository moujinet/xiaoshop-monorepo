<script lang="ts" setup>
import { fetchGoodsTagDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsTagSelector',
})

const { loading, data, refreshData } = fetchGoodsTagDictList()

refreshData()

defineExpose({
  refresh: refreshData,
  getLabel: (id: number) => {
    for (const item of data.value) {
      if (item.id === id) {
        return item.name
      }
    }

    return ''
  },
})
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
