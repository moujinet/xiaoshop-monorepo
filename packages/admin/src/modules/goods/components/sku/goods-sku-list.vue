<script lang="ts" setup>
import type { IGoods } from '@/goods/types'
import { fetchGoodsSkuList } from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsSkuList',
})

const props = defineProps<{
  id: IGoods['id']
  unit?: string
}>()

const { loading, data, refreshData } = fetchGoodsSkuList(props.id)

if (!data.value?.length)
  refreshData()
</script>

<template>
  <a-spin :loading="loading">
    <div grid="~ cols-9">
      <span />
      <span class="text-gray text-3 p-2">SKU</span>
      <span class="text-gray text-3 p-2">价格</span>
      <span class="text-gray text-3 p-2">划线价</span>
      <span class="text-gray text-3 p-2">成本价</span>
      <span class="text-gray text-3 p-2">库存</span>
      <span class="text-gray text-3 p-2">预警库存</span>
      <span class="text-gray text-3 p-2">重量</span>
      <span class="text-gray text-3 p-2">体积</span>

      <template v-for="sku in data" :key="sku.id">
        <span class="p-2">
          <a-tooltip content="库存低于预警库存" mini>
            <CommonIcon
              v-if="sku.stock <= sku.alarmStock"
              class="text-orange text-4"
              name="ph:warning"
              active
            />
          </a-tooltip>
        </span>
        <span class="p-2" border-t="~ solid $color-border-1">
          {{ sku.name }}
        </span>
        <span class="p-2" border-t="~ solid $color-border-1">
          <CommonPrice :price="sku.price" mode="suffix" />
        </span>
        <span class="p-2" border-t="~ solid $color-border-1">
          <CommonPrice :price="sku.originalPrice" mode="suffix" />
        </span>
        <span class="p-2" border-t="~ solid $color-border-1">
          <CommonPrice :price="sku.costPrice" mode="suffix" />
        </span>
        <span class="p-2" border-t="~ solid $color-border-1" :class="{ 'text-red font-500': sku.stock <= sku.alarmStock }">
          {{ sku.stock }} <small class="text-gray">{{ props.unit || '件' }}</small>
        </span>
        <span class="p-2" border-t="~ solid $color-border-1" :class="{ 'text-red font-500': sku.stock <= sku.alarmStock }">
          {{ sku.alarmStock }} <small class="text-gray">{{ props.unit || '件' }}</small>
        </span>
        <span class="p-2" border-t="~ solid $color-border-1">
          {{ sku.weight }} <small class="text-gray">kg</small>
        </span>
        <span class="p-2" border-t="~ solid $color-border-1">
          {{ sku.volume }}
          <small class="text-gray">m<sup>3</sup></small>
        </span>
      </template>
    </div>
  </a-spin>
</template>
