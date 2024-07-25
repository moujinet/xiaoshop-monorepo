<script lang="ts" setup>
import { DepartmentSelector } from '@/auth/components'

import {
  createPosition,
  fetchPositionDetail,
  updatePosition,
} from '@/auth/apis'

defineOptions({
  name: 'PositionEditModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive({
  departmentId: 0,
  name: '',
  desc: '',
  sort: 1,
})
const rules: IFormRules = {
  departmentId: [
    {
      required: true,
      message: '请选择所属部门',
    },
  ],
  name: [
    {
      required: true,
      message: '请输入职位名称',
    },
  ],
}

const { loading, refreshData } = fetchPositionDetail(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.departmentId = data.department.id
          form.name = data.name
          form.desc = data.desc
          form.sort = data.sort
        })
    }

    form.departmentId = 0
    form.name = ''
    form.desc = ''
    form.sort = 1
  },
  onUpdate: () => {
    return updatePosition(props.id || 0, form)
  },
  onCreate: () => {
    return createPosition(form)
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
    :title="isEdit ? '编辑职位' : '创建职位'"
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
        <a-form-item field="departmentId" label="所属部门" show-colon>
          <div class="form-item">
            <DepartmentSelector v-model="form.departmentId" placeholder="请选择所属部门" />
          </div>
        </a-form-item>

        <a-form-item field="name" label="职位名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入职位名称" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="职位描述" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.desc" placeholder="请输入职位描述" />
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
