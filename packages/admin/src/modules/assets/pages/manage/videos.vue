<script lang="ts" setup>
import { AssetType } from '@xiaoshop/schema'
import { AssetsBrowserLayoutPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageVideosPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserLayoutPanel :type="AssetType.VIDEO" />
  </CommonContainer>
</template>
