<script lang="ts" setup>
import type { IAssetType } from '@xiaoshop/schema'
import { useElementBounding } from '@vueuse/core'
import AssetsBrowserGroupTree from '../group/group-tree.vue'
import AssetsBrowserListview from '../listview/listview.vue'

defineOptions({
  name: 'AssetsBrowserLayoutPanel',
})

defineProps<{
  type: IAssetType
}>()

const groupRef = ref()
const currentGroupId = ref<number[]>([0])
const currentGroupName = ref<string>('')
const isGroupEmpty = ref(true)

const panelRef = ref()
const { height } = useElementBounding(panelRef)
</script>

<template>
  <div class="flex gap-4 max-h-full">
    <div class="w-50 h-full">
      <CommonPanel ref="panelRef" height="auto">
        <AssetsBrowserGroupTree
          ref="groupRef"
          v-model:current-group="currentGroupId"
          v-model:current-group-name="currentGroupName"
          :type="type"
          :height="height"
          @loaded="() => (isGroupEmpty = false)"
        />
      </CommonPanel>
    </div>

    <div class="flex-1">
      <CommonPanel :height="`${height}px`">
        <AssetsBrowserListview
          :group-id="currentGroupId[0]"
          :group-name="currentGroupName"
          :type="type"
          :height="height"
          :empty="isGroupEmpty"
          mode="edit"
          @group-name-changed="groupRef?.refresh()"
          @group-delete="groupRef?.refresh()"
        />
      </CommonPanel>
    </div>
  </div>
</template>
