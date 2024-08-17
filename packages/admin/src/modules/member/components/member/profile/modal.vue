<script lang="ts" setup>
import {
  type IMemberCardPlan,
  MEMBER_CARD_PLAN_TYPES,
  MEMBER_DEFAULT_PASSWORD,
} from '@xiaoshop/schema'

import {
  MemberCardSelector,
  MemberGenderSelector,
  MemberTagCheckbox,
} from '@/member/components'

import {
  createMember,
  fetchMemberCard,
} from '@/member/apis'

defineOptions({
  name: 'MemberProfileModal',
  inheritAttrs: false,
})

const emit = defineEmits(['success'])

const formRef = ref()
const loading = ref(false)
const bindCard = ref(false)
const setPoints = ref(false)
const setTags = ref(false)

const cardPlans = ref<IMemberCardPlan[]>([])

const form = reactive({
  username: '',
  nickname: '',
  mobile: '',
  password: '',
  tagIds: [],
  cardId: 0,
  cardPlanId: 0,
  points: 0,
  gender: 'unknown',
})

const rules: IFormRules = {
  username: [{ required: true, message: '请输入用户名' }],
}

const { visible, handleModalOk } = useForm({
  loading,
  form: formRef,
  onVisible: () => {
    form.username = ''
    form.nickname = ''
    form.mobile = ''
    form.password = ''
    form.cardId = 0
    form.cardPlanId = 0
    form.points = 0
    form.tagIds = []
    form.gender = 'unknown'

    setPoints.value = false
    setTags.value = false
    bindCard.value = false

    cardPlans.value = []
  },
  onCreate: () => {
    return createMember(form)
  },
  onDone: () => {
    emit('success')
  },
})

const { refreshData: loadCard } = fetchMemberCard(form.cardId)

watch(
  () => form.cardId,
  (cardId) => {
    if (cardId > 0) {
      loadCard({ id: cardId })
        .then((res) => {
          cardPlans.value = res.plans || []
        })
    }
  },
)
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    title="创建会员"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form ref="formRef" :model="form" :rules="rules" auto-label-width scroll-to-first-error>
        <a-form-item field="username" label="用户名" show-colon>
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>

        <a-form-item field="nickname" label="昵称" show-colon>
          <a-input v-model="form.nickname" placeholder="请输入昵称" />
        </a-form-item>

        <a-form-item field="mobile" label="手机号" show-colon>
          <a-input v-model="form.mobile" placeholder="请输入手机号" />
        </a-form-item>

        <a-form-item field="gender" label="性别" show-colon>
          <MemberGenderSelector v-model="form.gender" />
        </a-form-item>

        <a-form-item field="password" :tooltip="`留空则为默认密码 ${MEMBER_DEFAULT_PASSWORD}`" label="登录密码" show-colon>
          <a-input-password v-model="form.password" placeholder="请输入登录密码" :default-visibility="false" />
        </a-form-item>

        <a-form-item>
          <a-space size="large">
            <a-checkbox v-model="bindCard">
              设置等级
            </a-checkbox>

            <a-checkbox v-model="setTags">
              设置标签
            </a-checkbox>

            <a-checkbox v-model="setPoints">
              赠送积分
            </a-checkbox>
          </a-space>
        </a-form-item>

        <template v-if="bindCard">
          <a-form-item field="cardId" label="会员等级" show-colon>
            <MemberCardSelector v-model="form.cardId" />
          </a-form-item>

          <a-form-item v-if="cardPlans.length" field="cardPlanId" label="会员卡套餐" show-colon>
            <a-select v-model="form.cardPlanId" :fallback-option="false">
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
          </a-form-item>
        </template>

        <template v-if="setTags">
          <a-form-item field="tagIds" label="会员标签" show-colon>
            <MemberTagCheckbox v-model="form.tagIds" />
          </a-form-item>
        </template>

        <template v-if="setPoints">
          <a-form-item field="points" label="赠送积分" show-colon>
            <FormNumberInput v-model="form.points" placeholder="请输入赠送积分" />
          </a-form-item>
        </template>
      </a-form>
    </template>
  </CommonModal>
</template>
