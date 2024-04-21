<script lang="ts" setup>
import type { IGoods, IGoodsSku } from '@/goods/types'

import { GoodsSkuValuePopup } from '@/goods/components/sku'

import {
  fetchGoodsSkuList,
  updateGoodsSkus,
} from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsStockEditModal',
})

const props = defineProps<{
  id: IGoods['id']
  unit?: string
}>()

const emit = defineEmits(['success'])

const visible = ref(false)
const formData = ref<Partial<IGoodsSku>[]>([])
const { loading, data, refreshData } = fetchGoodsSkuList(props.id)

watch(visible, () => {
  refreshData()
})

function handleValueChange(key: keyof IGoodsSku, value: number) {
  const dataItems = data.value as unknown as Array<Record<string, string | number>>

  dataItems.forEach((item) => {
    item[key] = value
  })
}

function handleSubmit(done: (closed: boolean) => void) {
  if (!data.value || data.value.length === 0)
    done(true)

  loading.value = true

  data.value.forEach((item) => {
    formData.value.push(omit(item, ['name', 'skuId', 'specs']))
  })

  updateGoodsSkus(props.id, formData.value)
    .then(() => {
      useMessage({
        onClose: () => {
          visible.value = false
          done(true)
          emit('success')
        },
      }).success('成功修改商品库存')
    })
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
      <a-spin :loading="loading" w-full>
        <div grid="~ cols-8">
          <span class="text-gray text-3 p-2">SKU</span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>价格</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="价格"
              @change="(val) => handleValueChange('price', val)"
            />
          </span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>划线价</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="划线价"
              @change="(val) => handleValueChange('originalPrice', val)"
            />
          </span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>成本价</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="成本价"
              @change="(val) => handleValueChange('costPrice', val)"
            />
          </span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>库存</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="库存"
              @change="(val) => handleValueChange('stock', val)"
            />
          </span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>预警库存</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="预警库存"
              @change="(val) => handleValueChange('alarmStock', val)"
            />
          </span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>重量</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="重量"
              @change="(val) => handleValueChange('weight', val)"
            />
          </span>

          <span class="text-gray text-3 p-2" flex="~ v-center between">
            <span>体积</span>
            <GoodsSkuValuePopup
              v-if="data && data.length > 1"
              label="体积"
              @change="(val) => handleValueChange('volume', val)"
            />
          </span>

          <template v-for="sku in data" :key="sku.id">
            <span class="p-2 flex flex-v-center" border-t="~ solid $color-border-1">
              <a-tooltip :content="`SKU: ${sku.skuId}`" mini>
                <span>{{ sku.name }}</span>
              </a-tooltip>
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormPriceInput v-model="sku.price" />
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormPriceInput v-model="sku.originalPrice" />
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormPriceInput v-model="sku.costPrice" />
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormNumberInput v-model="sku.stock">
                <template #suffix>
                  {{ props.unit || '件' }}
                </template>
              </FormNumberInput>
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormNumberInput v-model="sku.alarmStock">
                <template #suffix>
                  {{ props.unit || '件' }}
                </template>
              </FormNumberInput>
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormNumberInput v-model="sku.weight">
                <template #suffix>
                  kg
                </template>
              </FormNumberInput>
            </span>
            <span class="p-2" border-t="~ solid $color-border-1">
              <FormNumberInput v-model="sku.volume">
                <template #suffix>
                  m<sup>3</sup>
                </template>
              </FormNumberInput>
            </span>
          </template>
        </div>
      </a-spin>
    </template>
  </CommonModal>
</template>
