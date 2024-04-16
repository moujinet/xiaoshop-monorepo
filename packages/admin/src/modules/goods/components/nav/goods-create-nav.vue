<script lang="ts" setup>
import { GOODS_TYPES } from '@/goods/constants'

defineOptions({
  name: 'GoodsCreateNav',
})

const props = defineProps<{
  useRouter?: boolean
}>()

const modelValue = defineModel('value', {
  type: String,
  default: GOODS_TYPES[0].value,
})

const router = useRouter()

function handleChange(val: string) {
  props.useRouter && router.push({ path: `/goods/manage/list/create/${val}` })
}
</script>

<template>
  <FormRadioCard v-model="modelValue" :options="GOODS_TYPES" @change="handleChange" />
</template>
