<script lang="ts" setup>
import { AssetTypeEnum, type IAssetType } from '@xiaoshop/schema'
import { DEFAULT_POSTER } from '~/constants/defaults'

defineOptions({
  name: 'AssetsBrowserPreviewer',
})

const props = defineProps<{
  asset: string
  type: IAssetType
  width?: string | number
  height?: string | number
  editable?: boolean
  simple?: boolean
}>()

const emit = defineEmits(['change', 'delete'])

const preview = ref(false)

const computedAsset = computed(() => {
  if (props.type === AssetTypeEnum.VIDEO)
    return DEFAULT_POSTER

  return props.asset
})
</script>

<template>
  <CommonImage
    :src="computedAsset"
    :width="width || height || '80px'"
    :height="height || width || '80px'"
    :preview-props="{
      actionsLayout: ['zoomIn', 'zoomOut', 'originalSize'],
    }"
    :preview-visible="preview"
    :is-local="type === AssetTypeEnum.VIDEO"
    class="assets-browser-image"
    fit="contain"
    show-loader
    @preview-visible-change="() => (preview = simple || editable ? false : !preview)"
  >
    <template v-if="editable" #extra>
      <a-tooltip content="预览" mini>
        <CommonIcon name="mingcute:eye-2" :inline="false" @click="preview = true" />
      </a-tooltip>
      <a-tooltip content="移除" mini>
        <CommonIcon name="mingcute:delete-2" :inline="false" @click="emit('delete', asset)" />
      </a-tooltip>
    </template>

    <template #loader>
      <div class="flex-(~ center) w-full h-full">
        <a-spin />
      </div>
    </template>
  </CommonImage>
</template>

<style lang="less">
.assets-browser-image {
  overflow: hidden;

  &.sortable-chosen {
    cursor: move;
    box-shadow: 0 0 1px 2px var(--theme-color);
  }

  &.is-ghost {
    box-shadow: 0 0 1px 2px var(--theme-color);

    img {
      opacity: 0.5;
    }
  }

  .arco-image-footer {
    transition: var(--page-transition);
    padding: 0;
    bottom: -30px;

    &-extra {
      width: 100%;
      padding: 5px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: rgb(0 0 0 / 45%);

      .common-icon {
        cursor: pointer;
        padding: 3px;
        border-radius: 50%;

        &:hover {
          background-color: rgb(0 0 0 / 85%);
        }
      }
    }
  }

  &:hover {
    .arco-image-footer {
      bottom: 0;
    }
  }
}
</style>
