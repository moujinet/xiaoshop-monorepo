<script lang="ts" setup>
import type { IGoodsProtectionDict } from '@xiaoshop/schema'
import { fetchGoodsProtectionDictList } from '@/goods/apis'

defineOptions({
  name: 'GoodsProtectionCheckbox',
})

const protections = ref<IGoodsProtectionDict[]>([])

const {
  refreshData: loadData,
} = fetchGoodsProtectionDictList()

function refresh() {
  loadData().then((res) => {
    protections.value = res
  })
}

refresh()

defineExpose({
  refresh,
})
</script>

<template>
  <a-checkbox-group>
    <a-checkbox v-for="item in protections" :key="item.id" :value="item.id">
      <span>
        {{ item.name }}
      </span>
    </a-checkbox>
  </a-checkbox-group>
</template>
