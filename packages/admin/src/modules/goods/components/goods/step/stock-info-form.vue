<script lang="ts" setup>
import {
  EnabledEnum,
  GOODS_STOCK_DEDUCT_MODES,
  GoodsStockDeductModeEnum,
  type IGoodsSku,
  type IGoodsSpec,
  type IGoodsStockInfoFormData,
} from '@xiaoshop/schema'
import {
  GoodsSkuEditor,
  GoodsSkuSpecsEditor,
} from '@/goods/components'
import {
  fetchGoodsSkuList,
  fetchGoodsSpecList,
  fetchGoodsStockInfo,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsStockInfoForm',
  inheritAttrs: false,
})

const props = defineProps<{
  id?: string
}>()

const loading = ref(false)
const formRef = ref()
const specs = ref<IGoodsSpec[]>([])
const skus = ref<IGoodsSku[]>([])
const stockInfo = reactive<IGoodsStockInfoFormData>({
  skuCode: '',
  price: 0,
  originalPrice: 0,
  costPrice: 0,
  stock: 0,
  alertStock: 0,
  weight: 0,
  volume: 0,
  unit: '件',
  enablePurchaseLimits: EnabledEnum.YES,
  purchaseMinQty: 1,
  purchaseMaxQty: 0,
  stockDeductMode: GoodsStockDeductModeEnum.ORDER,
  enableVipDiscount: EnabledEnum.YES,
})

const { refreshData: loadGoodsSpecs } = fetchGoodsSpecList(props.id || '')
const { refreshData: loadGoodsSkus } = fetchGoodsSkuList(props.id || '')
const { refreshData: loadGoodsStock } = fetchGoodsStockInfo(props.id || '')

watch(
  () => props.id,
  async () => {
    if (!props.id)
      return

    loading.value = true

    const result = await Promise.all([
      loadGoodsSpecs(),
      loadGoodsSkus(),
      loadGoodsStock(),
    ])

    if (result[0].length > 0) {
      specs.value = result[0]
    }

    if (result[1].length > 0) {
      skus.value = result[1]
    }

    if (result[2]) {
      stockInfo.skuCode = result[2].skuCode || ''
      stockInfo.price = result[2].price || 0
      stockInfo.originalPrice = result[2].originalPrice || 0
      stockInfo.costPrice = result[2].costPrice || 0
      stockInfo.stock = result[2].stock || 0
      stockInfo.alertStock = result[2].alertStock || 0
      stockInfo.weight = result[2].weight || 0
      stockInfo.volume = result[2].volume || 0
      stockInfo.unit = result[2].unit || '件'
      stockInfo.enablePurchaseLimits = result[2].enablePurchaseLimits || EnabledEnum.YES
      stockInfo.purchaseMinQty = result[2].purchaseMinQty || 1
      stockInfo.purchaseMaxQty = result[2].purchaseMaxQty || 0
      stockInfo.stockDeductMode = result[2].stockDeductMode || GoodsStockDeductModeEnum.ORDER
      stockInfo.enableVipDiscount = result[2].enableVipDiscount || EnabledEnum.YES
    }

    loading.value = false
  },
  { immediate: true },
)

function getFormData() {
  if (skus.value.length > 0) {
    stockInfo.price = skus.value.map((sku: any) => sku.price).reduce((acc: number, cur: number) => Math.min(acc, cur), skus.value[0].price)
    stockInfo.stock = skus.value.map((sku: any) => sku.stock).reduce((acc: number, cur: number) => acc + cur, 0)
  }

  return {
    stockInfo,
    specs,
    skus,
  }
}

function validate() {
  return formRef.value.validate()
}

defineExpose({
  getFormData,
  validate,
})
</script>

<template>
  <a-spin :loading="loading" class="w-full">
    <a-form
      ref="formRef"
      :model="stockInfo"
      :label-col-props="{ flex: '140px' }"
      :wrapper-col-props="{ flex: 1 }"
      scroll-to-first-error
    >
      <!-- 价格库存 -->
      <FormGroup title="价格库存">
        <a-form-item field="specs" label="商品规格" show-colon>
          <GoodsSkuSpecsEditor v-model="specs" />

          <template #extra>
            如：颜色、款式等多种规格，请添加商品规格。
          </template>
        </a-form-item>

        <a-form-item v-if="specs.length > 0" field="skus" label="规格明细" show-colon>
          <GoodsSkuEditor v-model="skus" :specs="specs" :unit="stockInfo.unit" />
        </a-form-item>

        <template v-else>
          <a-form-item field="skuCode" label="商品编码" show-colon>
            <div class="form-item-xs">
              <a-input v-model="stockInfo.skuCode" />
            </div>

            <template #extra>
              如果您不输入商品编码，系统会自动生成
            </template>
          </a-form-item>

          <a-form-item field="price" label="价格" show-colon>
            <div class="form-item-xs">
              <FormPriceInput v-model="stockInfo.price" placeholder="0.00" />
            </div>
          </a-form-item>

          <a-form-item field="originalPrice" label="划线价" show-colon>
            <div class="form-item-xs">
              <FormPriceInput v-model="stockInfo.originalPrice" placeholder="0.00" />
            </div>
          </a-form-item>

          <a-form-item field="costPrice" label="成本价" show-colon>
            <div class="form-item-xs">
              <FormPriceInput v-model="stockInfo.costPrice" placeholder="0.00" />
            </div>

            <template #extra>
              仅用于计算利润，不在客户端展示。
            </template>
          </a-form-item>

          <a-form-item field="stock" label="库存" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="stockInfo.stock">
                <template #suffix>
                  {{ stockInfo.unit }}
                </template>
              </FormNumberInput>
            </div>

            <template #extra>
              库存为 0 时，会放到「仓库」商品列表中，保存后买家看到的商品可售库存同步更新。
            </template>
          </a-form-item>

          <a-form-item field="alertStock" label="库存预警" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="stockInfo.alertStock">
                <template #suffix>
                  {{ stockInfo.unit }}
                </template>
              </FormNumberInput>
            </div>

            <template #extra>
              低于此库存量时，会接收到「库存预警通知」。
            </template>
          </a-form-item>

          <a-form-item field="weight" label="重量" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="stockInfo.weight">
                <template #suffix>
                  kg
                </template>
              </FormNumberInput>
            </div>
          </a-form-item>

          <a-form-item field="volume" label="体积" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="stockInfo.volume">
                <template #suffix>
                  m<sup>3</sup>
                </template>
              </FormNumberInput>
            </div>
          </a-form-item>
        </template>

        <a-form-item field="unit" label="商品单位" show-colon>
          <div class="form-item-xs">
            <a-input v-model="stockInfo.unit" />
          </div>
        </a-form-item>

        <a-form-item field="enablePurchaseLimits" label="商品限购" show-colon>
          <a-switch
            v-model="stockInfo.enablePurchaseLimits"
            checked-text="启用"
            unchecked-text="关闭"
            :checked-value="EnabledEnum.YES"
            :unchecked-value="EnabledEnum.NO"
          />
        </a-form-item>

        <a-form-item v-if="stockInfo.enablePurchaseLimits === EnabledEnum.YES" field="purchaseMaxQty" label="限购数量" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="stockInfo.purchaseMaxQty">
              <template #suffix>
                {{ stockInfo.unit || '件' }}
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item field="purchaseMinQty" label="起售数量" show-colon required>
          <div class="form-item-xs">
            <FormNumberInput v-model="stockInfo.purchaseMinQty">
              <template #suffix>
                {{ stockInfo.unit || '件' }}
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item field="stockDeductMode" label="库存扣减方式" show-colon required>
          <a-radio-group v-model="stockInfo.stockDeductMode" direction="vertical" :options="GOODS_STOCK_DEDUCT_MODES" />

          <template #extra>
            <span v-if="stockInfo.stockDeductMode === GoodsStockDeductModeEnum.ORDER">买家提交订单，扣减库存数量，可能存在恶意占用库存风险。</span>
            <span v-if="stockInfo.stockDeductMode === GoodsStockDeductModeEnum.PAID">买家支付成功，扣减库存数量，可能存在超卖风险。</span>
          </template>
        </a-form-item>

        <a-form-item field="enableVipDiscount" label="会员折扣" show-colon>
          <a-checkbox
            :default-checked="stockInfo.enableVipDiscount === EnabledEnum.YES"
            @change="(val) => (stockInfo.enableVipDiscount = val ? EnabledEnum.YES : EnabledEnum.NO)"
          >
            参与会员折扣
          </a-checkbox>

          <template #extra>
            <p>是否勾选不影响自定义会员价生效。</p>
          </template>
        </a-form-item>
      </FormGroup>
    </a-form>
  </a-spin>
</template>
