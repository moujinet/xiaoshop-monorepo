<script lang="ts" setup>
import type { IStaffDepartment } from '@xiaoshop/schema'

import {
  createDepartment,
  fetchDepartmentDetail,
  fetchDepartmentRootList,
  updateDepartment,
} from '@/auth/apis'

defineOptions({
  name: 'DepartmentEditModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IStaffDepartment>>({
  parentId: 0,
  name: '',
  desc: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入部门名称',
    },
  ],
}

const { loading, refreshData: refreshDetail } = fetchDepartmentDetail(props.id || 0)
const { loading: rootsLoading, data: roots, refreshData } = fetchDepartmentRootList()

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshDetail({ id: props.id })
        .then((data) => {
          form.parentId = data.parentId
          form.name = data.name
          form.desc = data.desc
          form.sort = data.sort
        })
    }

    form.parentId = 0
    form.name = ''
    form.desc = ''
    form.sort = 1

    refreshData()
  },
  onUpdate: () => {
    return updateDepartment(props.id || 0, form)
  },
  onCreate: () => {
    return createDepartment(form)
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
    :title="isEdit ? '编辑部门' : '创建部门'"
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
        <a-form-item field="parentId" label="上级部门" show-colon>
          <div class="form-item">
            <FormSelect
              v-model="form.parentId"
              :options="roots"
              :loading="rootsLoading"
              placeholder="请选择上级部门"
            />
          </div>
        </a-form-item>

        <a-form-item field="name" label="部门名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入部门名称" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="部门描述" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.desc" placeholder="请输入部门描述" />
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
