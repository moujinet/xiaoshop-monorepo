<script lang="ts" setup>
import {
  AssetType,
  GOODS_BUY_BTN_TYPES,
  GOODS_FREIGHT_CHARGE_MODES,
  GOODS_PUBLISH_MODES,
  GOODS_RETURNS_FREIGHT_BYS,
  GoodsBuyBtnType,
  GoodsFreightChargeMode,
  GoodsPublishMode,
  GoodsReturnsFreightBy,
  GoodsType,
  type IGoodsBasicInfoFormData,
  LogisticsDeliveryMode,
} from '@xiaoshop/schema'
import { AssetsBrowser } from '@/assets/components'
import {
  GoodsAdditionCheckbox,
  GoodsAdditionModal,
  GoodsAttributesEditor,
  GoodsBrandModal,
  GoodsBrandSelector,
  GoodsCategorySelector,
  GoodsDeliveryModeCheckbox,
  GoodsGroupModal,
  GoodsGroupSelector,
  GoodsLogisticsTemplateModal,
  GoodsLogisticsTemplateSelector,
  GoodsProtectionCheckbox,
  GoodsProtectionModal,
  GoodsTagModal,
  GoodsTagSelector,
} from '@/goods/components'
import { fetchGoodsBasicInfo } from '@/goods/apis'

defineOptions({
  name: 'GoodsBasicInfoStepForm',
  inheritAttrs: false,
})

const props = defineProps<{
  id?: string
}>()

const formRef = ref()
const tagRef = ref()
const groupRef = ref()
const brandRef = ref()
const additionalRef = ref()
const protectionRef = ref()
const templateRef = ref()

const form = reactive<IGoodsBasicInfoFormData>({
  type: GoodsType.ENTITY,
  name: '',
  video: '',
  images: [],
  categoryIds: [],
  shareDesc: '',
  slogan: '',
  tagId: 0,
  groupId: 0,
  brandId: 0,
  protectionIds: [],
  additionIds: [],
  attributes: [],
  deliveryModes: [LogisticsDeliveryMode.EXPRESS],
  freight: 0,
  freightTemplateId: 0,
  freightChargeMode: GoodsFreightChargeMode.TEMPLATE,
  returnsFreightBy: GoodsReturnsFreightBy.SELLER,
  publishMode: GoodsPublishMode.STOCKED,
  autoInStockAt: '',
  buyBtnNameType: GoodsBuyBtnType.DEFAULT,
  buyBtnName: '',
})

const options = useSettings().getOptions('upload', {}, ['maxFileSizeImage', 'maxFileSizeVideo'])

const { refreshData } = fetchGoodsBasicInfo(props.id || '')

watch(
  () => props.id,
  () => {
    if (!props.id)
      return

    refreshData()
      .then((res) => {
        form.name = res.name
        form.video = res.video
        form.images = res.images
        form.categoryIds = res.categories.map(cate => cate.id)
        form.shareDesc = res.shareDesc
        form.slogan = res.slogan
        form.tagId = res.tag ? res.tag.id : 0
        form.groupId = res.group ? res.group.id : 0
        form.brandId = res.brand ? res.brand.id : 0
        form.additionIds = res.additions.map(addition => addition.id)
        form.protectionIds = res.protections.map(protection => protection.id)
        form.attributes = res.attributes
        form.deliveryModes = res.deliveryModes
        form.freight = res.freight
        form.freightTemplateId = res.freightTemplateId
        form.freightChargeMode = res.freightChargeMode
        form.returnsFreightBy = res.returnsFreightBy
        form.publishMode = res.publishMode
        form.autoInStockAt = res.autoInStockAt
        form.buyBtnNameType = res.buyBtnNameType
        form.buyBtnName = res.buyBtnName
      })
  },
  { immediate: true },
)

function getFormData() {
  return form
}

function validate() {
  return formRef.value.validate()
}

defineExpose({
  validate,
  getFormData,
})
</script>

<template>
  <a-form
    ref="formRef"
    :model="form"
    :label-col-props="{ flex: '140px' }"
    :wrapper-col-props="{ flex: 1 }"
    scroll-to-first-error
  >
    <!-- 基本信息 -->
    <FormGroup title="基本信息" size="medium">
      <a-form-item field="images" label="商品主图" :rules="[{ required: true, message: '请上传商品主图' }]" show-colon>
        <AssetsBrowser v-model:file-list="form.images" :limit="15" />

        <template #extra>
          <div>第一张图片将作为商品主图, 可拖拽图片调整顺序, 支持同时上传 15 张图片</div>
          <div>建议图片尺寸 800*800, 图片格式 jpg/png/gif, 大小不超过 {{ options.maxFileSizeImage / 1000 }} MB</div>
        </template>
      </a-form-item>

      <a-form-item field="video" label="商品视频" show-colon>
        <AssetsBrowser v-model:file="form.video" :type="AssetType.VIDEO" />

        <template #extra>
          <div>必须上传 .mp4 视频格式</div>
          <div>视频文件大小不能超过 {{ options.maxFileSizeVideo / 1000 }} MB</div>
        </template>
      </a-form-item>

      <a-form-item field="categoryIds" label="商品分类" :rules="[{ required: true, message: '请选择商品分类' }]" show-colon>
        <div class="form-item">
          <GoodsCategorySelector v-model="form.categoryIds" :max-tag-count="4" multiple />
        </div>
      </a-form-item>

      <a-form-item field="name" label="商品名称" :rules="[{ required: true, message: '请输入商品名称' }]" show-colon>
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
          <GoodsTagSelector ref="tagRef" v-model="form.tagId" />
        </div>

        <template #extra>
          <GoodsTagModal @success="() => tagRef.refresh()">
            <CommonLink type="primary">
              新建标签
            </CommonLink>
          </GoodsTagModal>
        </template>
      </a-form-item>

      <a-form-item field="groupId" label="商品分组" show-colon>
        <div class="form-item-sm">
          <GoodsGroupSelector ref="groupRef" v-model="form.groupId" />
        </div>

        <template #extra>
          <GoodsGroupModal @success="() => groupRef.refresh()">
            <CommonLink type="primary">
              新建分组
            </CommonLink>
          </GoodsGroupModal>
        </template>
      </a-form-item>

      <a-form-item field="brandId" label="商品品牌" show-colon>
        <div class="form-item-sm">
          <GoodsBrandSelector ref="brandRef" v-model="form.brandId" />
        </div>

        <template #extra>
          <GoodsBrandModal @success="() => brandRef.refresh()">
            <CommonLink type="primary">
              新建品牌
            </CommonLink>
          </GoodsBrandModal>
        </template>
      </a-form-item>

      <a-form-item field="additionIds" label="附加服务" show-colon>
        <GoodsAdditionCheckbox ref="additionalRef" v-model="form.additionIds" />

        <template #extra>
          <GoodsAdditionModal @success="() => additionalRef.refresh()">
            <CommonLink type="primary">
              新建附加服务
            </CommonLink>
          </GoodsAdditionModal>
        </template>
      </a-form-item>

      <a-form-item field="protectionIds" label="服务保障" show-colon>
        <GoodsProtectionCheckbox ref="protectionRef" v-model="form.protectionIds" />

        <template #extra>
          <GoodsProtectionModal @success="() => protectionRef.refresh()">
            <CommonLink type="primary">
              新建服务保障
            </CommonLink>
          </GoodsProtectionModal>
        </template>
      </a-form-item>
    </FormGroup>

    <!-- 商品参数 -->
    <GoodsAttributesEditor v-model:attributes="form.attributes" />

    <!-- 关联商品 -->
    <FormGroup title="关联商品" />

    <!-- 物流信息 -->
    <FormGroup title="物流信息">
      <a-form-item field="deliveryModes" label="配送方式" :rules="[{ required: true, message: '请选择配送方式' }]" show-colon>
        <GoodsDeliveryModeCheckbox v-model="form.deliveryModes" />
      </a-form-item>

      <a-form-item field="freightChargeMode" label="物流费用" show-colon>
        <a-radio-group v-model="form.freightChargeMode" direction="vertical" :options="GOODS_FREIGHT_CHARGE_MODES" />
      </a-form-item>

      <a-form-item
        v-if="form.freightChargeMode === GoodsFreightChargeMode.STD"
        field="freight"
        label="统一运费"
        show-colon
      >
        <div class="form-item-xs">
          <FormPriceInput v-model="form.freight" placeholder="0.00" />
        </div>
      </a-form-item>

      <a-form-item
        v-if="form.freightChargeMode === GoodsFreightChargeMode.TEMPLATE"
        field="freightTemplateId"
        label="运费模板"
        show-colon
      >
        <div class="form-item-sm">
          <GoodsLogisticsTemplateSelector ref="templateRef" v-model="form.freightTemplateId" />
        </div>

        <template #extra>
          <GoodsLogisticsTemplateModal @success="() => templateRef.refresh()">
            <CommonLink type="primary">
              「新建模板」
            </CommonLink>
          </GoodsLogisticsTemplateModal>
        </template>
      </a-form-item>

      <a-form-item v-if="form.freightChargeMode === GoodsFreightChargeMode.COD">
        <div class="form-item">
          <a-alert type="warning" title="提醒" closable>
            请谨慎选择, 「运费到付」会影响到买家付款时的运费, 这种情况下, 买家需要自行支付运费。
          </a-alert>
        </div>
      </a-form-item>

      <a-form-item field="returnsFreightBy" label="退货运费" show-colon>
        <a-radio-group v-model="form.returnsFreightBy" direction="vertical" :options="GOODS_RETURNS_FREIGHT_BYS" />

        <template #extra>
          设置「商家承担退货运费」后，买家在退货时不需要支付运费，运费由物流公司向商家收取。
        </template>
      </a-form-item>
    </FormGroup>

    <!-- 其他信息 -->
    <FormGroup title="其他信息">
      <a-form-item field="publishMode" label="上架方式" show-colon>
        <a-radio-group v-model="form.publishMode" direction="vertical" :options="GOODS_PUBLISH_MODES" />
      </a-form-item>

      <a-form-item v-if="form.publishMode === GoodsPublishMode.AUTO" field="autoInStockAt" label="定时上架" show-colon>
        <a-date-picker v-model="form.autoInStockAt" format="YYYY-MM-DD HH:mm" show-time />

        <template #extra>
          <p>启用定时上架后, 到达设定时间, 此商品将自动上架。</p>
        </template>
      </a-form-item>

      <a-form-item field="buyBtnNameType" label="立即购买按钮" show-colon>
        <a-radio-group v-model="form.buyBtnNameType" direction="vertical" :options="GOODS_BUY_BTN_TYPES" />
      </a-form-item>

      <a-form-item v-if="form.buyBtnNameType === GoodsBuyBtnType.CUSTOM" field="buyButtonName" label="自定义按钮名称" show-colon>
        <div class="form-item-sm">
          <a-input v-model="form.buyBtnName" placeholder="请输入 6 个字以内的按钮名称" :max-length="6" />
        </div>

        <template #extra>
          默认名称为「立即购买」，可自定义，如：「马上抢购」，此设置仅对当前商品有效。
        </template>
      </a-form-item>
    </FormGroup>
  </a-form>
</template>
