<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'

defineOptions({
  name: 'CommonCopyable',
})

const props = defineProps<{
  text: string
}>()

const { copy, copied } = useClipboard({ source: props.text })

watch(
  copied,
  () => {
    if (copied.value)
      useMessage().success('已复制到剪贴板')
  },
)
</script>

<template>
  <span class="flex-(inline v-center) gap-1">
    {{ text }}
    <a-tooltip content="复制" mini>
      <CommonIcon
        name="mingcute:copy-2"
        class="text-$color-text-4 cursor-pointer"
        @click="copy(text)"
      />
    </a-tooltip>
  </span>
</template>
