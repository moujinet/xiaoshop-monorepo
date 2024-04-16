<script lang="ts" setup>
import { fetchGoodsCategoryList } from '@/goods/apis/category'

defineOptions({
  name: 'GoodsCategorySelector',
})

const { loading, data, refreshData } = fetchGoodsCategoryList(0)

refreshData()

function loadChildren(record: any, done: (children?: any[]) => void) {
  const { refreshData: fetchChildren } = fetchGoodsCategoryList(record.id)

  fetchChildren().then((children) => {
    done(children.map(item => ({ ...item, isLeaf: true })))
  })
}
</script>

<template>
  <a-cascader
    :options="data"
    :loading="loading"
    :field-names="{ label: 'name', value: 'id' }"
    :load-more="loadChildren"
    :allow-search="false"
    placeholder="请选择"
    allow-clear
  />
</template>
