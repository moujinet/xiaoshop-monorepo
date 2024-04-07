<script lang="ts" setup>
import { createAssetGroup, fetchAssetGroupRoots } from '@/assets/apis/group'

defineOptions({
  name: 'AssetsBrowserFolderEditModal',
})

const emit = defineEmits(['success'])
const visible = defineModel('visible', { type: Boolean, default: false })
const formRef = ref()
const loading = ref(false)
const rules = {
  name: {
    required: true,
    message: '请输入分组名称',
  },
}
const form = reactive({
  parentId: '',
  name: '',
})

const { loading: rootsLoading, data: roots, refreshData } = fetchAssetGroupRoots()

watch(
  visible,
  () => {
    if (visible.value) {
      form.parentId = ''
      form.name = ''

      refreshData()
    }
  },
)

async function handleFormSave() {
  loading.value = true

  if (await formRef.value?.validate()) {
    loading.value = false
    return false
  }

  await createAssetGroup({
    ...form,
    parentId: Number(form.parentId),
  })
  AMessage.success({
    content: '创建成功',
  })
  loading.value = false
  emit('success')

  return true
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :on-before-ok="handleFormSave"
    :disable-ok="loading"
    title="创建分组"
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
        <a-form-item field="parentId" label="所属分组" show-colon>
          <div class="form-item">
            <a-select
              v-model="form.parentId"
              :options="roots"
              :loading="rootsLoading"
              :field-names="{ label: 'name', value: 'id' }"
              placeholder="作为顶级分组"
            />
          </div>
        </a-form-item>

        <a-form-item field="name" label="分组名称" validate-trigger="blur" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入分组名称"
            />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
