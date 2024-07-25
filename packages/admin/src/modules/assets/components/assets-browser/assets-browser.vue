<script lang="ts" setup>
import { ASSET_TYPES, AssetTypeEnum, type IAssetType } from '@xiaoshop/schema'
import { VueDraggable } from 'vue-draggable-plus'

import { AssetsBrowserPreviewer } from '@/assets/components'
import AssetsBrowserLayoutModal from '@/assets/components/assets-browser/layout/layout-modal.vue'

defineOptions({
  name: 'AssetsBrowser',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type?: IAssetType
  limit?: number
  disable?: boolean
}>(), {
  type: AssetTypeEnum.IMAGE,
  limit: 1,
})

const file = defineModel<string>('file', {
  type: String,
  default: '',
})

const fileList = defineModel<string[]>('fileList', {
  type: Array,
  default: () => [],
})

const triggerIcon = ASSET_TYPES.find(type => type.value === props.type)?.icon || ''

const computedFileList = computed(() => {
  return props.limit > 1
    ? unref(fileList)
    : (file.value !== '' ? [unref(file)] : []) as string[]
})

const defaultSelected = ref<string[]>([])

function handleSubmit(assets: string[]) {
  if (props.limit === 1)
    file.value = assets[0]
  else
    fileList.value = [...assets]
}

function handleDelete(asset: string) {
  if (props.limit === 1)
    file.value = ''
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
    <template v-if="limit > 1">
      <VueDraggable
        v-model="fileList"
        class="assets-browser__preview"
        ghost-class="is-ghost"
      >
        <AssetsBrowserPreviewer
          v-for="asset in computedFileList"
          :key="asset"
          :asset="asset"
          :type="type"
          editable
          @delete="handleDelete"
        />

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
      </VueDraggable>
    </template>

    <template v-else>
      <AssetsBrowserPreviewer
        v-for="asset in computedFileList"
        :key="asset"
        :asset="asset"
        :type="type"
        editable
        @delete="handleDelete"
      />

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
    </template>
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
