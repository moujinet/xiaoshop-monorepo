<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core'

import AssetsBrowserGroupTree from '../group/group-tree.vue'
import AssetsBrowserListview from '../listview/listview.vue'
import type { IAssetType } from '@/assets/types'

defineOptions({
  name: 'AssetsBrowserLayoutPanel',
})

defineProps<{
  type: IAssetType
}>()

const groupRef = ref()
const currentGroupId = ref<number[]>([0])
const currentGroupName = ref<string>('')

const panelRef = ref()
const { height } = useElementBounding(panelRef)
</script>

<template>
  <div flex="~" gap="4" max-h-full>
    <div class="w-50 h-full">
      <CommonPanel ref="panelRef" height="auto">
        <AssetsBrowserGroupTree
          ref="groupRef"
          v-model:current-group="currentGroupId"
          v-model:current-group-name="currentGroupName"
          :type="type"
          :height="height"
        />
      </CommonPanel>
    </div>

    <div flex="1">
      <CommonPanel :height="`${height}px`">
        <AssetsBrowserListview
          :group-id="currentGroupId[0]"
          :group-name="currentGroupName"
          :type="type"
          :height="height"
          mode="edit"
          @group-name-changed="groupRef?.refresh()"
          @group-delete="groupRef?.refresh()"
        />
      </CommonPanel>
    </div>
  </div>
</template>
