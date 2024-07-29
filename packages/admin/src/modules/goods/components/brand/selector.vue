<script lang="ts" setup>
import { fetchGoodsBrandDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsBrandSelector',
})

const { loading, data, refreshData } = fetchGoodsBrandDictList()

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
