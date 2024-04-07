<script lang="ts" setup>
import type { IAssetImagePreview } from '@/assets/types'

defineOptions({
  name: 'AssetImage',
})

defineProps<{
  image?: IAssetImagePreview
}>()
</script>

<template>
  <a-image :src="image?.path" />
</template>
