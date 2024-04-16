<script lang="ts" setup>
import { fetchGoodsGroupList } from '@/goods/apis/group'

defineOptions({
  name: 'GoodsGroupSelector',
})

const { loading, data, refreshData } = fetchGoodsGroupList()

refreshData()
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
