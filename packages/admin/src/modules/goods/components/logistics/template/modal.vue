<script lang="ts" setup>
import {
  Enabled,
  type ILogisticsFreightTemplate,
  LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES,
  LogisticsFreightTemplateCalcMode,
} from '@xiaoshop/schema'

import {
  GoodsLogisticsTemplateFreeRuleEditor,
  GoodsLogisticsTemplateNormalRuleEditor,
} from './editor'

import {
  createFreightTemplate,
  fetchFreightTemplateDetail,
  updateFreightTemplate,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsLogisticsTemplateModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<ILogisticsFreightTemplate>>({
  name: '',
  calcMode: LogisticsFreightTemplateCalcMode.WEIGHT,
  rules: [],
  enableFreeRules: Enabled.NO,
  freeRules: [],
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入模板名称',
    },
  ],
}

const { loading, refreshData } = fetchFreightTemplateDetail(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.calcMode = data.calcMode
          form.rules = data.rules
          form.enableFreeRules = data.enableFreeRules
          form.freeRules = data.freeRules
        })
    }

    form.name = ''
    form.calcMode = LogisticsFreightTemplateCalcMode.WEIGHT
    form.rules = []
    form.enableFreeRules = Enabled.NO
    form.freeRules = []
  },
  onUpdate: () => {
    return updateFreightTemplate(props.id || 0, form)
  },
  onCreate: () => {
    return createFreightTemplate(form)
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
    :title="isEdit ? '编辑运费模板' : '创建运费模板'"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    :width="900"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        auto-label-width
        scroll-to-first-error
      >
        <a-form-item field="name" label="模板名称" show-colon>
          <div class="form-item-sm">
            <a-input v-model="form.name" placeholder="请输入模板名称" />
          </div>
        </a-form-item>

        <a-form-item field="calcMode" label="计算方式" show-colon>
          <a-radio-group
            v-model="form.calcMode"
            :options="LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES"
          />
        </a-form-item>

        <a-form-item field="rules" label="配送地区" show-colon>
          <GoodsLogisticsTemplateNormalRuleEditor v-model="form.rules" :mode="form.calcMode" />
        </a-form-item>

        <a-form-item field="enableFreeRules" label="指定包邮" show-colon>
          <a-switch
            v-model="form.enableFreeRules"
            :checked-value="Enabled.YES"
            :unchecked-value="Enabled.NO"
          />
        </a-form-item>

        <a-form-item v-if="form.enableFreeRules === Enabled.YES" field="freeRules" label="包邮地区" show-colon>
          <GoodsLogisticsTemplateFreeRuleEditor v-model="form.freeRules" />
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
