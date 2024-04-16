<script lang="ts" setup>
import type { IGoodsSkuSpecs } from '@/goods/types'
import type { IAssetSnapshot } from '@/assets/types'
import { AssetsBrowser } from '@/assets/components'

defineOptions({
  name: 'GoodsSkuSpecsEditor',
})

const modelValue = defineModel<IGoodsSkuSpecs[]>('modelValue', {
  type: Array,
  default: () => [],
})

const images = ref<Array<IAssetSnapshot | undefined>>([])

watch(
  () => images.value,
  () => {
    if (
      modelValue.value
      && modelValue.value.length > 0
      && images.value
      && images.value.length > 0
    ) {
      modelValue.value[0].values.forEach((item, index) => {
        item.image = images.value[index]
      })
    }
  },
  { deep: true },
)

function handleInitImages(val: any) {
  if (!val) {
    modelValue.value[0].values.forEach((item) => {
      item.image = undefined
    })
    images.value = []
  }
  else {
    if (modelValue.value && modelValue.value.length > 0) {
      modelValue.value[0].values.forEach(() => {
        images.value.push(undefined)
      })
    }
  }
}

function handleAddSpec() {
  modelValue.value.push({
    name: '',
    enableImage: false,
    values: [],
  })
}

function handleAddSpecValue(index: number) {
  modelValue.value[index].values.push({
    name: '',
  })
}
</script>

<template>
  <div
    flex="~ col"
    border="~ solid $color-border-2"
    p="$page-padding-sm"
    gap="$page-padding-sm"
    w-full
    rounded
  >
    <div
      v-if="modelValue && modelValue.length > 0" flex="~ col"
      gap="$page-padding-sm"
    >
      <div
        v-for="(spec, index) in modelValue"
        :key="index"
        border-b="1 solid $color-border-2"
        w-full
      >
        <div flex="~ v-center between" gap-2 px="$page-padding-sm">
          <div flex="~ v-center auto" gap-2>
            <label flex="~ basis-5xl v-center" h-8>
              规格名:
            </label>

            <div w-150px>
              <a-input v-model="spec.name" placeholder="规格名" />
            </div>

            <a-checkbox v-if="index === 0" v-model="spec.enableImage" @change="handleInitImages">
              添加规格图片
            </a-checkbox>
          </div>
          <CommonDeleteBtn v-if="index > 0 || modelValue.length === 1" @delete="modelValue?.splice(index, 1)" />
        </div>

        <div flex="~" gap-2 p="$page-padding-sm">
          <label flex="~ basis-5xl v-center" h-8>
            规格值:
          </label>

          <div flex="~ 1" gap-2>
            <div v-if="spec.values && spec.values.length > 0" flex="~ v-center" gap-2>
              <template v-for="(val, i) in spec.values" :key="i">
                <div flex="~ col v-center" gap-2 w-80px>
                  <a-input v-model="val.name" placeholder="值" />
                  <AssetsBrowser v-if="spec.enableImage" v-model:file="images[i]" />
                  <CommonDeleteBtn @delete="spec.values?.splice(i, 1)" />
                </div>
              </template>
            </div>

            <div flex="~ v-center" h-8>
              <CommonLink type="primary" @click="handleAddSpecValue(index)">
                添加规格值
              </CommonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <a-button @click="handleAddSpec">
        添加规格项目
      </a-button>
    </div>
  </div>
</template>
