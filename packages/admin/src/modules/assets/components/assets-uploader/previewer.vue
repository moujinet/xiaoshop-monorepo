<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'
import AssetsPreviewerImage from './previewer-image.vue'

defineOptions({
  name: 'AssetsPreviewer',
})

const reUploadIndex = inject<Ref<number>>('assets.uploader.reUploadIndex', ref(-1))
const visible = inject<Ref<boolean>>('assets.uploader.browser.visible', ref(false))
const fileList = inject<Ref<string[]>>('assets.uploader.fileList', ref([]))
const limit = inject<number>('assets.uploader.limit', 1)

function moveImage(dragIndex: number, hoverIndex: number) {
  const item = fileList.value[dragIndex]
  fileList.value.splice(dragIndex, 1)
  fileList.value.splice(hoverIndex, 0, item)
}

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
      v-model="fileList"
      ghost-class="ghost"
      class="assets-uploader-previewer__list"
    >
      <AssetsPreviewerImage
        v-for="(file, i) in fileList"
        :key="file"
        :index="i"
        :src="file"
        :move-image="moveImage"
        @re-upload="handleReUpload"
        @delete="handleDelete"
      />
    </VueDraggable>

    <template v-if="fileList.length < limit">
      <slot />
    </template>
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
