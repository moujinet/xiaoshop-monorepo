<script lang="ts" setup>
import type { IGoodsAttributeTemplate } from '@xiaoshop/schema'

import {
  createGoodsAttributeTemplate,
  fetchGoodsAttributeTemplateDetail,
  updateGoodsAttributeTemplate,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsAttributeTemplateModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IGoodsAttributeTemplate>>({
  name: '',
  desc: '',
  options: [],
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入参数模板名称',
    },
  ],
}

const { loading, refreshData } = fetchGoodsAttributeTemplateDetail(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.desc = data.desc
          form.options = data.options
        })
    }

    form.name = ''
    form.desc = ''
    form.options = []
  },
  onUpdate: () => {
    return updateGoodsAttributeTemplate(props.id || 0, form)
  },
  onCreate: () => {
    return createGoodsAttributeTemplate(form)
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
    :title="isEdit ? '编辑参数模板' : '创建参数模板'"
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
        <a-form-item field="name" label="模板名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入模板名称" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="模板说明" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.desc" placeholder="请输入模板说明" />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
