<script lang="ts" setup>
import type { IGoodsAdditionalDict } from '@xiaoshop/schema'
import { fetchGoodsAdditionalDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsAdditionalCheckbox',
})

const additions = ref<IGoodsAdditionalDict[]>([])

const {
  refreshData: loadData,
} = fetchGoodsAdditionalDictList()

function refresh() {
  loadData().then((res) => {
    additions.value = res
  })
}

refresh()

defineExpose({
  refresh,
})
</script>

<template>
  <a-checkbox-group>
    <a-checkbox v-for="item in additions" :key="item.id" :value="item.id">
      {{ item.name }} <small class="text-gray">(+ ¥{{ item.price.toFixed(2) }})</small>
    </a-checkbox>
  </a-checkbox-group>
</template>
