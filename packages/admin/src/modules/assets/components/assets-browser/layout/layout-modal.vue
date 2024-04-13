<script lang="ts" setup>
import AssetsBrowserGroupTree from '../group/group-tree.vue'
import AssetsBrowserListview from '../listview/listview.vue'

import { ASSET_TYPES } from '~/constants'
import type { IAssetSnapshot, IAssetType } from '@/assets/types'

defineOptions({
  name: 'AssetsBrowserLayoutModal',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type: IAssetType
  defaultSelected?: IAssetSnapshot[]
  limit?: number
  disable?: boolean
  width?: number
  height?: number
}>(), {
  limit: 1,
  width: 800,
  height: 520,
})

const emit = defineEmits(['submit'])

const visible = ref(false)
const typeName = ASSET_TYPES.find(item => item.value === props.type)?.label || ''

const selectedGroupId = ref<number[]>([0])
const selectedGroupName = ref<string>('')

const selected = ref<IAssetSnapshot[]>([])

watch(
  visible,
  () => {
    if (visible.value)
      selected.value = props.defaultSelected ? [...props.defaultSelected] : []
  },
)

function handleSelect(selectedAssets: IAssetSnapshot[]) {
  selected.value = [...selectedAssets]
}

function handleOk() {
  emit('submit', [...selected.value])
  visible.value = false
}

function handleClose() {
  if (!visible.value)
    return

  visible.value = false
}

function handleShow() {
  if (props.disable)
    return

  visible.value = true
}
</script>

<template>
  <span @click="handleShow">
    <slot />
  </span>

  <a-modal
    v-if="visible"
    v-model:visible="visible"
    :title="`选择${typeName}`"
    :width="width"
    title-align="start"
    body-class="assets-browser-modal"
    unmount-on-closes
    draggable
    @cancel="handleClose"
    @close="handleClose"
    @ok="handleOk"
  >
    <div class="assets-browser-modal__body">
      <div class="assets-browser-modal__body--groups">
        <AssetsBrowserGroupTree
          v-model:current-group="selectedGroupId"
          v-model:current-group-name="selectedGroupName"
          :type="type"
          :height="height"
        />
      </div>

      <div class="assets-browser-modal__body--listview">
        <AssetsBrowserListview
          :group-id="selectedGroupId[0]"
          :group-name="selectedGroupName"
          :default-selected="selected"
          :type="type"
          :height="height"
          :limit="limit"
          mode="select"
          @select="handleSelect"
        />
      </div>
    </div>

    <template #footer>
      <div class="assets-browser-modal__footer">
        <span class="assets-browser-modal__footer--info">
          已选 <strong>{{ selected.length }}</strong> 项, 最多选择 <strong>{{ limit }}</strong> 项
        </span>

        <a-space>
          <a-button @click="handleClose">
            取消
          </a-button>

          <a-button type="primary" @click="handleOk">
            确定
          </a-button>
        </a-space>
      </div>
    </template>
  </a-modal>
</template>

<style lang="less">
.assets-browser-modal {
  padding: 0;

  &__body {
    display: flex;

    &--groups,
    &--listview {
      padding: var(--page-padding-sm) var(--page-padding);
    }

    &--groups {
      flex: 0 0 200px;
      border-right: 1px solid var(--color-border-2);
    }

    &--listview {
      flex: 1;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--info {
      font-size: 12px;
      color: var(--color-text-3);

      strong {
        color: var(--theme-color);
        font-weight: 500;
      }
    }
  }
}
</style>
