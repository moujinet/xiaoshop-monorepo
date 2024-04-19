<script lang="ts" setup>
import { GOODS_TYPES } from '@/goods/constants'

defineOptions({
  name: 'GoodsTypeRadioCard',
})

const props = defineProps<{
  useRouter?: boolean
  mode?: 'create' | 'edit'
}>()

const modelValue = defineModel('value', {
  type: String,
  default: GOODS_TYPES[0].value,
})

const router = useRouter()

function handleChange(val: string) {
  props.useRouter && router.push({ path: `/goods/manage/list/${props.mode || 'create'}?type=${val}` })
}
</script>

<template>
  <FormRadioCard v-model="modelValue" :options="GOODS_TYPES" @change="handleChange" />
</template>
