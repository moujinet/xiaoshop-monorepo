<script lang="ts" setup>
import type { IAssetImagePreview } from '@/assets/types'

defineOptions({
  name: 'AssetsBrowserImage',
})

defineProps<{
  asset: IAssetImagePreview
  width?: string
  height?: string
  editable?: boolean
}>()

const emit = defineEmits(['change', 'delete'])
const preview = ref(false)
</script>

<template>
  <a-image
    :src="asset.path"
    :width="width || '80px'"
    :height="height || '80px'"
    :preview-props="{
      actionsLayout: ['zoomIn', 'zoomOut', 'originalSize'],
    }"
    :preview-visible="preview"
    class="assets-browser-image"
    fit="contain"
    show-loader
    @preview-visible-change="() => (preview = editable ? false : !preview)"
  >
    <template v-if="editable" #extra>
      <a-tooltip content="预览" mini>
        <CommonIcon name="ph:eye" :inline="false" @click="preview = true" />
      </a-tooltip>
      <a-tooltip content="移除" mini>
        <CommonIcon name="ph:trash" :inline="false" @click="emit('delete', asset)" />
      </a-tooltip>
    </template>

    <template #loader>
      <div flex="~ center" w-full h-full>
        <a-spin />
      </div>
    </template>
  </a-image>
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
