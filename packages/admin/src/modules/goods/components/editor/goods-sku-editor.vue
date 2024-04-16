<script lang="ts" setup>
import type { IGoodsSku, IGoodsSkuSpecValue, IGoodsSkuSpecs } from '@/goods/types'

defineOptions({
  name: 'GoodsSkuEditor',
})

const modelValue = defineModel<IGoodsSku[]>('modelValue', {
  type: Array,
  default: () => [],
})

const skuSpecs = defineModel<IGoodsSkuSpecs[]>('skuSpecs', {
  type: Array,
  default: () => [],
})

watch(
  skuSpecs,
  () => {
    const combine: IGoodsSku[] = []

    const combineSpecs = (index: number, prevSpecs: IGoodsSkuSpecValue[], prevName: string[]) => {
      const spec = skuSpecs.value[index]
      const isLast = index === skuSpecs.value.length - 1

      spec.values.forEach((val) => {
        const value: IGoodsSkuSpecValue = {
          name: val.name,
        }

        if (spec.enableImage)
          value.image = val.image

        const curSpecs = prevSpecs.concat(value)
        const curName = prevName.concat(val.name)

        if (isLast) {
          combine.push({
            specs: curSpecs,
            name: curName.join('/'),
            skuId: '',
            price: 0,
            originalPrice: 0,
            costPrice: 0,
            stock: 0,
            alarmStock: 0,
            weight: 0,
            volume: 0,
          })
        }
        else { combineSpecs(index + 1, curSpecs, curName) }
      })
    }

    combineSpecs(0, [], [])

    modelValue.value = combine
  },
  { deep: true },
)
</script>

<template>
  <div
    flex="~ col"
    border="~ solid $color-border-2"
    p="$page-padding-sm"
    gap="$page-padding-sm"
    w-full
    rounded
  >
    <div
      class="sku-grid"
      grid="~"
      :style="{
        gridTemplateColumns: skuSpecs.length > 0 ? `repeat(${skuSpecs.length}, auto) repeat(9, 90px)` : 'repeat(9, 1fr)',
      }"
    >
      <div v-for="(spec, index) in skuSpecs" :key="spec.id || index" class="sku-grid__header">
        {{ spec.name }}
      </div>
      <div class="sku-grid__header">
        名称
      </div>
      <div class="sku-grid__header">
        <span class="c-danger">*</span> 价格
      </div>
      <div class="sku-grid__header">
        划线价
      </div>
      <div class="sku-grid__header">
        成本价
      </div>
      <div class="sku-grid__header">
        <span class="c-danger">*</span> 库存
      </div>
      <div class="sku-grid__header">
        库存预警
      </div>
      <div class="sku-grid__header">
        重量
      </div>
      <div class="sku-grid__header">
        体积
      </div>
      <div class="sku-grid__header">
        规格编码
      </div>
      <template v-for="(spec, index) in modelValue" :key="spec.id || index">
        <div v-for="(val, i) in spec.specs" :key="i">
          {{ val.name }}
        </div>
        <div>
          <a-input v-model="spec.name" />
        </div>
        <div>
          <FormPriceInput v-model="spec.price" />
        </div>
        <div>
          <FormPriceInput v-model="spec.originalPrice" />
        </div>
        <div>
          <FormPriceInput v-model="spec.costPrice" />
        </div>
        <div>
          <FormNumberInput v-model="spec.stock" />
        </div>
        <div>
          <FormNumberInput v-model="spec.alarmStock" />
        </div>
        <div>
          <FormNumberInput v-model="spec.weight">
            <template #suffix>
              kg
            </template>
          </FormNumberInput>
        </div>
        <div>
          <FormNumberInput v-model="spec.volume">
            <template #suffix>
              m<sup>3</sup>
            </template>
          </FormNumberInput>
        </div>
        <div>
          <a-input v-model="spec.skuId" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sku-grid {
  &__header {
    font-weight: 500;
  }

  > div {
    display: flex;
    align-items: center;
    padding: 6px;
  }
}
</style>
