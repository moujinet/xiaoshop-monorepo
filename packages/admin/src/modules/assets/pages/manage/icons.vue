<script lang="ts" setup>
import { AssetTypeEnum } from '@xiaoshop/schema'
import { AssetsBrowserLayoutPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageIconsPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserLayoutPanel :type="AssetTypeEnum.ICON" />
  </CommonContainer>
</template>
