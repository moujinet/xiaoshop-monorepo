<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

defineOptions({
  name: 'FormRichTextEditor',
})

defineProps<{
  placeholder?: string
  toolbar?: 'essential' | 'minimal' | 'full' | 'none'
}>()

const modelValue = defineModel(
  'modelValue',
  {
    type: String,
    default: '',
  },
)
</script>

<template>
  <div class="form-rich-text-editor">
    <QuillEditor
      v-model:content="modelValue"
      :placeholder="placeholder"
      content-type="html"
      theme="snow"
      :toolbar="toolbar || 'essential'"
    />
  </div>
</template>

<style lang="less">
.form-rich-text-editor {
  width: 100%;

  .ql-toolbar {
    height: 42px;

    &.ql-snow {
      border-color: var(--color-border-2);
    }
  }

  .ql-container {
    height: 420px;

    &.ql-snow {
      border-color: var(--color-border-2);
    }
  }
}
</style>
