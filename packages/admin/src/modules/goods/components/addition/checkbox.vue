<script lang="ts" setup>
import type { IGoodsAdditionDict } from '@xiaoshop/schema'
import { fetchGoodsAdditionDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsAdditionCheckbox',
})

const additions = ref<IGoodsAdditionDict[]>([])

const {
  refreshData: loadData,
} = fetchGoodsAdditionDictList()

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
