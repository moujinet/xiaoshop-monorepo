<script lang="ts" setup>
import type { IAssetSnapshot } from '@/assets/types'
import { AssetsBrowser } from '@/assets/components'

defineOptions({
  name: 'AssetsSettingsUploadPage',
})

const fileList = ref<IAssetSnapshot[]>([])
const file = ref<IAssetSnapshot>()
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <AssetsBrowser v-model:file-list="fileList" type="image" :limit="5" />
      <AssetsBrowser v-model:file="file" type="image" :limit="1" />
    </CommonCard>
  </CommonContainer>
</template>
