<script lang="ts" setup>
import AssetsBrowserListviewDrawer from './listview-drawer.vue'

import type { IAsset } from '@/assets/types'
import { ASSET_TYPES } from '~/constants'

defineOptions({
  name: 'AssetsBrowserListviewCard',
})

const props = withDefaults(defineProps<{
  asset: IAsset
  selected?: boolean
  editable?: boolean
  selectable?: boolean
}>(), {
  selected: false,
})

const emit = defineEmits(['select', 'delete'])

const computedAssetTypeName = computed(() => {
  return ASSET_TYPES.find(item => item.value === props.asset.type)?.label
})

function handleSelect() {
  if (!props.editable && props.selectable)
    emit('select', props.asset, !props.selected)
}
</script>

<template>
  <div
    class="relative bg-$color-fill-1 hover:bg-$color-fill-3 p-2 rounded select-none"
    :class="{
      'bg-primary/90 hover:bg-primary': selected,
    }"
    @click="handleSelect"
  >
    <div>
      <div
        v-if="selected"
        class="absolute w-5 h-5 top-3 right-3 p-0.5 z-1 bg-primary c-white rounded-full flex flex-center"
      >
        <CommonIcon name="ph:check-bold" class="text-12px" :inline="false" />
      </div>

      <a-image
        :src="asset.path"
        :alt="asset.name"
        :preview="editable"
        :preview-props="{
          actionsLayout: ['zoomIn', 'zoomOut', 'originalSize'],
        }"
        :class="{
          'ring-1 ring-white/70': selected,
        }"
        fit="contain"
        class="min-h-100px"
        width="100%"
        height="100%"
        show-loader
      >
        <template #loader>
          <div flex="~ center" w-full h-full>
            <a-spin />
          </div>
        </template>
      </a-image>
    </div>

    <div flex="~ col">
      <a-typography-text class="py-2 mb-0!" :class="{ 'text-white!': selected }" ellipsis>
        {{ asset.name }}
      </a-typography-text>
      <div flex="~ v-center between">
        <span class="text-12px c-$color-text-4">
          {{ formatBytes(asset.size) }}
        </span>
        <AssetsBrowserListviewDrawer :title="`查看${computedAssetTypeName}详情`" :asset="asset" @delete="emit('delete')">
          <a-tooltip :content="`查看${computedAssetTypeName}详情`" mini>
            <CommonLink v-if="editable" type="primary">
              <CommonIcon name="ph:info" class="text-16px" :inline="false" />
            </CommonLink>
          </a-tooltip>
        </AssetsBrowserListviewDrawer>
      </div>
    </div>
  </div>
</template>
