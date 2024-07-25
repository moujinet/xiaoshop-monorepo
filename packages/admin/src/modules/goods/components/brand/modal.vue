<script lang="ts" setup>
import type { IGoodsBrand } from '@xiaoshop/schema'
import { AssetsBrowser } from '@/assets/components'

import {
  createGoodsBrand,
  fetchGoodsBrandDetail,
  updateGoodsBrand,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsBrandModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IGoodsBrand>>({
  name: '',
  logo: '',
  desc: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入品牌名称',
    },
  ],
}

const { loading, refreshData } = fetchGoodsBrandDetail(props.id || 0)

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
          form.logo = data.logo
          form.sort = data.sort
        })
    }

    form.name = ''
    form.desc = ''
    form.logo = ''
    form.sort = 1
  },
  onUpdate: () => {
    return updateGoodsBrand(props.id || 0, form)
  },
  onCreate: () => {
    return createGoodsBrand(form)
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
    :title="isEdit ? '编辑商品品牌' : '创建商品品牌'"
    :on-before-ok="handleModalOk"
    :disable-ok="loading"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        ref="formRef"
        :rules="rules"
        :model="form"
        scroll-to-first-error
      >
        <a-form-item field="name" label="品牌名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入品牌名称" />
          </div>
        </a-form-item>

        <a-form-item field="logo" label="商品LOGO" show-colon>
          <div class="form-item">
            <AssetsBrowser v-model:file="form.logo" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="品牌介绍" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.desc" placeholder="请输入品牌介绍" />
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
