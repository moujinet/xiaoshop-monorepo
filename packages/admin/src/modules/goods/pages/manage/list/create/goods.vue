<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'

import type { IGoodsFormData } from '@/goods/types'
import {
  AssetsBrowser,
} from '@/assets/components'

import {
  GoodsAttributesEditor,
  GoodsBrandEditModal,
  GoodsBrandSelector,
  GoodsCategorySelector,
  GoodsCreateNav,
  GoodsGroupEditModal,
  GoodsGroupSelector,
  GoodsGuaranteeEditModal,
  GoodsGuaranteesCheckbox,
  GoodsServiceEditModal,
  GoodsServicesCheckbox,
  GoodsSkuEditor,
  GoodsSkuSpecsEditor,
  GoodsTagEditModal,
  GoodsTagsSelector,
} from '@/goods/components'

import {
  GoodsFormSteps,
  GoodsFormSubmit,
} from '@/goods/components/goods-form'

import {
  GOODS_BUY_BUTTON_TYPES,
  GOODS_BUY_BUTTON_TYPE_CUSTOM,
  GOODS_BUY_BUTTON_TYPE_DEFAULT,
  GOODS_DEFAULT_BUY_BUTTON_NAME,
  GOODS_DELIVERY_COSTS_TYPES,
  GOODS_DELIVERY_COSTS_TYPE_COD,
  GOODS_DELIVERY_COSTS_TYPE_TEMPLATE,
  GOODS_DELIVERY_COSTS_TYPE_UNIFIED,
  GOODS_DELIVERY_TYPES,
  GOODS_DELIVERY_TYPE_EXPRESS,
  GOODS_PUBLISH_TYPES,
  GOODS_PUBLISH_TYPE_AUTO,
  GOODS_PUBLISH_TYPE_DIRECT,
  GOODS_RETURN_COSTS_TYPES,
  GOODS_RETURN_COSTS_TYPE_BUYER,
  GOODS_STATUS_DRAFT,
  GOODS_STATUS_IN_STOCK,
  GOODS_STOCK_DEDUCT_TYPES,
  GOODS_STOCK_DEDUCT_TYPE_ORDER,
  GOODS_STOCK_DEDUCT_TYPE_PAYMENT,
  GOODS_TYPE_GOODS,
} from '@/goods/constants'

import { createGoods } from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsManageListCreateGoodsPage',
})

const step = ref(1)
const loading = ref(false)
const { y } = useWindowScroll({ behavior: 'smooth' })

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

const enableMultipleSku = computed(() => form.skuSpecs.length > 0)

function handleSaveDraft() {
  loading.value = true
  form.status = GOODS_STATUS_DRAFT

  createGoods(form)
    .then(() => {
      step.value = 4
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
      step.value = 4
    })
    .finally(() => {
      loading.value = false
    })
}

function handlePrevStep() {
  step.value = step.value - 1
  y.value = 0
}

function handleNextStep() {
  step.value = step.value + 1
  y.value = 0
}
</script>

<template>
  <CommonContainer flexible>
    <FormCard :model="form" :loading="loading">
      <template #extra>
        <GoodsFormSteps v-model="step" />
      </template>

      <template #footer>
        <GoodsFormSubmit
          :step="step"
          @next="handleNextStep"
          @prev="handlePrevStep"
          @save-draft="handleSaveDraft"
          @publish="handlePublish"
        />
      </template>

      <template v-if="step === 1">
        <!-- 商品信息 -->
        <FormGroup title="商品类型">
          <GoodsCreateNav v-model="form.type" />
        </FormGroup>

        <!-- 基本信息 -->
        <FormGroup title="基本信息" size="medium">
          <a-form-item field="images" label="商品主图" show-colon required>
            <AssetsBrowser v-model:file-list="form.images" :limit="15" />

            <template #extra>
              <div>第一张图片将作为商品主图, 可拖拽图片调整顺序, 支持同时上传 15 张图片</div>
              <div>建议图片尺寸 800*800, 图片格式 jpg/png, 大小不超过 1MB</div>
            </template>
          </a-form-item>

          <a-form-item field="video" label="商品视频" show-colon required>
            <AssetsBrowser v-model:file="form.video" type="video" />

            <template #extra>
              <div>必须上传 .mp4 视频格式</div>
              <div>视频文件大小不能超过 500 MB</div>
            </template>
          </a-form-item>

          <a-form-item field="category" label="商品分类" show-colon>
            <div class="form-item">
              <GoodsCategorySelector v-model="form.categories" :max-tag-count="4" path-mode multiple />
            </div>
          </a-form-item>

          <a-form-item field="name" label="商品名称" show-colon required>
            <a-textarea v-model="form.name" placeholder="请输入 100 个字以内的商品名称" :max-length="100" show-word-limit />
          </a-form-item>

          <a-form-item field="shareDesc" label="分享描述" show-colon>
            <a-input v-model="form.shareDesc" placeholder="请输入 36 个字以内的分享描述" :max-length="36" show-word-limit />
            <template #extra>
              将在微信分享给好友时显示
            </template>
          </a-form-item>

          <a-form-item field="slogan" label="商品卖点" show-colon>
            <a-textarea v-model="form.slogan" placeholder="请输入 60 个字以内的商品卖点" :max-length="60" show-word-limit />
            <template #extra>
              将在商品详情页标题下方显示
            </template>
          </a-form-item>

          <a-form-item field="tagId" label="商品标签" show-colon>
            <div class="form-item-sm">
              <GoodsTagsSelector v-model="form.tagId" />
            </div>

            <template #extra>
              <GoodsTagEditModal>
                <CommonLink type="primary">
                  新建标签
                </CommonLink>
              </GoodsTagEditModal>
            </template>
          </a-form-item>

          <a-form-item field="groupId" label="商品分组" show-colon>
            <div class="form-item-sm">
              <GoodsGroupSelector v-model="form.groupId" />
            </div>

            <template #extra>
              <GoodsGroupEditModal>
                <CommonLink type="primary">
                  新建分组
                </CommonLink>
              </GoodsGroupEditModal>
            </template>
          </a-form-item>

          <a-form-item field="brandId" label="商品品牌" show-colon>
            <div class="form-item-sm">
              <GoodsBrandSelector v-model="form.brandId" />
            </div>

            <template #extra>
              <GoodsBrandEditModal>
                <CommonLink type="primary">
                  新建品牌
                </CommonLink>
              </GoodsBrandEditModal>
            </template>
          </a-form-item>

          <a-form-item field="services" label="附加服务" show-colon>
            <GoodsServicesCheckbox v-model="form.services" />

            <template #extra>
              <GoodsServiceEditModal>
                <CommonLink type="primary">
                  新建附加服务
                </CommonLink>
              </GoodsServiceEditModal>
            </template>
          </a-form-item>

          <a-form-item field="guarantees" label="服务保障" show-colon>
            <GoodsGuaranteesCheckbox v-model="form.guarantees" />

            <template #extra>
              <GoodsGuaranteeEditModal>
                <CommonLink type="primary">
                  新建服务保障
                </CommonLink>
              </GoodsGuaranteeEditModal>
            </template>
          </a-form-item>
        </FormGroup>

        <!-- 商品参数 -->
        <GoodsAttributesEditor
          v-model:template-id="form.attributeTemplateId"
          v-model:attributes="form.attributes"
        />

        <!-- 关联商品 -->
        <!-- <FormGroup title="关联商品" /> -->

        <!-- 物流信息 -->
        <FormGroup title="物流信息">
          <a-form-item field="deliveryTypes" label="配送方式" show-colon required>
            <a-checkbox-group v-model="form.deliveryTypes">
              <a-checkbox v-for="item in GOODS_DELIVERY_TYPES" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>

          <a-form-item field="deliveryCostsType" label="物流费用" show-colon>
            <a-radio-group v-model="form.deliveryCostsType" direction="vertical" :options="GOODS_DELIVERY_COSTS_TYPES" />
          </a-form-item>

          <a-form-item v-if="form.deliveryCostsType === GOODS_DELIVERY_COSTS_TYPE_UNIFIED" field="slogan" label="统一运费" show-colon required>
            <div class="form-item-xs">
              <a-input v-model="form.slogan" placeholder="0.00">
                <template #suffix>
                  元
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item v-if="form.deliveryCostsType === GOODS_DELIVERY_COSTS_TYPE_TEMPLATE" field="slogan" label="运费模板" show-colon required>
            <div class="form-item-sm">
              <a-select placeholder="请选择">
                <a-option>Brand</a-option>
              </a-select>
            </div>

            <template #extra>
              <CommonLink type="primary">
                「新建模板」
              </CommonLink>
            </template>
          </a-form-item>

          <a-form-item v-if="form.deliveryCostsType === GOODS_DELIVERY_COSTS_TYPE_COD">
            <div class="form-item">
              <a-alert type="warning" title="提醒" closable>
                请谨慎选择, 「运费到付」会影响到买家付款时的运费, 这种情况下, 买家需要自行支付运费。
              </a-alert>
            </div>
          </a-form-item>

          <a-form-item field="returnCostsType" label="退货运费" show-colon>
            <a-radio-group v-model="form.returnCostsType" direction="vertical" :options="GOODS_RETURN_COSTS_TYPES" />

            <template #extra>
              设置「商家承担退货运费」后，买家在退货时不需要支付运费，运费由物流公司向商家收取。
            </template>
          </a-form-item>
        </FormGroup>

        <!-- 其他信息 -->
        <FormGroup title="其他信息">
          <a-form-item field="publishType" label="上架方式" show-colon>
            <a-radio-group v-model="form.publishType" direction="vertical" :options="GOODS_PUBLISH_TYPES" />
          </a-form-item>

          <a-form-item v-if="form.publishType === GOODS_PUBLISH_TYPE_AUTO" field="publishType" label="定时上架" show-colon>
            <a-date-picker v-model="form.publishTime" format="YYYY-MM-DD HH:mm" show-time />

            <template #extra>
              <p>启用定时上架后, 到达设定时间, 此商品将自动上架。</p>
            </template>
          </a-form-item>

          <a-form-item field="buyButtonNameType" label="立即购买按钮" show-colon>
            <a-radio-group v-model="form.buyButtonNameType" direction="vertical" :options="GOODS_BUY_BUTTON_TYPES" />
          </a-form-item>

          <a-form-item v-if="form.buyButtonNameType === GOODS_BUY_BUTTON_TYPE_CUSTOM" field="buyButtonName" label="自定义按钮名称" show-colon>
            <div class="form-item-xs">
              <a-input v-model="form.buyButtonName" placeholder="请输入  6 个字以内的按钮名称" :max-length="6" />
            </div>

            <template #extra>
              默认名称为「立即购买」，可自定义，如：「马上抢购」，此设置仅对当前商品有效。
            </template>
          </a-form-item>
        </FormGroup>
      </template>

      <!-- 价格库存 -->
      <FormGroup v-if="step === 2" title="价格库存">
        <a-form-item field="slogan" label="商品规格" show-colon>
          <GoodsSkuSpecsEditor v-model="form.skuSpecs" />

          <template #extra>
            如：颜色、款式等多种规格，请添加商品规格。
          </template>
        </a-form-item>

        <a-form-item v-if="enableMultipleSku" field="slogan" label="规格明细" show-colon>
          <GoodsSkuEditor
            v-model="form.skus"
            v-model:sku-specs="form.skuSpecs"
          />
        </a-form-item>

        <template v-if="!enableMultipleSku">
          <a-form-item field="skuId" label="商品编码" show-colon>
            <div class="form-item-xs">
              <a-input v-model="form.skuId" />
            </div>

            <template #extra>
              如果您不输入商品编码，系统会自动生成
            </template>
          </a-form-item>

          <a-form-item field="price" label="价格" show-colon>
            <div class="form-item-xs">
              <FormPriceInput v-model="form.price" placeholder="0.00" />
            </div>
          </a-form-item>

          <a-form-item field="originalPrice" label="划线价" show-colon>
            <div class="form-item-xs">
              <FormPriceInput v-model="form.originalPrice" placeholder="0.00" />
            </div>
          </a-form-item>

          <a-form-item field="costPrice" label="成本价" show-colon>
            <div class="form-item-xs">
              <FormPriceInput v-model="form.costPrice" placeholder="0.00" />
            </div>

            <template #extra>
              仅用于计算利润，不在客户端展示。
            </template>
          </a-form-item>

          <a-form-item field="stock" label="库存" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="form.stock" />
            </div>

            <template #extra>
              库存为 0 时，会放到「仓库」商品列表中，保存后买家看到的商品可售库存同步更新。
            </template>
          </a-form-item>

          <a-form-item field="alarmStock" label="库存预警" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="form.alarmStock" />
            </div>

            <template #extra>
              低于此库存量时，会接收到「库存预警通知」。
            </template>
          </a-form-item>

          <a-form-item field="weight" label="重量" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="form.weight">
                <template #suffix>
                  kg
                </template>
              </FormNumberInput>
            </div>
          </a-form-item>

          <a-form-item field="volume" label="体积" show-colon>
            <div class="form-item-xs">
              <FormNumberInput v-model="form.volume">
                <template #suffix>
                  m<sup>3</sup>
                </template>
              </FormNumberInput>
            </div>
          </a-form-item>
        </template>

        <a-form-item field="stock" label="显示剩余库存" show-colon>
          <div class="form-item">
            <a-checkbox v-model="form.enableHideStock">
              商品详情页及购物车不显示剩余件数
            </a-checkbox>
          </div>
        </a-form-item>

        <a-form-item field="unit" label="商品单位" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.unit" />
          </div>
        </a-form-item>

        <a-form-item field="enablePurchaseLimit" label="商品限购" show-colon>
          <a-switch v-model="form.enablePurchaseLimit" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item v-if="form.enablePurchaseLimit" field="purchaseLimit" label="限购数量" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="form.purchaseLimit">
              <template #suffix>
                {{ form.unit || '件' }}
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item field="purchaseMinQty" label="起售数量" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="form.purchaseMinQty">
              <template #suffix>
                {{ form.unit || '件' }}
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item field="stockDeductType" label="库存扣减方式" show-colon required>
          <a-radio-group v-model="form.stockDeductType" direction="vertical" :options="GOODS_STOCK_DEDUCT_TYPES" />

          <template #extra>
            <span v-if="form.stockDeductType === GOODS_STOCK_DEDUCT_TYPE_ORDER">买家提交订单，扣减库存数量，可能存在恶意占用库存风险。</span>
            <span v-if="form.stockDeductType === GOODS_STOCK_DEDUCT_TYPE_PAYMENT">买家支付成功，扣减库存数量，可能存在超卖风险。</span>
          </template>
        </a-form-item>

        <a-form-item field="enableVipDiscount" label="会员折扣" show-colon>
          <a-checkbox v-model="form.enableVipDiscount">
            参与会员折扣
          </a-checkbox>

          <template #extra>
            <p>是否勾选不影响自定义会员价生效。</p>
            <CommonLink size="small" type="primary">
              管理权益卡
            </CommonLink>
          </template>
        </a-form-item>
      </FormGroup>

      <RichTextEditor v-show="step === 3" v-model="form.detail" />

      <template v-if="step === 4">
        <a-result :status="null" title="发布成功">
          <template #icon>
            <CommonIcon name="ph:check-circle-fill" :inline="false" class="text-size-16 text-emerald-500" />
          </template>

          <template #subtitle>
            <template v-if="form.status === GOODS_STATUS_DRAFT">
              商品已保存为草稿
            </template>

            <template v-else>
              商品已成功发布
            </template>
          </template>

          <template #extra>
            <a-space>
              <a-button @click="$router.push({ path: '/goods/manage/list' })">
                返回列表
              </a-button>
            </a-space>
          </template>
        </a-result>
      </template>
    </FormCard>
  </CommonContainer>
</template>
