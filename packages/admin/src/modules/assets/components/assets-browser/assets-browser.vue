<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

import AssetsBrowserLayoutModal from './layout/layout-modal.vue'

import { ASSET_TYPES } from '~/constants'
import type { IAssetSnapshot, IAssetType } from '@/assets/types'
import { AssetsBrowserImage } from '@/assets/components'

defineOptions({
  name: 'AssetsBrowser',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type?: IAssetType
  limit?: number
  disable?: boolean
}>(), {
  type: 'image',
  limit: 1,
})

const file = defineModel<IAssetSnapshot | undefined>('file', {
  type: Object,
  default: undefined,
})

const fileList = defineModel<IAssetSnapshot[]>('fileList', {
  type: Array,
  default: () => [],
})

const triggerIcon = ASSET_TYPES.find(type => type.value === props.type)?.icon || ''

const computedFileList = computed(() => {
  return props.limit > 1
    ? unref(fileList)
    : (file.value !== undefined ? [unref(file)] : []) as IAssetSnapshot[]
})

const defaultSelected = ref<IAssetSnapshot[]>([])

function handleSubmit(assets: IAssetSnapshot[]) {
  if (props.limit === 1)
    file.value = assets[0]
  else
    fileList.value = [...assets]
}

function handleDelete(asset: IAssetSnapshot) {
  if (props.limit === 1)
    file.value = undefined
  else
    fileList.value.splice(fileList.value.indexOf(asset), 1)
}

watch(
  [file, fileList],
  () => {
    if (props.limit === 1)
      defaultSelected.value = file.value ? [file.value] : []
    else
      defaultSelected.value = [...fileList.value]
  },
  { deep: true },
)
</script>

<template>
  <div class="assets-browser">
    <VueDraggable
      v-if="limit > 1 && fileList.length > 0"
      v-model="fileList"
      class="assets-browser__preview"
      ghost-class="is-ghost"
    >
      <AssetsBrowserImage
        v-for="asset in computedFileList"
        :key="asset.id"
        :asset="asset"
        editable
        @delete="handleDelete"
      />
    </VueDraggable>

    <template v-else>
      <AssetsBrowserImage
        v-for="asset in computedFileList"
        :key="asset.id"
        :asset="asset"
        editable
        @delete="handleDelete"
      />
    </template>

    <AssetsBrowserLayoutModal
      v-if="computedFileList.length < limit"
      :type="type"
      :limit="limit"
      :disable="disable"
      :default-selected="defaultSelected"
      @submit="handleSubmit"
    >
      <div class="assets-browser__trigger" :class="{ 'is-disable': disable }">
        <CommonIcon :name="triggerIcon" />
      </div>
    </AssetsBrowserLayoutModal>
  </div>
</template>

<style lang="less">
.assets-browser {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &__preview {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    font-size: 20px;
    border-radius: var(--border-radius-small);
    color: var(--color-neutral-4);
    background: var(--color-fill-1);
    border: 1px dashed var(--color-border-2);
    cursor: pointer;

    &:not(.is-disable):hover {
      border-color: var(--color-border-3);
      background: var(--color-fill-2);
    }

    &:not(.is-disable):active {
      background: var(--color-fill-1);
      border-color: var(--color-border-2);
    }
  }
}
</style>
