<script lang="ts" setup>
import { GOODS_TYPES, GoodsType, type IGoodsType } from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsTypeRadio',
})

const props = defineProps<{
  useRouter?: boolean
  mode?: 'create' | 'edit'
}>()

const modelValue = defineModel('value', {
  type: String as PropType<IGoodsType>,
  default: GoodsType.ENTITY,
})

const route = useRoute()
const router = useRouter()

function handleChange(val: string) {
  if (props.useRouter)
    router.push({ query: { ...route.query, type: val } })
}
</script>

<template>
  <FormRadioCard
    v-model="modelValue"
    :options="GOODS_TYPES"
    @change="handleChange"
  />
</template>
