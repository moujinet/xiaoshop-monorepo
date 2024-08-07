<script lang="ts" setup>
import type { IGoodsGroup } from '@xiaoshop/schema'

import {
  createGoodsGroup,
  fetchGoodsGroupDetail,
  updateGoodsGroup,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsGroupModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])

const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IGoodsGroup>>({
  name: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入分组名称',
    },
  ],
}

const { loading, refreshData } = fetchGoodsGroupDetail(props.id || 0)

const { visible, handleModalOk } = useForm({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.sort = data.sort
        })
    }

    form.name = ''
    form.sort = 1
  },
  onUpdate: () => {
    return updateGoodsGroup(props.id || 0, form)
  },
  onCreate: () => {
    return createGoodsGroup(form)
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
    :title="isEdit ? '编辑商品分组' : '创建商品分组'"
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
        <a-form-item field="name" label="分组名称" show-colon>
          <div class="form-item">
            <a-input v-model="form.name" placeholder="请输入分组名称" />
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
