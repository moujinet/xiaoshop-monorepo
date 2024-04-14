<script lang="ts" setup>
import type { IAssetType } from '@/assets/types'
import {
  createAssetGroup,
  deleteAssetGroup,
  fetchAssetGroupDetail,
  fetchAssetGroupRoots,
  updateAssetGroup,
} from '@/assets/apis/group'

defineOptions({
  name: 'AssetsBrowserGroupEditModal',
})

const props = defineProps<{
  id?: number
  type: IAssetType
}>()

const emit = defineEmits(['success', 'delete'])
const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const rules = {
  name: {
    required: true,
    message: '请输入分组名称',
  },
}
const form = reactive({
  parentId: 0,
  name: '',
  type: props.type,
})

const { loading, refreshData: refreshDetail } = fetchAssetGroupDetail(props.id || 0)
const { loading: rootsLoading, data: roots, refreshData } = fetchAssetGroupRoots(props.type)

const computedRoots = computed(() => {
  return (roots.value || []).filter(item => item.id !== props.id)
})

const { visible, handleModalOk } = useModal({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshDetail({ id: props.id })
        .then((res) => {
          if (res) {
            form.parentId = res.parentId
            form.name = res.name
          }
        })
    }

    form.parentId = 0
    form.name = ''

    refreshData()
  },
  onOkIfy: () => {
    return updateAssetGroup(props.id || 0, form)
  },
  onOkElse: () => {
    return createAssetGroup(form)
  },
  onAfterOk: () => {
    emit('success')
  },
})

function handleDelete() {
  if (!props.id)
    return

  loading.value = true

  deleteAssetGroup(props.id || 0)
    .then(() => {
      useMessage({
        onClose: () => {
          emit('delete')
          visible.value = false
        },
      }).success('删除分组成功')
    })
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :disable-ok="form.name === ''"
    :title="isEdit ? '编辑分组' : '创建分组'"
    ok-text="保存"
    @before-ok="handleModalOk"
  >
    <slot />

    <template #modal>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        scroll-to-first-error
      >
        <a-form-item field="name" label="分组名称" validate-trigger="blur" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入分组名称"
            />
          </div>
        </a-form-item>

        <a-form-item field="parentId" label="所属分组" show-colon>
          <div class="form-item">
            <FormSelect
              v-model="form.parentId"
              :options="computedRoots"
              :loading="rootsLoading"
              placeholder="作为顶级分组"
            />
          </div>
        </a-form-item>

        <a-alert v-if="isEdit" type="error" title="删除分组" :show-icon="false">
          <p>删除分组后，该分组下的所有资源都会被删除。</p>
          <div class="text-right">
            <CommonDeleteBtn :loading="loading" btn-text="确认删除" btn-type="primary" @delete="handleDelete" />
          </div>
        </a-alert>
      </a-form>
    </template>
  </CommonModal>
</template>
