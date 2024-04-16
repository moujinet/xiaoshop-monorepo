<script lang="ts" setup>
import type { IGoodsAttributeTemplateAttribute } from '@/goods/types'
import { GOODS_ATTRIBUTE_TYPES, GOODS_ATTRIBUTE_TYPE_INPUT } from '@/goods/constants'
import { createGoodsAttribute, fetchGoodsAttributeDetail, updateGoodsAttribute } from '@/goods/apis/attribute'

defineOptions({
  name: 'GoodsAttributeEditModal',
})

const props = defineProps<{
  id?: number
  templateId?: number
}>()

const emit = defineEmits(['success'])
const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IGoodsAttributeTemplateAttribute>>({
  templateId: props.templateId || 0,
  name: '',
  type: GOODS_ATTRIBUTE_TYPE_INPUT,
  options: '',
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入参数名称',
    },
  ],
}

const attributes = ref<string[]>([''])

const { loading, refreshData } = fetchGoodsAttributeDetail(props.id || 0)

const { visible, handleModalOk } = useModal({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.templateId = data.templateId
          form.name = data.name
          form.type = data.type
          form.options = data.options

          attributes.value = data.options.split(',')
        })
    }

    form.templateId = props.templateId || 0
    form.name = ''
    form.type = GOODS_ATTRIBUTE_TYPE_INPUT
    form.options = ''

    refreshData()
  },
  onOkIfy: () => {
    if (attributes.value.length > 0)
      form.options = attributes.value.filter(a => a).join(',')

    return updateGoodsAttribute(props.id || 0, form)
  },
  onOkElse: () => {
    if (attributes.value.length > 0)
      form.options = attributes.value.filter(a => a).join(',')

    return createGoodsAttribute(form)
  },
  onAfterOk: () => {
    emit('success')
  },
})

function handleAddAttribute() {
  attributes.value.push('')
}

function handleRemoveAttribute(index: number) {
  attributes.value.splice(index, 1)
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="isEdit ? '编辑商品参数' : '添加商品参数'"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        scroll-to-first-error
      >
        <a-form-item field="name" label="参数名称" validate-trigger="blur" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入参数名称"
            />
          </div>
        </a-form-item>

        <a-form-item field="type" label="参数类型" show-colon>
          <div class="form-item">
            <a-radio-group v-model="form.type" type="button">
              <a-radio v-for="item in GOODS_ATTRIBUTE_TYPES" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </div>
        </a-form-item>

        <template v-if="form.type !== 'input'">
          <a-form-item field="attributes" label="参数项" show-colon>
            <a-space direction="vertical">
              <div
                v-for="(_, index) in attributes"
                :key="index"
                flex="~ v-center gap-2"
              >
                <a-input v-model="attributes[index]" placeholder="请输入参数项" class="flex-1" allow-clear />
                <a-button
                  v-if="index <= 0"
                  shape="square"
                  type="text"
                  @click="handleAddAttribute"
                >
                  <template #icon>
                    <CommonIcon name="ph:plus" />
                  </template>
                </a-button>
                <a-button
                  v-else
                  status="danger"
                  shape="square"
                  type="text"
                  @click="handleRemoveAttribute(index)"
                >
                  <template #icon>
                    <CommonIcon name="ph:trash" />
                  </template>
                </a-button>
              </div>
            </a-space>
          </a-form-item>
        </template>
      </a-form>
    </template>
  </CommonModal>
</template>
