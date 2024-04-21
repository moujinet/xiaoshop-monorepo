<script lang="ts" setup>
import type { IGoods, IGoodsFormData } from '@/goods/types'

import {
  GOODS_BUY_BUTTON_TYPES,
  GOODS_BUY_BUTTON_TYPE_CUSTOM,
  GOODS_BUY_BUTTON_TYPE_DEFAULT,
  GOODS_DELIVERY_COSTS_TYPE_TEMPLATE,
  GOODS_DELIVERY_COSTS_TYPE_UNIFIED,
} from '@/goods/constants'

import {
  GoodsBrandSelector,
  GoodsDeliveryCostsTemplateSelector,
  GoodsDeliveryCostsTypeCheckbox,
  GoodsDeliveryTypesCheckbox,
  GoodsGroupSelector,
  GoodsGuaranteesCheckbox,
  GoodsServicesCheckbox,
  GoodsTagsSelector,
} from '@/goods/components'

import { batchSetupGoods } from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsBatchSetupModal',
})

const props = defineProps<{
  ids: IGoods['id'][]
}>()

const emit = defineEmits(['success'])

const visible = ref(false)
const loading = ref(false)
const selected = ref<string[]>([])

watch(visible, () => {
  selected.value = []
})

const settings = [
  { label: '商品标签', value: 'tag' },
  { label: '商品分组', value: 'group' },
  { label: '商品品牌', value: 'brand' },
  { label: '服务保障', value: 'guarantee' },
  { label: '附加服务', value: 'services' },
  { label: '配送方式', value: 'delivery' },
  { label: '商品限购', value: 'limit' },
  { label: '购买按钮', value: 'buyButton' },
]

const formData = reactive<Partial<IGoodsFormData>>({
  tagId: 0,
  groupId: 0,
  brandId: 0,
  guarantees: [],
  services: [],
  deliveryTypes: [],
  deliveryCostsTemplateId: 0,
  enablePurchaseLimit: false,
  purchaseLimit: 1,
  purchaseMinQty: 1,
  buyButtonNameType: GOODS_BUY_BUTTON_TYPE_DEFAULT,
  buyButtonName: '',
})

function handleSubmit(done: (closed: boolean) => void) {
  loading.value = true

  const form = {} as Partial<IGoodsFormData>

  selected.value.forEach((key) => {
    if (key === 'tag')
      form.tagId = formData.tagId
    if (key === 'group')
      form.groupId = formData.groupId
    if (key === 'brand')
      form.brandId = formData.brandId
    if (key === 'guarantee')
      form.guarantees = formData.guarantees
    if (key === 'services')
      form.services = formData.services
    if (key === 'delivery') {
      form.deliveryTypes = formData.deliveryTypes
      form.deliveryCostsTemplateId = formData.deliveryCostsTemplateId
    }
    if (key === 'limit') {
      form.enablePurchaseLimit = formData.enablePurchaseLimit
      form.purchaseLimit = formData.purchaseLimit
      form.purchaseMinQty = formData.purchaseMinQty
    }
    if (key === 'buyButton') {
      form.buyButtonNameType = formData.buyButtonNameType
      form.buyButtonName = formData.buyButtonName
    }
  })

  batchSetupGoods(props.ids, { ...removeEmpty(form) })
    .then(() => {
      useMessage({
        onClose: () => {
          visible.value = false
          done(true)
          emit('success')
        },
      }).success('成功批量设置商品')
    })
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :width="800"
    :disable-ok="selected.length === 0"
    title="批量商品设置"
    ok-text="修改"
    cancel-text="关闭"
    @before-ok="handleSubmit"
  >
    <slot />

    <template #modal>
      <a-spin :loading="loading" w-full>
        <div class="flex flex-gap-4 w-full">
          <div class="flex flex-col flex-gap-4 w-40 p4 rounded bg-$color-fill-1 select-none">
            <CommonGroupTitle title="设置项" />

            <a-checkbox-group v-model="selected" class="flex! flex-col flex-gap-4">
              <a-checkbox v-for="item in settings" :key="item.label" :value="item.value">
                {{ item.label }}
              </a-checkbox>
            </a-checkbox-group>
          </div>

          <div class="flex-auto min-h-xs">
            <div v-if="selected.length === 0" h-full>
              <a-alert type="info">
                请选择需要批量修改的设置项
              </a-alert>
            </div>

            <a-scrollbar v-else style="height:320px; overflow: auto;">
              <a-form :model="formData" p="3">
                <FormGroup v-if="selected.includes('tag')" title="商品标签" size="small">
                  <a-form-item field="tagId" label="商品标签" show-colon>
                    <GoodsTagsSelector v-model="formData.tagId" />
                  </a-form-item>
                </FormGroup>

                <FormGroup v-if="selected.includes('group')" title="商品分组" size="small">
                  <a-form-item field="groupId" label="商品分组" show-colon>
                    <GoodsGroupSelector v-model="formData.groupId" />
                  </a-form-item>
                </FormGroup>

                <FormGroup v-if="selected.includes('brand')" title="商品品牌" size="small">
                  <a-form-item field="brandId" label="商品品牌" show-colon>
                    <GoodsBrandSelector v-model="formData.brandId" />
                  </a-form-item>
                </FormGroup>

                <FormGroup v-if="selected.includes('guarantee')" title="服务保障">
                  <GoodsGuaranteesCheckbox v-model="formData.guarantees" />
                </FormGroup>

                <FormGroup v-if="selected.includes('services')" title="附加服务">
                  <GoodsServicesCheckbox v-model="formData.services" />
                </FormGroup>

                <FormGroup v-if="selected.includes('delivery')" title="配送方式">
                  <GoodsDeliveryTypesCheckbox v-model="formData.deliveryTypes" />

                  <CommonGroupTitle title="物流费用" class="my6" />
                  <GoodsDeliveryCostsTypeCheckbox v-model="formData.deliveryCostsType" direction="inline" />

                  <div class="mt-4 w-1/2">
                    <template v-if="formData.deliveryCostsType === GOODS_DELIVERY_COSTS_TYPE_UNIFIED">
                      <a-form-item field="deliveryCosts" label="统一运费" show-colon>
                        <FormNumberInput v-model="formData.deliveryCosts" placeholder="0.00">
                          <template #suffix>
                            元
                          </template>
                        </FormNumberInput>
                      </a-form-item>
                    </template>

                    <template v-if="formData.deliveryCostsType === GOODS_DELIVERY_COSTS_TYPE_TEMPLATE">
                      <a-form-item field="deliveryCostsTemplateId" label="运费模板" show-colon>
                        <GoodsDeliveryCostsTemplateSelector v-model="formData.deliveryCostsTemplateId" />
                      </a-form-item>
                    </template>
                  </div>
                </FormGroup>

                <FormGroup v-if="selected.includes('limit')" title="商品限购">
                  <a-form-item field="enablePurchaseLimit" label="商品限购" show-colon>
                    <a-switch v-model="formData.enablePurchaseLimit" checked-text="启用" unchecked-text="关闭" />
                  </a-form-item>

                  <a-form-item v-if="formData.enablePurchaseLimit" field="purchaseLimit" label="限购数量" show-colon>
                    <div class="form-item-xs">
                      <FormNumberInput v-model="formData.purchaseLimit">
                        <template #suffix>
                          件
                        </template>
                      </FormNumberInput>
                    </div>
                  </a-form-item>

                  <a-form-item field="purchaseMinQty" label="起售数量" show-colon>
                    <div class="form-item-xs">
                      <FormNumberInput v-model="formData.purchaseMinQty">
                        <template #suffix>
                          件
                        </template>
                      </FormNumberInput>
                    </div>
                  </a-form-item>
                </FormGroup>

                <FormGroup v-if="selected.includes('buyButton')" title="购买按钮">
                  <a-form-item field="buyButtonNameType" label="立即购买按钮" show-colon>
                    <a-radio-group v-model="formData.buyButtonNameType" direction="vertical" :options="GOODS_BUY_BUTTON_TYPES" />
                  </a-form-item>

                  <a-form-item v-if="formData.buyButtonNameType === GOODS_BUY_BUTTON_TYPE_CUSTOM" field="buyButtonName" label="自定义按钮名称" show-colon>
                    <div class="form-item-xs">
                      <a-input v-model="formData.buyButtonName" placeholder="请输入 6 个字以内的按钮名称" :max-length="6" />
                    </div>
                  </a-form-item>
                </FormGroup>
              </a-form>
            </a-scrollbar>
          </div>
        </div>
      </a-spin>
    </template>
  </CommonModal>
</template>
