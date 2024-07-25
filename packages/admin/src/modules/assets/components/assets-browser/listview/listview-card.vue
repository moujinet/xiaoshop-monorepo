<script lang="ts" setup>
import { ASSET_TYPES, AssetTypeEnum, type IAsset } from '@xiaoshop/schema'
import AssetsBrowserListviewDrawer from './listview-drawer.vue'

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
        <CommonIcon name="mingcute:check" class="text-3" :inline="false" />
      </div>

      <template v-if="asset.type === AssetTypeEnum.IMAGE || asset.type === AssetTypeEnum.ICON">
        <CommonImage
          :src="asset.path"
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
            <div class="flex-(~ center) w-full h-full">
              <a-spin />
            </div>
          </template>
        </CommonImage>
      </template>

      <template v-else>
        <CommonVideo :src="asset.path" :height="130" />
      </template>
    </div>

    <div class="flex-(~ col)">
      <a-typography-text class="py-2 mb-0!" :class="{ 'text-white!': selected }" ellipsis>
        {{ asset.name }}
      </a-typography-text>
      <div class="flex-(~ center between)">
        <span class="text-12px c-$color-text-4">
          {{ formatBytes(asset.size) }}
        </span>
        <AssetsBrowserListviewDrawer :id="asset.id" :title="`查看${computedAssetTypeName}详情`" @delete="emit('delete')">
          <a-tooltip :content="`查看${computedAssetTypeName}详情`" mini>
            <CommonLink v-if="editable" type="primary">
              <CommonIcon name="mingcute:information" class="text-16px" :inline="false" />
            </CommonLink>
          </a-tooltip>
        </AssetsBrowserListviewDrawer>
      </div>
    </div>
  </div>
</template>
