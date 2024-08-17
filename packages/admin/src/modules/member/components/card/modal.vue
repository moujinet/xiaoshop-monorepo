<script lang="ts" setup>
import {
  Enabled,
  type IMemberCard,
  MemberCardType,
} from '@xiaoshop/schema'

import {
  MemberCardBadge,
  MemberCardPlanEditor,
} from '@/member/components'

import {
  createMemberCard,
  fetchMemberCard,
  updateMemberCard,
} from '@/member/apis'

defineOptions({
  name: 'MemberCardModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const formTab = ref('basic')
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<Partial<IMemberCard>>({})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入名称',
    },
  ],
}

const title = computed(() => {
  return form.type === MemberCardType.CUSTOM
    ? isEdit.value ? '编辑会员卡' : '创建会员卡'
    : '设置会员等级'
})

const label = computed(() => {
  return form.type === MemberCardType.CUSTOM
    ? '会员卡'
    : '等级'
})

const { loading, refreshData } = fetchMemberCard(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.type = data.type
          form.key = data.key
          form.name = data.name
          form.desc = data.desc
          form.badgeStyles = data.badgeStyles
          form.cardStyles = data.cardStyles
          form.plans = data.plans || []
          form.needExp = data.needExp
          form.isFreeShipping = data.isFreeShipping
          form.discount = data.discount
          form.pointsRatio = data.pointsRatio
        })
    }

    formTab.value = 'basic'

    form.key = ''
    form.name = ''
    form.type = MemberCardType.CUSTOM
    form.isEnabled = Enabled.YES
    form.desc = ''
    form.badgeStyles = { textColor: '#000', bgColor: '#fff', icon: '' }
    form.cardStyles = { textColor: '#000', bgColor: '#fff', bgImage: '', icon: '' }
    form.plans = []
    form.needExp = 0
    form.isFreeShipping = Enabled.NO
    form.discount = 0
    form.pointsRatio = 0
  },
  onCreate: () => {
    return createMemberCard(form)
  },
  onUpdate: () => {
    return updateMemberCard(props.id || 0, form)
  },
  onDone: () => {
    emit('success')
  },
})
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="title"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    ok-text="保存"
  >
    <slot />

    <template #actions>
      <a-tabs v-model:active-key="formTab" type="capsule" size="large" hide-content>
        <a-tab-pane key="basic" title="基本信息" />
        <a-tab-pane v-if="form.badgeStyles" key="badge" title="徽章样式" />
        <a-tab-pane v-if="form.cardStyles" key="styles" title="会员卡样式" />
        <a-tab-pane v-if="form.type === MemberCardType.CUSTOM" key="plans" title="有效期" />
        <a-tab-pane key="benefits" title="会员权益" />
      </a-tabs>
    </template>

    <template #modal>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        scroll-to-first-error
      >
        <FormGroup v-show="formTab === 'basic'" title="基本信息">
          <a-form-item field="name" :label="`${label}名称`" show-colon>
            <a-input v-model="form.name" :placeholder="`请输入${label}名称`" />
          </a-form-item>

          <a-form-item field="desc" :label="`${label}说明`" show-colon>
            <a-textarea v-model="form.desc" :placeholder="`请输入${label}说明`" auto-size />
          </a-form-item>

          <a-form-item v-if="form.type === MemberCardType.LEVEL" field="needExp" label="所需成长值" show-colon>
            <FormNumberInput v-model="form.needExp" placeholder="请输入所需成长值" :min="0" show-zero>
              <template #suffix>
                点
              </template>
            </FormNumberInput>
          </a-form-item>
        </FormGroup>

        <FormGroup v-if="form.cardStyles" v-show="formTab === 'styles'" title="会员卡样式">
          <a-form-item field="cardStyles" label="文字颜色" show-colon>
            <a-color-picker v-model="form.cardStyles.textColor" show-preset />
          </a-form-item>

          <a-form-item field="cardStyles" label="背景颜色" show-colon>
            <a-color-picker v-model="form.cardStyles.bgColor" show-preset />
          </a-form-item>
        </FormGroup>

        <FormGroup v-if="form.badgeStyles" v-show="formTab === 'badge'" title="徽章样式">
          <a-form-item field="badgeStyles" label="徽章预览" show-colon>
            <MemberCardBadge :card="form as IMemberCard" />
          </a-form-item>

          <a-form-item field="badgeStyles" label="文字颜色" show-colon>
            <a-color-picker v-model="form.badgeStyles.textColor" show-preset />
          </a-form-item>

          <a-form-item field="badgeStyles" label="背景颜色" show-colon>
            <a-color-picker v-model="form.badgeStyles.bgColor" show-preset />
          </a-form-item>
        </FormGroup>

        <FormGroup v-show="formTab === 'plans'" title="有效期设置">
          <MemberCardPlanEditor v-model="form.plans" />
        </FormGroup>

        <FormGroup v-show="formTab === 'benefits'" title="会员权益">
          <a-form-item field="isFreeShipping" label="全场包邮" show-colon>
            <a-switch
              v-model="form.isFreeShipping"
              checked-text="启用"
              unchecked-text="关闭"
              :checked-value="Enabled.YES"
              :unchecked-value="Enabled.NO"
            />
          </a-form-item>

          <a-form-item field="discount" label="专享折扣" show-colon>
            <FormNumberInput v-model="form.discount" placeholder="请输入专享折扣" :min="0" show-zero>
              <template #suffix>
                %
              </template>
            </FormNumberInput>
          </a-form-item>

          <a-form-item field="pointsRatio" label="获得积分倍率" show-colon>
            <FormNumberInput v-model="form.pointsRatio" placeholder="请输入获得积分倍率" :min="1" show-zero>
              <template #suffix>
                倍
              </template>
            </FormNumberInput>
          </a-form-item>
        </FormGroup>
      </a-form>
    </template>
  </CommonModal>
</template>
