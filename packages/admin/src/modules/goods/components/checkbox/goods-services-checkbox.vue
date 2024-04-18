<script lang="ts" setup>
import type { IGoodsService } from '@/goods/types'
import { fetchGoodsServiceList } from '@/goods/apis/service'

defineOptions({
  name: 'GoodsServicesCheckbox',
})

const services = ref<IGoodsService[]>([])
const { refreshData: loadServices } = fetchGoodsServiceList()

function refresh() {
  loadServices().then((res) => {
    services.value = res
  })
}

refresh()

defineExpose({
  refresh,
})
</script>

<template>
  <a-checkbox-group>
    <a-checkbox v-for="item in services" :key="item.id" :value="item.id">
      <div>
        {{ item.name }} <small class="text-gray">(+ ¥{{ item.price.toFixed(2) }})</small>
      </div>
    </a-checkbox>
  </a-checkbox-group>
</template>
