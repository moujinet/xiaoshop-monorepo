<script lang="ts" setup>
import { AssetTypeEnum } from '@xiaoshop/schema'
import { AssetsBrowserLayoutPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageVideosPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserLayoutPanel :type="AssetTypeEnum.VIDEO" />
  </CommonContainer>
</template>
