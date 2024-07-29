<script lang="ts" setup>
import { fetchGoodsCategoryTree } from '@/goods/apis'

defineOptions({
  name: 'GoodsCategorySelector',
})
const { loading, data, refreshData } = fetchGoodsCategoryTree()

refreshData()

defineExpose({
  refresh: refreshData,
  getLabel: (id: number) => {
    for (const item of data.value) {
      if (item.id === id) {
        return item.name
      }

      if (item.children) {
        const name = item.children.find(child => child.id === id)?.name
        if (name) {
          return `${item.name}/${name}`
        }
      }
    }

    return ''
  },
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
