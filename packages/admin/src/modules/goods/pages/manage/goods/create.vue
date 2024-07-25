<script lang="ts" setup>
import type { IGoodsBasicInfoFormData } from '@xiaoshop/schema'
import {
  GoodsFormStepEnum,
  type IGoodsFormStep,
  type IGoodsFormStepStep,
} from '@/goods/types'
import { GoodsStepCard } from '@/goods/components'
import { GoodsBasicInfoStepForm } from '@/goods/components/goods/step'
import { createBasicInfo } from '@/goods/apis'

defineOptions({
  name: 'GoodsManageGoodsCreatePage',
  inheritAttrs: false,
})

const basicForm = ref()

const steps: IGoodsFormStep[] = [
  { key: 'basic', name: '填写基本信息', step: GoodsFormStepEnum.BASIC },
  { key: 'stock', name: '填写价格库存', step: GoodsFormStepEnum.STOCK },
  { key: 'detail', name: '上传商品详情', step: GoodsFormStepEnum.DETAIL },
]

const route = useRoute()
const router = useRouter()

const step = ref<IGoodsFormStepStep>(
  route.query.step
    ? dict(steps, 'key', route.query.step as unknown as string)?.step
    : GoodsFormStepEnum.BASIC,
)

async function handleSubmit() {
  const errors = await basicForm.value?.validate()

  if (errors) {
    return
  }

  const data = basicForm.value?.getFormData() as IGoodsBasicInfoFormData

  createBasicInfo(data)
    .then((res) => {
      const message = useMessage({
        duration: 2000,
        onClose: () => {
          router.push({
            path: '/goods/manage/goods/update',
            query: { id: res.id, step: 'stock' },
          })
        },
      })

      if (res.id)
        message.success('商品创建成功，请填写商品库存信息')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <GoodsStepCard v-model:step="step" :steps="steps" hide-pager>
      <GoodsBasicInfoStepForm ref="basicForm" />

      <template #actions>
        <a-button type="primary" size="large" @click="handleSubmit">
          发布商品
        </a-button>
      </template>
    </GoodsStepCard>
  </CommonContainer>
</template>
