<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import AssetsBrowser from '@/assets/components/assets-browser'
import { ASSET_TYPE_IMAGE, ASSET_TYPE_VIDEO } from '@/assets/constants'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

defineOptions({
  name: 'RichTextEditor',
  inheritAttrs: false,
})

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const editorRef = ref()
const value = ref<string>('')
const options = {
  placeholder: '请输入内容',
  theme: 'snow',
}

function handleSelectImages() {
  AssetsBrowser.openModal({
    type: ASSET_TYPE_IMAGE,
    limit: 20,
    onSelect: (assets) => {
      const editor = editorRef.value?.getQuill()
      const index = editor.getSelection()?.index || 0

      assets.forEach((asset, i) => {
        editor.insertEmbed(index + i, 'image', asset.path)
      })
    },
  })
}

function handleSelectVideos() {
  AssetsBrowser.openModal({
    type: ASSET_TYPE_VIDEO,
    limit: 1,
    onSelect: (assets) => {
      const editor = editorRef.value?.getQuill()
      const index = editor.getSelection()?.index || 0

      assets.forEach((asset) => {
        editor.insertEmbed(index, 'video', asset.path)
      })
    },
  })
}

watch(
  value,
  () => {
    emit('update:modelValue', editorRef.value?.getHTML())
  },
)
</script>

<template>
  <div class="rich-text-editor">
    <QuillEditor
      ref="editorRef"
      v-model:content="value"
      :options="options"
      toolbar="#xs-toolbar"
    >
      <template #toolbar>
        <div id="xs-toolbar">
          <span class="ql-formats">
            <select class="ql-header">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option selected />
            </select>
          </span>

          <span class="ql-formats">
            <select class="ql-color" />
            <select class="ql-background" />
          </span>

          <span class="ql-formats">
            <button class="ql-bold" />
            <button class="ql-italic" />
            <button class="ql-underline" />
            <button class="ql-strike" />
          </span>

          <span class="ql-formats">
            <select class="ql-align" />
            <button class="ql-list" value="ordered" />
            <button class="ql-list" value="bullet" />
          </span>

          <span class="ql-formats">
            <button class="ql-blockquote" />
            <button class="ql-script" value="super" />
          </span>

          <span class="ql-formats">
            <button class="assets-image" @click="handleSelectImages">
              <CommonIcon name="ph:image" :inline="false" duotone />
            </button>

            <button class="assets-video" @click="handleSelectVideos">
              <CommonIcon name="ph:video-camera" :inline="false" duotone />
            </button>
          </span>
        </div>
      </template>
    </QuillEditor>
  </div>
</template>

<style lang="less">
.rich-text-editor {
  border: 1px solid var(--color-border-2);

  .assets-image,
  .assets-video {
    font-size: 16px;
  }

  .ql-formats {
    color: var(--color-text-2);
  }

  .ql-toolbar {
    border: 0;
    border-bottom: 1px solid var(--color-border-2);

    button.ql-active {
      color: var(--theme-color);
      background: rgb(var(--theme-color-rgb) 0.07);
    }
  }

  .ql-container {
    height: 500px;
    border: 0;
  }

  .ql-picker {
    color: var(--color-text-2);
  }

  .ql-stroke {
    stroke: var(--color-text-2);

    &.ql-fill {
      fill: var(--color-text-2);
    }
  }

  .ql-fill {
    fill: var(--color-text-2);
  }
}
</style>
