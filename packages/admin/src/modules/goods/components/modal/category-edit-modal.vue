<script lang="ts" setup>
import { createGoodsCategory, fetchGoodsCategoryDetail, fetchGoodsCategoryList, updateGoodsCategory } from '@/goods/apis/category'

defineOptions({
  name: 'GoodsCategoryEditModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])
const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive({
  parentId: 0,
  name: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入分类名称',
    },
  ],
}

const { loading: categoryLoading, data: categoryData, refreshData: fetchCategory } = fetchGoodsCategoryList(0)
const { loading, refreshData } = fetchGoodsCategoryDetail(props.id || 0)

const { visible, handleModalOk } = useModal({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    fetchCategory()

    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.parentId = data.parentId
          form.sort = data.sort
        })
    }

    form.name = ''
    form.parentId = 0
    form.sort = 1

    refreshData()
  },
  onOkIfy: () => {
    return updateGoodsCategory(props.id || 0, form)
  },
  onOkElse: () => {
    return createGoodsCategory(form)
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
    :title="isEdit ? '编辑商品分类' : '创建商品分类'"
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
        <a-form-item field="name" label="分类名称" validate-trigger="blur" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入分类名称"
            />
          </div>
        </a-form-item>

        <a-form-item field="parentId" label="所属分类" show-colon>
          <div class="form-item">
            <FormSelect
              v-model="form.parentId"
              :options="categoryData"
              :loading="categoryLoading"
              placeholder="请选择所属分类"
            />
          </div>
        </a-form-item>

        <a-form-item field="sort" label="排序" show-colon>
          <div class="form-item-xs">
            <a-input-number
              v-model="form.sort"
              placeholder="请输入排序"
            />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
