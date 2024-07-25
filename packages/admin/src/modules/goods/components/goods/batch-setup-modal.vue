<script lang="ts" setup>
import {
  EnabledEnum,
  GOODS_BUY_BTN_TYPES,
  GOODS_LOGISTICS_FREIGHT_CHARGE_MODES,
  GoodsBuyBtnTypeEnum,
  GoodsLogisticsFreightChargeModeEnum,
  type IGoods,
  type IGoodsBatchUpdateFormData,
} from '@xiaoshop/schema'

import {
  GoodsAdditionalCheckbox,
  GoodsBrandSelector,
  GoodsDeliveryModeCheckbox,
  GoodsGroupSelector,
  GoodsLogisticsTemplateSelector,
  GoodsProtectionCheckbox,
  GoodsTagSelector,
} from '@/goods/components'

import { batchUpdate } from '@/goods/apis'

defineOptions({
  name: 'GoodsBatchSetupModal',
  inheritAttrs: false,
})

const props = defineProps<{
  ids: IGoods['id'][]
}>()

const emit = defineEmits(['success'])

const visible = ref(false)
const loading = ref(false)
const selected = ref<string[]>([])
const formData: Ref<IGoodsBatchUpdateFormData> = ref({})

const settings = [
  { label: '商品标签', value: 'tag' },
  { label: '商品分组', value: 'group' },
  { label: '商品品牌', value: 'brand' },
  { label: '服务保障', value: 'protections' },
  { label: '附加服务', value: 'additions' },
  { label: '配送方式', value: 'delivery' },
  { label: '商品限购', value: 'limit' },
  { label: '购买按钮', value: 'buyButton' },
]

watch(
  visible,
  () => {
    if (visible.value)
      selected.value = []
  },
  { immediate: true },
)

function handleSubmit(done: any) {
  loading.value = true

  batchUpdate(props.ids, formData.value).then(() => {
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
      <a-spin :loading="loading" class="w-full">
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
            <div v-if="selected.length === 0" class="h-full">
              <a-alert type="info">
                请选择需要批量修改的设置项
              </a-alert>
            </div>

            <a-scrollbar v-else style="height:320px; overflow: auto;">
              <a-form :model="formData" class="p-3">
                <FormGroup v-if="selected.includes('tag')" title="商品标签" size="small">
                  <a-form-item field="tagId" label="商品标签" show-colon>
                    <GoodsTagSelector v-model="formData.tagId" />
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

                <FormGroup v-if="selected.includes('protections')" title="服务保障">
                  <GoodsProtectionCheckbox v-model="formData.protectionIds" />
                </FormGroup>

                <FormGroup v-if="selected.includes('additions')" title="附加服务">
                  <GoodsAdditionalCheckbox v-model="formData.additionIds" />
                </FormGroup>

                <FormGroup v-if="selected.includes('delivery')" title="配送方式">
                  <GoodsDeliveryModeCheckbox v-model="formData.logisticsDeliveryModes" />

                  <CommonGroupTitle title="物流费用" class="my-6" />
                  <a-form-item field="logisticsFreightChargeMode" label="物流费用" show-colon>
                    <a-radio-group v-model="formData.logisticsFreightChargeMode" direction="vertical" :options="GOODS_LOGISTICS_FREIGHT_CHARGE_MODES" />
                  </a-form-item>

                  <div class="mt-4 w-1/2">
                    <template v-if="formData.logisticsFreightChargeMode === GoodsLogisticsFreightChargeModeEnum.COD">
                      <a-form-item field="logisticsFreight" label="统一运费" show-colon>
                        <FormNumberInput v-model="formData.logisticsFreight" placeholder="0.00">
                          <template #suffix>
                            元
                          </template>
                        </FormNumberInput>
                      </a-form-item>
                    </template>

                    <template v-if="formData.logisticsFreightChargeMode === GoodsLogisticsFreightChargeModeEnum.TEMPLATE">
                      <a-form-item field="logisticsFreightTemplateId" label="运费模板" show-colon>
                        <GoodsLogisticsTemplateSelector v-model="formData.logisticsFreightTemplateId" />
                      </a-form-item>
                    </template>
                  </div>
                </FormGroup>

                <FormGroup v-if="selected.includes('limit')" title="商品限购">
                  <a-form-item field="enablePurchaseLimits" label="商品限购" show-colon>
                    <a-switch v-model="formData.enablePurchaseLimits" checked-text="启用" unchecked-text="关闭" :checked-value="EnabledEnum.YES" :unchecked-value="EnabledEnum.NO" />
                  </a-form-item>

                  <a-form-item v-if="formData.enablePurchaseLimits === EnabledEnum.YES" field="purchaseLimit" label="限购数量" show-colon>
                    <div class="form-item-xs">
                      <FormNumberInput v-model="formData.purchaseMaxQty">
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
                  <a-form-item field="buyBtnNameType" label="立即购买按钮" show-colon>
                    <a-radio-group v-model="formData.buyBtnNameType" direction="vertical" :options="GOODS_BUY_BTN_TYPES" />
                  </a-form-item>

                  <a-form-item v-if="formData.buyBtnNameType === GoodsBuyBtnTypeEnum.CUSTOM" field="buyButtonName" label="自定义按钮名称" show-colon>
                    <div class="form-item-xs">
                      <a-input v-model="formData.buyBtnName" placeholder="请输入 6 个字以内的按钮名称" :max-length="6" />
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
