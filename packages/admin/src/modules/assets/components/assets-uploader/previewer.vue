<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import AssetsPreviewerImage from './previewer-image.vue'
import type { IAssetImagePreview } from '@/assets/apis/assets'

defineOptions({
  name: 'AssetsPreviewer',
})

const reUploadIndex = inject<Ref<number>>('assets.uploader.reUploadIndex', ref(-1))
const visible = inject<Ref<boolean>>('assets.uploader.browser.visible', ref(false))
const fileList = inject<Ref<IAssetImagePreview[]>>('assets.uploader.fileList', ref([]))

function handleReUpload(index: number) {
  reUploadIndex.value = index
  visible.value = true
}

function handleDelete(index: number) {
  fileList.value.splice(index, 1)
}
</script>

<template>
  <div class="assets-uploader-previewer">
    <VueDraggable
      v-if="fileList.length > 0"
      v-model="fileList"
      ghost-class="ghost"
      class="assets-uploader-previewer__list"
    >
      <AssetsPreviewerImage
        v-for="(file, i) in fileList"
        :key="file.id"
        :index="i"
        :src="file.path"
        @re-upload="handleReUpload"
        @delete="handleDelete"
      />
    </VueDraggable>

    <slot />
  </div>
</template>

<style lang="less">
.assets-uploader-previewer {
  display: flex;
  align-items: center;
  gap: 8px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
