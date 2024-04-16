<script lang="ts" setup>
import type { IGoodsService } from '@/goods/types'
import {
  createGoodsService,
  fetchGoodsServiceDetail,
  updateGoodsService,
} from '@/goods/apis/service'

defineOptions({
  name: 'GoodsServiceEditModal',
})

const props = defineProps<{
  id?: number
}>()

const emit = defineEmits(['success'])
const formRef = ref()
const isEdit = computed(() => !!props.id && props.id !== 0)
const form = reactive<IFormData<IGoodsService>>({
  name: '',
  price: 0,
  desc: '',
  sort: 1,
})
const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入服务名称',
    },
  ],
  price: [
    {
      message: '服务价格必须大于 0',
      type: 'number',
      min: 0,
    },
  ],
}

const { loading, refreshData } = fetchGoodsServiceDetail(props.id || 0)

const { visible, handleModalOk } = useModal({
  loading,
  status: isEdit,
  form: formRef,
  onVisible: () => {
    if (isEdit.value) {
      refreshData({ id: props.id })
        .then((data) => {
          form.name = data.name
          form.price = data.price
          form.desc = data.desc
          form.sort = data.sort
        })
    }

    form.name = ''
    form.price = 0
    form.desc = ''
    form.sort = 1

    refreshData()
  },
  onOkIfy: () => {
    return updateGoodsService(props.id || 0, form)
  },
  onOkElse: () => {
    return createGoodsService(form)
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
    :title="isEdit ? '编辑商品服务' : '创建商品服务'"
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
        <a-form-item field="name" label="服务名称" validate-trigger="blur" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入服务名称"
            />
          </div>
        </a-form-item>

        <a-form-item field="price" label="服务价格" validate-trigger="blur" show-colon>
          <div class="form-item">
            <FormPriceInput v-model="form.price" placeholder="请输入服务价格" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="描述" show-colon>
          <div class="form-item">
            <a-textarea
              v-model="form.desc"
              placeholder="请输入服务描述"
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
