<script lang="ts" setup>
import type { ILogisticsCompany } from '@xiaoshop/schema'

import {
  createLogisticsCompany,
  fetchLogisticsCompanyDetail,
  updateLogisticsCompany,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsLogisticsCompanyModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<ILogisticsCompany>>({
  name: '',
  desc: '',
  url: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入快递公司名称',
    },
  ],
}

const { loading, refreshData } = fetchLogisticsCompanyDetail(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.url = data.url
          form.desc = data.desc
          form.sort = data.sort
        })
    }

    form.name = ''
    form.url = ''
    form.desc = ''
    form.sort = 1
  },
  onUpdate: () => {
    return updateLogisticsCompany(props.id || 0, form)
  },
  onCreate: () => {
    return createLogisticsCompany(form)
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
    :title="isEdit ? '编辑快递公司' : '新增快递公司'"
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
        <a-form-item field="name" label="公司名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入快递公司名称" />
          </div>
        </a-form-item>

        <a-form-item field="url" label="公司网站" show-colon>
          <div class="form-item">
            <a-input v-model="form.url" placeholder="请输入公司网站" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="公司介绍" show-colon>
          <div class="form-item">
            <a-input v-model="form.desc" placeholder="请输入公司介绍" />
          </div>
        </a-form-item>

        <a-form-item field="sort" label="排序" show-colon>
          <div class="form-item-xs">
            <a-input-number v-model="form.sort" placeholder="请输入排序" />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
