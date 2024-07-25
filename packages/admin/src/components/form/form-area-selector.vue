<script lang="ts" setup>
import type { IAreaNested } from '@xiaoshop/schema'

defineOptions({
  name: 'FormAreaSelector',
})

const props = withDefaults(defineProps<{
  mode?: 'all' | 'province' | 'city' | 'area'
}>(), {
  mode: 'area',
})

const loading = ref(true)
const data = ref<IAreaNested[]>([])
const { loadTree } = useAreas()

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
