<script lang="ts" setup>
import {
  GoodsFormStepEnum,
  type IGoodsFormStep,
  type IGoodsFormStepStep,
} from '@/goods/types'
import {
  GoodsStepCard,
} from '@/goods/components'
import {
  GoodsBasicInfoStepForm,
  GoodsDetailInfoForm,
  GoodsInventoryInfoForm,
} from '@/goods/components/goods/step'
import {
  updateBasicInfo,
  updateDetailContent,
  updateGoodsSkus,
  updateGoodsSpecs,
  updateInventoryInfo,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageGoodsUpdatePage',
  inheritAttrs: false,
})

const steps: IGoodsFormStep[] = [
  { key: 'basic', name: '编辑基本信息', step: GoodsFormStepEnum.BASIC },
  { key: 'inventory', name: '编辑价格库存', step: GoodsFormStepEnum.INVENTORY },
  { key: 'detail', name: '编辑商品详情', step: GoodsFormStepEnum.DETAIL },
]

const route = useRoute()
const router = useRouter()

const id = computed(() => route.query.id as string)
const step = ref<IGoodsFormStepStep>(
  route.query.step
    ? dict(steps, 'key', route.query.step as string)?.step
    : GoodsFormStepEnum.BASIC,
)

watch(
  () => route.query.step,
  () => {
    const stepKey = dict(steps, 'key', route.query.step as string)?.step

    if (step.value !== stepKey) {
      step.value = stepKey
    }
  },
)

const basicForm = ref()
const detailForm = ref()
const inventoryForm = ref()

async function handleSubmit() {
  const errors = await Promise.all([
    basicForm.value?.validate(),
    detailForm.value?.validate(),
    inventoryForm.value?.validate(),
  ])

  if (errors.filter(err => err).length > 0) {
    return false
  }

  const message = useMessage({
    duration: 2000,
    onClose: () => {
      router.push({
        path: '/goods/manage/goods/update',
        query: { id: id.value, step: 'basic', refresh: Date.now() },
      })
    },
  })

  const basicInfo = basicForm.value?.getFormData()
  const detailInfo = detailForm.value?.getFormData()
  const {
    inventoryInfo,
    specs,
    skus,
  } = inventoryForm.value?.getFormData()

  Promise.all([
    updateInventoryInfo(id.value, inventoryInfo),
    updateDetailContent(id.value, detailInfo),
    updateBasicInfo(id.value, basicInfo),
  ]).then(([skuCode]) => {
    if (specs.value.length > 0) {
      updateGoodsSpecs(id.value, specs.value).then(() => {
        if (skus.value.length > 0) {
          updateGoodsSkus(id.value, skus.value, skuCode).then(() => {
            message.success('商品更新成功')
          })
        }
        else {
          message.success('商品更新成功')
        }
      })
    }
    else {
      message.success('商品更新成功')
    }
  })
}
</script>

<template>
  <CommonContainer back-to="/goods/manage/goods" flexible>
    <GoodsStepCard v-model:step="step" :steps="steps" changeable>
      <GoodsBasicInfoStepForm v-show="step === GoodsFormStepEnum.BASIC" :id="id" ref="basicForm" />
      <GoodsDetailInfoForm v-show="step === GoodsFormStepEnum.DETAIL" :id="id" ref="detailForm" />
      <GoodsInventoryInfoForm v-show="step === GoodsFormStepEnum.INVENTORY" :id="id" ref="inventoryForm" />

      <template #actions>
        <a-button type="primary" size="large" @click="handleSubmit">
          保存商品
        </a-button>
      </template>
    </GoodsStepCard>
  </CommonContainer>
</template>
