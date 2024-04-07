<script lang="ts" setup>
import type { IAssetImagePreview } from '@/assets/apis/assets'

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
