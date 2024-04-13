<script lang="ts" setup>
import type { IAssetType } from '@/assets/types'
import { fetchAssetGroupTree } from '@/assets/apis/group'
import { AssetsBrowserGroupEditModal } from '@/assets/components'

defineOptions({
  name: 'AssetsBrowserGroups',
})

const props = defineProps<{
  type: IAssetType
  height: number
}>()

const currentGroupId = defineModel('currentGroup', {
  type: Array as PropType<number[]>,
  default: () => [0],
})

const currentGroupName = defineModel('currentGroupName', {
  type: String,
  default: '',
})

const { loading, data, refreshData } = fetchAssetGroupTree(props.type)

function refresh() {
  refreshData().then((res) => {
    if (res && res.length > 0) {
      currentGroupId.value = [res[0].id]
      currentGroupName.value = res[0].name
    }
  })
}

refresh()

watch(
  currentGroupId,
  () => {
    const nestGroupName = (groupId: number) => {
      let groupName = ''

      if (currentGroupId.value.length > 0) {
        data.value.forEach((group) => {
          if (group.id === groupId) {
            groupName = group.name
          }
          else {
            group.children?.forEach((child) => {
              if (child.id === groupId)
                groupName = `${group.name} / ${child.name}`
            })
          }
        })
      }

      return groupName
    }

    currentGroupName.value = nestGroupName(currentGroupId.value[0])
  },
)

defineExpose({
  refresh,
})
</script>

<template>
  <div class="assets-browser-groups">
    <AssetsBrowserGroupEditModal :type="type" @success="refresh">
      <a-button type="outline" long>
        创建分组
      </a-button>
    </AssetsBrowserGroupEditModal>

    <div flex="auto" class="w-full mt-4">
      <a-spin
        class="w-full"
        :loading="loading"
      >
        <a-scrollbar
          outer-class="assets-browser-groups__scrollbar"
          :style="{ height: `${height - 80}px`, overflow: 'auto' }"
        >
          <a-tree
            v-model:selected-keys="currentGroupId"
            :field-names="{ title: 'name', key: 'id' }"
            :data="data"
            block-node
            show-line
          >
            <template #switcher-icon="node, { isLeaf, selected }">
              <CommonIcon v-if="!isLeaf" name="ph:caret-down" />
              <CommonIcon v-if="isLeaf && selected" name="ph:folder-open" :active="selected" font="size-16px" />
              <CommonIcon v-if="isLeaf && !selected" name="ph:folder" font="size-16px" />
            </template>
          </a-tree>
        </a-scrollbar>
      </a-spin>
    </div>
  </div>
</template>

<style lang="less">
.assets-browser-groups {
  display: flex;
  flex-direction: column;

  &__scrollbar {
    .arco-scrollbar-track-direction-vertical {
      right: -15px;
    }
  }

  .arco-tree-node-selected {
    .common-icon {
      color: var(--theme-color);
    }
  }
}
</style>
