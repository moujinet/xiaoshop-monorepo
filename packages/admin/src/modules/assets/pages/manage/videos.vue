<script lang="ts" setup>
import { AssetsBrowserPanel } from '@/assets/components'

defineOptions({
  name: 'AssetsManageVideosPage',
})
</script>

<template>
  <CommonContainer>
    <AssetsBrowserPanel type="video" />
  </CommonContainer>
</template>
