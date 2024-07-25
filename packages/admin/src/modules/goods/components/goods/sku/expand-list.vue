<script lang="ts" setup>
import type { IGoods } from '@xiaoshop/schema'
import { fetchGoodsSkuList } from '@/goods/apis'

defineOptions({
  name: 'GoodsSkuExpandList',
  inheritAttrs: false,
})

const props = defineProps<{
  id: IGoods['id']
  unit?: string
}>()

const { loading, data: skus, refreshData: loadSkus } = fetchGoodsSkuList(props.id)

if (!skus.value?.length) {
  loadSkus()
}
</script>

<template>
  <a-spin :loading="loading" class="w-full">
    <div v-if="skus?.length" class="sku-expand-list">
      <span />
      <span class="hd">SKU</span>
      <span class="hd text-right">价格</span>
      <span class="hd text-right">划线价</span>
      <span class="hd text-right">成本价</span>
      <span class="hd text-right">库存</span>
      <span class="hd text-right">预警库存</span>
      <span class="hd text-right">重量</span>
      <span class="hd text-right">体积</span>

      <template v-for="sku in skus" :key="sku.id">
        <span class="p-2">
          <a-tooltip v-if="sku.stock <= sku.alertStock" content="库存低于预警库存" mini>
            <CommonIcon class="text-orange text-4" name="mingcute:alert" active />
          </a-tooltip>
        </span>
        <span class="cell">
          {{ sku.name }}
        </span>
        <span class="cell text-right">
          <CommonLabel :value="sku.price" type="price" suffix="元" />
        </span>
        <span class="cell text-right">
          <CommonLabel :value="sku.originalPrice" type="price" suffix="元" />
        </span>
        <span class="cell text-right">
          <CommonLabel :value="sku.costPrice" type="price" suffix="元" />
        </span>
        <span class="cell text-right" :class="{ 'text-danger font-500': sku.stock <= sku.alertStock }">
          <CommonLabel :value="sku.stock" type="number" :suffix="props.unit || '件'" />
        </span>
        <span class="cell text-right" :class="{ 'text-danger font-500': sku.stock <= sku.alertStock }">
          <CommonLabel :value="sku.alertStock" type="number" :suffix="props.unit || '件'" />
        </span>
        <span class="cell text-right">
          <CommonLabel :value="sku.weight" type="number" suffix="kg" />
        </span>
        <span class="cell text-right">
          <CommonLabel :value="sku.volume" type="number" suffix="m<sup>3</sup>" />
        </span>
      </template>
    </div>

    <CommonEmpty v-else class="w-full h-full" description="此商品为「单规格商品」" />
  </a-spin>
</template>

<style lang="postcss" scoped>
.sku-expand-list {
  @apply: grid cols-9;

  & .hd {
    @apply: text-gray text-3 px-2 py-3;
  }

  & .cell {
    @apply: b-t-(1 solid $color-border-1) p-2;
  }
}
</style>
