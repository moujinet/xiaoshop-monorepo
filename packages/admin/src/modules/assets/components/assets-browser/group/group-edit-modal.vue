<script lang="ts" setup>
import {
  AssetType,
  Enabled,
  type IAssetGroup,
  type IAssetType,
} from '@xiaoshop/schema'
import {
  createAssetGroup,
  deleteAssetGroup,
  fetchAssetGroupDetail,
  fetchAssetGroupRoots,
  updateAssetGroup,
} from '@/assets/apis'

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
const form = reactive<IFormData<IAssetGroup>>({
  parentId: 0,
  name: '',
  type: props.type,
  enableCompress: Enabled.YES,
  enableThumbnail: Enabled.YES,
  enableWatermark: Enabled.YES,
})

const { loading, refreshData: refreshDetail } = fetchAssetGroupDetail(props.id || 0)
const { loading: rootsLoading, data: roots, refreshData } = fetchAssetGroupRoots(props.type)

const computedRoots = computed(() => {
  return (roots.value || []).filter(item => item.id !== props.id)
})

const { visible, handleModalOk } = useForm({
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
            form.enableCompress = res.enableCompress
            form.enableThumbnail = res.enableThumbnail
            form.enableWatermark = res.enableWatermark
          }
        })
    }

    form.parentId = 0
    form.name = ''

    refreshData()
  },
  onUpdate: () => {
    return updateAssetGroup(props.id || 0, form)
  },
  onCreate: () => {
    return createAssetGroup(form)
  },
  onDone: () => {
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
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        scroll-to-first-error
      >
        <a-form-item field="name" label="分组名称" show-colon>
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

        <template v-if="type === AssetType.IMAGE">
          <a-form-item field="enableCompress" label="启用图片压缩" show-colon>
            <a-switch v-model="form.enableCompress" :checked-value="Enabled.YES" :unchecked-value="Enabled.NO" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>

          <a-form-item field="enableThumbnail" label="启用图片缩略图" show-colon>
            <a-switch v-model="form.enableThumbnail" :checked-value="Enabled.YES" :unchecked-value="Enabled.NO" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>

          <a-form-item field="enableWatermark" label="启用水印" show-colon>
            <a-switch v-model="form.enableWatermark" :checked-value="Enabled.YES" :unchecked-value="Enabled.NO" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>
        </template>

        <a-alert v-if="isEdit" type="error" title="删除分组" :show-icon="false">
          <p>删除分组后，该分组下的所有资源都会被删除。</p>
          <div class="text-right">
            <CommonConfirm :loading="loading" btn-text="确认删除" btn-type="primary" @ok="handleDelete" />
          </div>
        </a-alert>
      </a-form>
    </template>
  </CommonModal>
</template>
