<script lang="ts" setup>
import type { IMemberTag } from '@xiaoshop/schema'

import {
  createMemberTag,
  fetchMemberTag,
  updateMemberTag,
} from '@/member/apis'

defineOptions({
  name: 'MemberTagModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IMemberTag>>({
  name: '',
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入标签名称',
    },
  ],
}

const { loading, refreshData } = fetchMemberTag(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
        })
    }

    form.name = ''
  },
  onUpdate: () => {
    return updateMemberTag(props.id || 0, form)
  },
  onCreate: () => {
    return createMemberTag(form)
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
    :title="isEdit ? '编辑会员标签' : '创建会员标签'"
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
        <a-form-item field="name" label="标签名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入标签名称" />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
