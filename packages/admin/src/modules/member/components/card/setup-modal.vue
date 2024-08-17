<script lang="ts" setup>
import {
  type IMember,
  type IMemberCardPlan,
  MEMBER_CARD_PLAN_TYPES,
} from '@xiaoshop/schema'

import {
  batchBindMemberCard,
  fetchMemberCard,
} from '@/member/apis'

import { MemberCardSelector } from '@/member/components'

defineOptions({
  name: 'MemberCardSetupModal',
})

const props = defineProps<{
  ids: IMember['id'][]
}>()
const emit = defineEmits(['success'])

const visible = ref(false)
const cardId = ref<number>(0)
const cardPlanId = ref<number>(0)
const cardPlans = ref<IMemberCardPlan[]>([])

function handleSubmit(done: any) {
  batchBindMemberCard(props.ids, cardId.value, cardPlanId.value)
    .then(() => {
      useMessage({
        onClose: () => {
          emit('success', cardId.value)
          done()
        },
      }).success('设置成功')
    })
}

const { refreshData: loadCard } = fetchMemberCard(cardId.value)

watch(
  cardId,
  (cardId) => {
    if (cardId > 0) {
      loadCard({ id: cardId })
        .then((res) => {
          cardPlans.value = res.plans || []
        })
    }
  },
)

watch(
  visible,
  () => {
    cardId.value = 0
    cardPlanId.value = 0
    cardPlans.value = []
  },
  { immediate: true },
)
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    title="设置会员等级"
    ok-text="设置"
    :disable-ok="cardId === 0"
    @before-ok="handleSubmit"
  >
    <span @click="visible = true">
      <slot />
    </span>

    <template #modal>
      <MemberCardSelector v-model="cardId" />

      <div v-if="cardPlans.length">
        <a-select v-model="cardPlanId" placeholder="请选择会员卡套餐" class="mt-4" :fallback-option="false">
          <a-option v-for="item in cardPlans" :key="item.id" :value="item.id" class="block!">
            <div class="flex-(~ v-center between) w-full">
              {{ MEMBER_CARD_PLAN_TYPES.find((v) => v.value === item.type)?.unit }}卡
              <span class="text-$color-text-3">
                {{ item.duration }} {{ MEMBER_CARD_PLAN_TYPES.find((v) => v.value === item.type)?.unit }}
                /
                {{ item.price }} 元
              </span>
            </div>
          </a-option>
        </a-select>
      </div>
    </template>
  </CommonModal>
</template>
