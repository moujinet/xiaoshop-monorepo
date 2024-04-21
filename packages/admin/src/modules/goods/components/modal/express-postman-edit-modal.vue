<script lang="ts" setup>
import type { IExpressPostman } from '@/goods/types/express'

import {
  createExpressPostman,
  fetchExpressPostmanDetail,
  updateExpressPostman,
} from '@/goods/apis/express'

defineOptions({
  name: 'GoodsExpressPostmanEditModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IExpressPostman>>({
  name: '',
  phoneNumber: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入配送员姓名',
    },
  ],
}

const { loading, refreshData } = fetchExpressPostmanDetail(props.id || 0)

const { visible, handleModalOk } = useModal({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.phoneNumber = data.phoneNumber
          form.sort = data.sort
        })
    }

    form.name = ''
    form.phoneNumber = ''
    form.sort = 1

    refreshData()
  },
  onOkIfy: () => {
    return updateExpressPostman(props.id || 0, form)
  },
  onOkElse: () => {
    return createExpressPostman(form)
  },
  onAfterOk: () => {
    emit('success')
  },
})
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="isEdit ? '编辑配送员' : '新增配送员'"
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
        <a-form-item field="name" label="配送员" validate-trigger="blur" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入配送员" />
          </div>
        </a-form-item>

        <a-form-item field="phoneNumber" label="配送员手机" show-colon>
          <div class="form-item">
            <a-input v-model="form.phoneNumber" placeholder="请输入配送员手机" />
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
