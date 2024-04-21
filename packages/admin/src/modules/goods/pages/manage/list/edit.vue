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
} from '@/goods/constants'

import { GoodsEditForm } from '@/goods/components'

import { fetchGoodsDetail, updateGoods } from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsManageListEditPage',
})

const route = useRoute()
const formRef = ref()
const form = reactive<IGoodsFormData>({
  type: GOODS_TYPE_GOODS,
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

const { loading, refreshData } = fetchGoodsDetail(Number(route.query.id))

refreshData()
  .then((res) => {
    form.type = res.type
    form.status = res.status
    form.images = res.images || []
    form.video = res.video || undefined
    form.categories = res.categories ? res.categories.map(item => item.id) : []
    form.name = res.name || ''
    form.shareDesc = res.shareDesc || ''
    form.slogan = res.slogan || ''
    form.tagId = res.tag ? res.tag.id : 0
    form.groupId = res.group ? res.group.id : 0
    form.brandId = res.brand ? res.brand.id : 0
    form.services = res.services ? res.services.map(item => item.id) : []
    form.guarantees = res.guarantees ? res.guarantees.map(item => item.id) : []
    form.attributeTemplateId = res.attributeTemplateId || 0
    form.attributes = res.attributes || []
    form.skuSpecs = res.skuSpecs || []
    form.skus = res.skus || []
    form.skuId = res.skuId || ''
    form.price = res.price || 0
    form.originalPrice = res.originalPrice || 0
    form.costPrice = res.costPrice || 0
    form.stock = res.stock || 0
    form.alarmStock = res.alarmStock || 0
    form.weight = res.weight || 0
    form.volume = res.volume || 0
    form.enableHideStock = res.enableHideStock || false
    form.enableVipDiscount = res.enableVipDiscount || false
    form.unit = res.unit || ''
    form.enablePurchaseLimit = res.enablePurchaseLimit || false
    form.purchaseLimit = res.purchaseLimit || 0
    form.purchaseMinQty = res.purchaseMinQty || 1
    form.stockDeductType = res.stockDeductType || GOODS_STOCK_DEDUCT_TYPE_ORDER
    form.deliveryTypes = res.deliveryTypes || [GOODS_DELIVERY_TYPE_EXPRESS]
    form.deliveryCostsType = res.deliveryCostsType || GOODS_DELIVERY_COSTS_TYPE_UNIFIED
    form.deliveryCosts = res.deliveryCosts || 0
    form.deliveryCostsTemplateId = res.deliveryCostsTemplateId || 0
    form.returnCostsType = res.returnCostsType || GOODS_RETURN_COSTS_TYPE_BUYER
    form.publishType = res.publishType || GOODS_PUBLISH_TYPE_DIRECT
    form.publishTime = res.publishTime || 0
    form.buyButtonNameType = res.buyButtonNameType || GOODS_BUY_BUTTON_TYPE_DEFAULT
    form.buyButtonName = res.buyButtonName || GOODS_DEFAULT_BUY_BUTTON_NAME
    form.detail = res.detail || ''
  })

function handleSaveDraft() {
  loading.value = true
  form.status = GOODS_STATUS_DRAFT

  updateGoods(Number(route.query.id), form)
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

  updateGoods(Number(route.query.id), form)
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
