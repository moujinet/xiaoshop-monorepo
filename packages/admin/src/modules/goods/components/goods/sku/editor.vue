<script lang="ts" setup>
import type {
  IGoodsSkuFormData,
  IGoodsSkuSpec,
  IGoodsSpec,
} from '@xiaoshop/schema'

import { GoodsSkuValuePopover } from '@/goods/components'

defineOptions({
  name: 'GoodsSkuEditor',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  unit?: string
  specs: IGoodsSpec[]
}>(), {
  unit: '',
  specs: () => [],
})

const skus = defineModel<IGoodsSkuFormData[]>('modelValue', {
  type: Array,
  default: () => [],
})

const headers: {
  label: string
  key: keyof IGoodsSkuFormData
  required: boolean
}[] = [
  { label: '价格', key: 'price', required: true },
  { label: '划线价', key: 'originalPrice', required: false },
  { label: '成本价', key: 'costPrice', required: false },
  { label: '库存', key: 'inventory', required: false },
  { label: '库存预警', key: 'inventoryEarlyWarning', required: false },
  { label: '重量', key: 'weight', required: false },
  { label: '体积', key: 'volume', required: false },
]

const resolvedSpecs = computed(() => {
  return props.specs.filter(spec => spec.name !== '' && spec.values.length > 0)
})

watch(
  () => props.specs,
  () => {
    const combined: IGoodsSkuFormData[] = []
    let skuIndex = 0

    const combineWithSpecs = (
      index: number,
      prevSpec: IGoodsSkuSpec[],
      prevNames: string[],
    ) => {
      const current = resolvedSpecs.value[index]
      const isLast = index === resolvedSpecs.value.length - 1

      current.values.forEach((value) => {
        const spec: IGoodsSkuSpec = {
          specId: current.id || '',
          name: current.name,
          value: value.name,
        }

        const specs = prevSpec.concat(spec)
        const names = prevNames.concat(value.name)

        if (isLast) {
          const sku = skus.value[skuIndex]

          combined.push({
            id: sku?.id || '',
            skuCode: sku?.skuCode || '',
            name: names.join('-'),
            specs,
            image: sku?.image || value.image,
            price: sku?.price || 0,
            originalPrice: sku?.originalPrice || 0,
            costPrice: sku?.costPrice || 0,
            inventory: sku?.inventory || 0,
            inventoryEarlyWarning: sku?.inventoryEarlyWarning || 0,
            weight: sku?.weight || 0,
            volume: sku?.volume || 0,
          })

          skuIndex++
        }
        else {
          combineWithSpecs(index + 1, specs, names)
        }
      })
    }

    if (resolvedSpecs.value.length > 0) {
      combineWithSpecs(0, [], [])
      skus.value = combined
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

function handleValueChange(key: keyof IGoodsSkuFormData, value: number) {
  const dataItems = skus.value as unknown as Array<Record<string, string | number>>

  dataItems.forEach((item) => {
    item[key] = value
  })
}
</script>

<template>
  <div class="flex-(~ col) b-(~ solid $color-border-2) p-$page-padding-sm gap-$page-padding-sm w-full rounded">
    <a-alert v-if="skus.filter(item => (item.price || 0) <= 0).length > 0" type="error">
      请输入价格信息
    </a-alert>

    <div
      class="sku-grid grid"
      :style="{
        gridTemplateColumns: resolvedSpecs.length > 0 ? `repeat(${resolvedSpecs.length}, auto) repeat(9, 1fr)` : 'repeat(9, 1fr)',
      }"
    >
      <div v-for="(spec, index) in resolvedSpecs" :key="spec.id || index" class="sku-grid__header">
        {{ spec.name }}
      </div>
      <div class="sku-grid__header">
        名称
      </div>

      <div v-for="{ label, key, required } in headers" :key="key" class="sku-grid__header">
        <a-space>
          <span v-if="required">
            <span class="c-danger">*</span> {{ label }}
          </span>
          <span v-else>
            {{ label }}
          </span>
          <GoodsSkuValuePopover v-if="skus.length > 1" :label="label" @change="(val) => handleValueChange(key, val)" />
        </a-space>
      </div>

      <div class="sku-grid__header">
        规格编码
      </div>
      <template v-for="(sku, index) in skus" :key="sku.id || index">
        <div v-for="(val, i) in sku.specs" :key="`${index}-${i}`">
          {{ val.value }}
        </div>
        <div>
          <a-input v-model="sku.name" size="small" />
        </div>
        <div>
          <FormPriceInput v-model="sku.price" size="small" :error="sku.price === 0" />
        </div>
        <div>
          <FormPriceInput v-model="sku.originalPrice" size="small" />
        </div>
        <div>
          <FormPriceInput v-model="sku.costPrice" size="small" />
        </div>
        <div>
          <FormNumberInput v-model="sku.inventory" size="small">
            <template #suffix>
              {{ unit }}
            </template>
          </FormNumberInput>
        </div>
        <div>
          <FormNumberInput v-model="sku.inventoryEarlyWarning" size="small">
            <template #suffix>
              {{ unit }}
            </template>
          </FormNumberInput>
        </div>
        <div>
          <FormNumberInput v-model="sku.weight" size="small">
            <template #suffix>
              kg
            </template>
          </FormNumberInput>
        </div>
        <div>
          <FormNumberInput v-model="sku.volume" size="small">
            <template #suffix>
              m<sup>3</sup>
            </template>
          </FormNumberInput>
        </div>
        <div>
          <a-input v-model="sku.skuCode" size="small" placeholder="自动生成" />
        </div>
      </template>
    </div>

    <div v-if="skus.length > 0" class="flex-(~ v-center gap-8)">
      <span>
        规格总数: {{ skus.length }}
      </span>
      <span>
        库存总数: {{ skus.map(sku => sku.inventory || 0).reduce((a, b) => a + b, 0) }}
      </span>
      <span>
        平均价格: {{ skus.map(sku => sku.price || 0).reduce((a, b) => a + b, 0) / skus.length }} 元
      </span>
      <span>
        平均成本: {{ skus.map(sku => sku.costPrice || 0).reduce((a, b) => a + b, 0) / skus.length }} 元
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sku-grid {
  &__header {
    font-weight: 500;
    justify-content: center;
    align-items: center;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
}
</style>
