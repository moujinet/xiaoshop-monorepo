<script lang="ts" setup>
import type {
  ILocationCode,
  ILocationNested,
  ILocationPath,
} from '@xiaoshop/schema'

defineOptions({
  name: 'FormLocationSelector',
})

const props = withDefaults(defineProps<{
  mode?: 'all' | 'province' | 'city' | 'area'
}>(), {
  mode: 'area',
})

const modelValue = defineModel<ILocationPath>('modelValue', {
  type: Array as PropType<ILocationPath>,
  default: () => [],
})

const value = ref<ILocationCode[]>([])

const loading = ref(true)
const data = ref<ILocationNested[]>([])
const { loadTree, toPath } = useLocation()

watch(
  modelValue,
  (val) => {
    const codes = val.map(p => p.code)

    if (codes.toString() !== value.value.toString())
      value.value = codes
  },
  { immediate: true },
)

watch(
  value,
  (val) => {
    const path = toPath(val)

    if (path.map(p => p.code) !== modelValue.value.map(p => p.code))
      modelValue.value = path
  },
)

onBeforeMount(() => {
  setTimeout(() => {
    loadTree(props.mode)
      .then((res) => {
        data.value = res
      }).finally(() => {
        loading.value = false
      })
  }, 5)
})
</script>

<template>
  <a-cascader
    v-model="value"
    :loading="loading"
    :options="data"
    :field-names="{ label: 'name', value: 'code' }"
    :virtual-list-props="{ height: 200 }"
    :allow-search="false"
    :fallback="false"
    placeholder="请选择"
    path-mode
    allow-clear
    expand-child
  />
</template>
