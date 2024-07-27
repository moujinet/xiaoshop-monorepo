<script lang="ts" setup>
import { Enabled, type IGoodsSpec } from '@xiaoshop/schema'
import { AssetsBrowser } from '@/assets/components'

defineOptions({
  name: 'GoodsSkuSpecsEditor',
  inheritAttrs: false,
})

const specs = defineModel<IGoodsSpec[]>('modelValue', {
  type: Array,
  default: () => [],
})

function handleEnableImage(val: any) {
  specs.value[0].enableImage = val ? Enabled.YES : Enabled.NO

  if (!val) {
    specs.value[0].values.forEach((item) => {
      item.image = ''
    })
  }
}

function handleAddSpec() {
  specs.value.push({
    id: '',
    name: '',
    enableImage: Enabled.NO,
    values: [],
  })
}

function handleAddSpecValue(index: number) {
  specs.value[index].values.push({
    name: '',
    image: '',
  })
}
</script>

<template>
  <div class="flex-(~ col) b-(~ solid $color-border-2) p-$page-padding-sm gap-$page-padding-sm w-full rounded">
    <div v-if="specs && specs.length > 0" class="flex-(~ col) gap-$page-padding-sm">
      <div
        v-for="(spec, index) in specs"
        :key="index"
        class="w-full b-b-(1 solid $color-border-2)"
      >
        <div class="flex-(~ v-center between) gap-2 px-$page-padding-sm">
          <div class="flex-(~ v-center auto) gap-2">
            <label class="flex-(~ basis-5xl v-center) h-8">
              规格名:
            </label>

            <div class="w-150px">
              <a-input v-model="spec.name" placeholder="规格名" />
            </div>

            <a-checkbox v-if="index === 0" :default-checked="spec.enableImage === Enabled.YES" @change="handleEnableImage">
              添加规格图片
            </a-checkbox>
          </div>
          <CommonConfirm v-if="index > 0 || specs.length === 1" @ok="specs?.splice(index, 1)" />
        </div>

        <div class="flex-(~ gap-2) p-$page-padding-sm">
          <label class="flex-(~ basis-5xl v-center) h-8">
            规格值:
          </label>

          <div class="flex-(~ 1) gap-2">
            <div v-if="spec.values && spec.values.length > 0" class="flex-(~ v-center) gap-2">
              <template v-for="(val, i) in spec.values" :key="i">
                <div class="flex-(~ col v-center) gap-2 w-20">
                  <a-input v-model="val.name" placeholder="值" />
                  <AssetsBrowser v-if="spec.enableImage === Enabled.YES" v-model:file="val.image" />
                  <CommonConfirm btn-size="mini" @ok="spec.values?.splice(i, 1)" />
                </div>
              </template>
            </div>

            <div class="flex-(~ v-center) h-8">
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
