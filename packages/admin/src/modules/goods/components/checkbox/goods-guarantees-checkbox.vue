<script lang="ts" setup>
import type { IGoodsGuarantee } from '@/goods/types'

import { fetchGoodsGuaranteeList } from '@/goods/apis/guarantee'

defineOptions({
  name: 'GoodsGuaranteesCheckbox',
})

const guarantees = ref<IGoodsGuarantee[]>([])
const { refreshData: loadGuarantees } = fetchGoodsGuaranteeList()

function refresh() {
  loadGuarantees().then((res) => {
    guarantees.value = res
  })
}

refresh()

defineExpose({
  refresh,
})
</script>

<template>
  <a-checkbox-group>
    <a-checkbox v-for="item in guarantees" :key="item.id" :value="item.id">
      {{ item.name }}
    </a-checkbox>
  </a-checkbox-group>
</template>
