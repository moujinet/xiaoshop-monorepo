<script lang="ts" setup>
import { ASSET_TYPES, AssetType, type IAssetType } from '@xiaoshop/schema'
import AssetsBrowserGroupTree from '../group/group-tree.vue'
import AssetsBrowserListview from '../listview/listview.vue'

defineOptions({
  name: 'AssetsBrowserLayoutModal',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type?: IAssetType
  defaultSelected?: string[]
  limit?: number
  disable?: boolean
  width?: number
  height?: number
}>(), {
  type: AssetType.IMAGE,
  limit: 1,
  width: 800,
  height: 520,
})

const emit = defineEmits(['submit', 'close'])

const visible = defineModel('visible', {
  type: Boolean,
  default: false,
  required: false,
})

const typeName = ASSET_TYPES.find(item => item.value === props.type)?.label || ''

const selectedGroupId = ref<number[]>([0])
const selectedGroupName = ref<string>('')
const isGroupEmpty = ref(true)

const selected = ref<string[]>([])

watch(
  visible,
  () => {
    if (visible.value)
      selected.value = props.defaultSelected ? [...props.defaultSelected] : []
  },
  { immediate: true },
)

function handleSelect(selectedAssets: string[]) {
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
  emit('close')
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
          @loaded="() => (isGroupEmpty = false)"
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
          :empty="isGroupEmpty"
          mode="select"
          @select="handleSelect"
        />
      </div>
    </div>

    <template #footer>
      <div class="assets-browser-modal__footer">
        <span class="assets-browser-modal__footer--info">
          <template v-if="limit > 0">
            已选 <strong>{{ selected.length }}</strong> 项, 最多选择 <strong>{{ limit }}</strong> 项
          </template>
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
