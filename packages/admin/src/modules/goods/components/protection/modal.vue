<script lang="ts" setup>
import type { IGoodsProtection } from '@xiaoshop/schema'
import { AssetsBrowser } from '@/assets/components'

import {
  createGoodsProtection,
  fetchGoodsProtectionDetail,
  updateGoodsProtection,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsProtectionModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IGoodsProtection>>({
  name: '',
  desc: '',
  icon: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入服务保障名称',
    },
  ],
  icon: [
    {
      required: true,
      message: '请上传服务保障图标',
    },
  ],
}

const { loading, refreshData } = fetchGoodsProtectionDetail(props.id || 0)

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
          form.icon = data.icon
          form.sort = data.sort
        })
    }

    form.name = ''
    form.desc = ''
    form.icon = ''
    form.sort = 1
  },
  onUpdate: () => {
    return updateGoodsProtection(props.id || 0, form)
  },
  onCreate: () => {
    return createGoodsProtection(form)
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
    :title="isEdit ? '编辑服务保障' : '创建服务保障'"
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
        <a-form-item field="name" label="服务保障" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入服务保障" />
          </div>
        </a-form-item>

        <a-form-item field="icon" label="图标" show-colon>
          <AssetsBrowser v-model:file="form.icon" />
        </a-form-item>

        <a-form-item field="desc" label="描述" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.desc" placeholder="请输入服务描述" />
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
