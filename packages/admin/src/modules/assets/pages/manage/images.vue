<script lang="ts" setup>
import { AssetsBrowserPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageImagesPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserPanel type="image" />
  </CommonContainer>
</template>
