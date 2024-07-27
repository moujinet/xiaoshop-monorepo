<script lang="ts" setup>
import { AssetType } from '@xiaoshop/schema'
import { AssetsBrowserLayoutPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageImagesPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserLayoutPanel :type="AssetType.IMAGE" />
  </CommonContainer>
</template>
