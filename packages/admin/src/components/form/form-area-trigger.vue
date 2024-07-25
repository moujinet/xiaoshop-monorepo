<script lang="ts" setup>
import type { IAreaNested } from '@xiaoshop/schema'

defineOptions({
  name: 'FormAreaTrigger',
})

const props = defineProps<{
  banded?: string[]
}>()

const emit = defineEmits(['select'])

const visible = ref(false)
const loading = ref(true)
const { loadTree } = useAreas()
const options = ref<IAreaNested[]>([])
const model = ref<string[][]>([])

watch(
  visible,
  (val) => {
    if (val) {
      loadTree('city', props.banded)
        .then((res) => {
          options.value = res
        })
        .finally(() => {
          loading.value = false
        })
    }
  },
)

function filterSelected(areas: string[][]) {
  const result: string[] = []

  const normalized = (area: string[]) => {
    return area.join(',')
  }

  areas
    .sort((a, b) => a.length - b.length)
    .forEach((area) => {
      if (!result.includes(normalized(area)) && !result.some(res => normalized(area).startsWith(res)))
        result.push(normalized(area))
    })

  return result
}

function handleSelect() {
  emit('select', filterSelected(model.value))

  visible.value = false
  model.value = []
}
</script>

<template>
  <a-trigger v-model:popup-visible="visible" trigger="click" unmount-on-close auto-fit-position>
    <slot />

    <template #content>
      <div class="area-trigger flex-(~ col gap-4) border-(1 solid $color-border-1) p-4 bg-white rounded shadow">
        <a-cascader-panel
          v-model="model"
          :options="options"
          :field-names="{ label: 'name', value: 'code' }"
          :allow-search="false"
          :loading="loading"
          placeholder="请选择"
          multiple
          path-mode
          expand-child
          check-strictly
        />

        <a-button type="primary" @click="handleSelect">
          确定
        </a-button>
      </div>
    </template>
  </a-trigger>
</template>

<style lang="less">
.area-trigger {
  .arco-cascader-panel {
    border: 0;
    box-shadow: none;
  }
}
</style>
