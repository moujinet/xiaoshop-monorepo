<script lang="ts" setup>
import Quill from 'quill'
import { watchOnce } from '@vueuse/core'
import { AssetTypeEnum } from '@xiaoshop/schema'
import AssetsBrowser from '@/assets/components/assets-browser'
import 'quill/dist/quill.snow.css'

defineOptions({
  name: 'QuillEditor',
  inheritAttrs: false,
})

const props = defineProps<{
  placeholder?: string
  toolbar?: 'default' | 'mini'
}>()

const content = defineModel('modelValue', {
  type: String,
  default: '',
})

const { getOptions } = useSettings()

const local = getOptions('upload', {}, ['customDomain'])
const storage = getOptions('upload.storage.aliyun', {}, ['enable', 'enableCustomDomain', 'customDomain'])

const customDomain = computed(() => {
  return `${(storage.enable && storage.enableCustomDomain
    ? storage.customDomain
    : local.customDomain).replace(/\/$/, '')}/`
})

const editorRef = ref()

let quill: Quill | null

onMounted(() => {
  initialize()
})

onBeforeUnmount(() => {
  quill = null
})

watchOnce(
  content,
  (newContent) => {
    if (!quill || !newContent)
      return

    setContent(newContent)
  },
)

function initialize() {
  quill = new Quill(editorRef.value, {
    theme: 'snow',
    modules: {
      history: {
        delay: 500,
        maxStack: 500,
        userOnly: true,
      },
      toolbar: '#quill-default-toolbar',
    },
    placeholder: props.placeholder || '',
  })

  quill.on('text-change', handleUpdateContent)
}

function setContent(html: string) {
  if (quill) {
    quill.root.innerHTML = html
  }
}

function handleUpdateContent() {
  content.value = quill?.getSemanticHTML() || ''
}

function handleSelectImages() {
  AssetsBrowser.openModal({
    type: AssetTypeEnum.IMAGE,
    limit: 20,
    onSelect: (images) => {
      const index = quill?.getSelection()?.index || 0

      images.forEach((image, i) => {
        quill?.insertEmbed(index + i, 'image', customDomain.value + image)
      })
    },
  })
}

function handleSelectVideos() {
  AssetsBrowser.openModal({
    type: AssetTypeEnum.VIDEO,
    limit: 1,
    onSelect: (videos) => {
      const index = quill?.getSelection()?.index || 0

      videos.forEach((video) => {
        quill?.insertEmbed(index, 'video', customDomain.value + video)
      })
    },
  })
}
</script>

<template>
  <div class="quill-editor">
    <div id="quill-default-toolbar">
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
        <button class="ql-clean" />
      </span>

      <span class="ql-formats">
        <button class="assets-image" @click="handleSelectImages">
          <CommonIcon name="mingcute:pic" :inline="false" duotone />
        </button>

        <button class="assets-video" @click="handleSelectVideos">
          <CommonIcon name="mingcute:video" :inline="false" duotone />
        </button>
      </span>
    </div>

    <div ref="editorRef" class="ql-snow" />
  </div>
</template>

<style lang="less">
.quill-editor {
  border: 1px solid var(--color-border-2);

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
