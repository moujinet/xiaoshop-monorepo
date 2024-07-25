<script lang="ts" setup>
import type { IGoodsDetailInfo } from '@xiaoshop/schema'
import { fetchGoodsContent } from '@/goods/apis'

defineOptions({
  name: 'GoodsDetailInfoForm',
  inheritAttrs: false,
})

const props = defineProps<{
  id?: string
}>()

const formRef = ref()
const form = reactive<IFormData<IGoodsDetailInfo>>({
  detail: '',
})

const { refreshData } = fetchGoodsContent(props.id || '')

watch(
  () => props.id,
  () => {
    if (!props.id)
      return

    refreshData()
      .then((res) => {
        form.detail = res.detail || ''
      })
  },
  { immediate: true },
)

function getFormData() {
  return form
}

function validate() {
  return formRef.value.validate()
}

defineExpose({
  getFormData,
  validate,
})
</script>

<template>
  <a-form
    ref="formRef"
    :model="form"
    :label-col-props="{ flex: '140px' }"
    :wrapper-col-props="{ flex: 1 }"
    scroll-to-first-error
  >
    <QuillEditor v-model="form.detail" />
  </a-form>
</template>
