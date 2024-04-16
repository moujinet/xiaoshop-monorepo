<script lang="ts" setup>
import { fetchGoodsTagList } from '@/goods/apis/tag'

defineOptions({
  name: 'GoodsTagsSelector',
})

const { loading, data, refreshData } = fetchGoodsTagList()

refreshData()
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
