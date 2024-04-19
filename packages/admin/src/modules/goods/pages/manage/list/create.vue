<script lang="ts" setup>
import type { IGoodsFormData } from '@/goods/types'

import {
  GOODS_BUY_BUTTON_TYPE_DEFAULT,
  GOODS_DEFAULT_BUY_BUTTON_NAME,
  GOODS_DELIVERY_COSTS_TYPE_UNIFIED,
  GOODS_DELIVERY_TYPE_EXPRESS,
  GOODS_PUBLISH_TYPE_DIRECT,
  GOODS_RETURN_COSTS_TYPE_BUYER,
  GOODS_STATUS_DRAFT,
  GOODS_STATUS_IN_STOCK,
  GOODS_STOCK_DEDUCT_TYPE_ORDER,
  GOODS_TYPE_GOODS,
  type IGoodsType,
} from '@/goods/constants'

import { GoodsEditForm } from '@/goods/components'

import { createGoods } from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsManageListCreatePage',
})

const route = useRoute()
const type = route.query.type as unknown as IGoodsType || GOODS_TYPE_GOODS

const formRef = ref()
const loading = ref(false)
const form = reactive<IGoodsFormData>({
  type,
  status: GOODS_STATUS_DRAFT,
  images: [],
  video: undefined,
  categories: [],
  name: '',
  shareDesc: '',
  slogan: '',
  tagId: 0,
  groupId: 0,
  brandId: 0,
  services: [],
  guarantees: [],
  attributeTemplateId: 0,
  attributes: [],
  skuSpecs: [],
  skus: [],
  skuId: '',
  price: 0,
  originalPrice: 0,
  costPrice: 0,
  stock: 0,
  alarmStock: 0,
  weight: 0,
  volume: 0,
  enableHideStock: false,
  enableVipDiscount: false,
  unit: '',
  enablePurchaseLimit: false,
  purchaseLimit: 0,
  purchaseMinQty: 1,
  stockDeductType: GOODS_STOCK_DEDUCT_TYPE_ORDER,
  deliveryTypes: [GOODS_DELIVERY_TYPE_EXPRESS],
  deliveryCostsType: GOODS_DELIVERY_COSTS_TYPE_UNIFIED,
  deliveryCosts: 0,
  deliveryCostsTemplateId: 0,
  returnCostsType: GOODS_RETURN_COSTS_TYPE_BUYER,
  publishType: GOODS_PUBLISH_TYPE_DIRECT,
  publishTime: 0,
  buyButtonNameType: GOODS_BUY_BUTTON_TYPE_DEFAULT,
  buyButtonName: GOODS_DEFAULT_BUY_BUTTON_NAME,
  detail: '',
})

function handleSaveDraft() {
  loading.value = true
  form.status = GOODS_STATUS_DRAFT

  createGoods(form)
    .then(() => {
      formRef.value.toStep(4)
    })
    .finally(() => {
      loading.value = false
    })
}

function handlePublish() {
  loading.value = true
  form.status = GOODS_STATUS_IN_STOCK

  createGoods(form)
    .then(() => {
      formRef.value.toStep(4)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <CommonContainer flexible>
    <GoodsEditForm
      ref="formRef"
      v-model:form="form"
      :loading="loading"
      @save-draft="handleSaveDraft"
      @publish="handlePublish"
    />
  </CommonContainer>
</template>
