<script lang="ts" setup>
import {
  GoodsStockDeductModeEnum,
  type IGoods,
  type IGoodsSkuFormData,
} from '@xiaoshop/schema'

import { GoodsSkuValuePopover } from '@/goods/components'

import {
  fetchGoodsSkuList,
  fetchGoodsStockInfo,
  updateGoodsSkus,
  updateStockInfo,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsStockModal',
})

const props = defineProps<{
  id: IGoods['id']
  unit?: string
}>()

const emit = defineEmits(['success'])

const { loading: skusLoading, data: skus, refreshData: loadSkus } = fetchGoodsSkuList(props.id)
const { loading: stockLoading, data: stock, refreshData: loadStock } = fetchGoodsStockInfo(props.id)

const visible = ref(false)
const loading = computed(() => skusLoading.value && stockLoading.value)
const isMultiSku = computed(() => skus.value?.length > 0)

const columns: {
  key: keyof IGoodsSkuFormData
  label: string
}[] = [
  { key: 'price', label: '价格' },
  { key: 'originalPrice', label: '划线价' },
  { key: 'costPrice', label: '成本价' },
  { key: 'stock', label: '库存' },
  { key: 'alertStock', label: '预警库存' },
  { key: 'weight', label: '重量' },
  { key: 'volume', label: '体积' },
]

watch(visible, () => {
  if (visible.value) {
    loadStock()
    loadSkus()
  }
})

function handleValueChange(key: keyof IGoodsSkuFormData, value: number) {
  const dataItems = skus.value as unknown as Array<Record<string, string | number>>

  dataItems.forEach((item) => {
    item[key] = value
  })
}

function handleSubmit(done: (closed: boolean) => void) {
  if (isMultiSku.value && (!skus.value || skus.value.length === 0))
    done(true)

  const message = useMessage({
    onClose: () => {
      visible.value = false
      done(true)
      emit('success')
    },
  })

  if (!stock.value.stockDeductMode) {
    stock.value.stockDeductMode = GoodsStockDeductModeEnum.ORDER
  }

  if (isMultiSku.value) {
    if (skus.value.length > 0) {
      stock.value.price = skus.value.map((sku: any) => sku.price).reduce((acc: number, cur: number) => Math.min(acc, cur), skus.value[0].price)
      stock.value.stock = skus.value.map((sku: any) => sku.stock).reduce((acc: number, cur: number) => acc + cur, 0)
    }

    updateGoodsSkus(props.id, skus.value)
      .then(() => {
        updateStockInfo(props.id, omit(stock.value, ['id']))
      })
      .finally(() => {
        message.success('成功修改商品库存')
      })
  }
  else {
    updateStockInfo(props.id, omit(stock.value, ['id'])).then(() => {
      message.success('成功修改商品库存')
    })
  }
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :width="960"
    title="修改商品库存"
    ok-text="修改"
    cancel-text="关闭"
    @before-ok="handleSubmit"
  >
    <slot />

    <template #modal>
      <a-spin :loading="loading" class="w-full">
        <template v-if="isMultiSku">
          <div class="grid-(~ cols-8)">
            <span class="text-gray text-3 p-2">SKU</span>

            <template v-for="{ key, label } in columns" :key="key">
              <span class="flex-(~ v-center between) text-gray text-3 p-2">
                <span>{{ label }}</span>
                <GoodsSkuValuePopover
                  v-if="skus && skus.length > 1"
                  :label="label"
                  @change="(val) => handleValueChange(key, val)"
                />
              </span>
            </template>

            <template v-for="sku in skus" :key="sku.id">
              <span class="flex-(~ v-center) b-t-(1 solid $color-border-1) p-2">
                <a-tooltip :content="`SKU: ${sku.skuCode}`" mini>
                  <span>{{ sku.name }}</span>
                </a-tooltip>
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormPriceInput v-model="sku.price" />
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormPriceInput v-model="sku.originalPrice" />
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormPriceInput v-model="sku.costPrice" />
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormNumberInput v-model="sku.stock">
                  <template #suffix>
                    {{ props.unit || '件' }}
                  </template>
                </FormNumberInput>
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormNumberInput v-model="sku.alertStock">
                  <template #suffix>
                    {{ props.unit || '件' }}
                  </template>
                </FormNumberInput>
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormNumberInput v-model="sku.weight">
                  <template #suffix>
                    kg
                  </template>
                </FormNumberInput>
              </span>
              <span class="b-t-(1 solid $color-border-1) p-2">
                <FormNumberInput v-model="sku.volume">
                  <template #suffix>
                    m<sup>3</sup>
                  </template>
                </FormNumberInput>
              </span>
            </template>
          </div>
        </template>

        <template v-else>
          <div v-if="stock" class="grid-(~ cols-7)">
            <template v-for="{ key, label } in columns" :key="key">
              <span class="flex-(~ v-center between) text-gray text-3 p-2">
                <span>{{ label }}</span>
              </span>
            </template>

            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormPriceInput v-model="stock.price" />
            </span>
            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormPriceInput v-model="stock.originalPrice" />
            </span>
            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormPriceInput v-model="stock.costPrice" />
            </span>
            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormNumberInput v-model="stock.stock">
                <template #suffix>
                  {{ props.unit || '件' }}
                </template>
              </FormNumberInput>
            </span>
            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormNumberInput v-model="stock.alertStock">
                <template #suffix>
                  {{ props.unit || '件' }}
                </template>
              </FormNumberInput>
            </span>
            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormNumberInput v-model="stock.weight">
                <template #suffix>
                  kg
                </template>
              </FormNumberInput>
            </span>
            <span class="b-t-(1 solid $color-border-1) p-2">
              <FormNumberInput v-model="stock.volume">
                <template #suffix>
                  m<sup>3</sup>
                </template>
              </FormNumberInput>
            </span>
          </div>
        </template>
      </a-spin>
    </template>
  </CommonModal>
</template>
