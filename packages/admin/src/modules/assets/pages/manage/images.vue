<script lang="ts" setup>
import { AssetTypeEnum } from '@xiaoshop/schema'
import { AssetsBrowserLayoutPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageImagesPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserLayoutPanel :type="AssetTypeEnum.IMAGE" />
  </CommonContainer>
</template>
