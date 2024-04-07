<script lang="ts" setup>
import AssetsBrowser from './browser.vue'
import AssetsPreviewer from './previewer.vue'

import type { IAssetImagePreview, IAssetType } from '@/assets/types'

defineOptions({
  name: 'AssetsUploader',
})

const props = withDefaults(defineProps<{
  mode?: IAssetType
  limit?: number
}>(), {
  mode: 'image',
  limit: 1,
})

const visible = ref(false)

const options = reactive({
  label: '',
  accept: '',
  multiple: true,
})

if (props.mode === 'image') {
  options.label = '图片'
  options.accept = 'image/png,image/jpg,image/jpeg'
  options.multiple = true
}
else {
  options.label = '视频'
  options.accept = 'video/mp4'
  options.multiple = false
}

const fileList = defineModel<IAssetImagePreview[]>(
  'fileList',
  {
    type: Array,
    default: () => [],
  },
)

const reUploadIndex = ref<number>(-1)
const selected = ref<IAssetImagePreview[]>([])
const computedReSelect = computed(() => reUploadIndex.value > -1 ? 1 : 0)
const computedTotal = computed(() => [...fileList.value, ...selected.value].length - computedReSelect.value)

function handleClose() {
  selected.value = []
  visible.value = false
}

function handleOk() {
  if (reUploadIndex.value > -1)
    fileList.value.splice(reUploadIndex.value, 1, ...selected.value)
  else
    fileList.value = [...fileList.value, ...selected.value]

  selected.value = []
  reUploadIndex.value = -1
  visible.value = false
}

provide<number>('assets.uploader.limit', props.limit)
provide<Ref<boolean>>('assets.uploader.browser.visible', visible)
provide<Ref<IAssetImagePreview[]>>('assets.uploader.fileList', fileList)
provide<Ref<number>>('assets.uploader.reUploadIndex', reUploadIndex)
</script>

<template>
  <AssetsPreviewer>
    <template v-if="fileList.length < limit">
      <div class="assets-uploader-trigger" @click="visible = true">
        <CommonIcon name="ph:plus" />
      </div>
    </template>

    <a-modal
      v-model:visible="visible"
      :title="`选择${options.label}`"
      title-align="start"
      width="860px"
      body-class="assets-uploader-modal"
      unmount-on-close
      draggable
      @cancel="handleClose"
      @close="handleClose"
    >
      <AssetsBrowser v-model:selected="selected" :re-select="computedReSelect" :total="fileList.length" />

      <template #footer>
        <div class="assets-uploader-modal__footer">
          <span class="assets-uploader-modal__footer-info">已选 <strong>{{ computedTotal }}</strong> 项, 最多选择 <strong>{{ limit }}</strong> 项</span>

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
  </AssetsPreviewer>
</template>

<style lang="less">
.assets-uploader {
  &-trigger {
    cursor: pointer;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: var(--color-text-3);
    border: 1px dashed var(--color-border-2);

    &:hover {
      color: var(--color-text-2);
      border-color: var(--color-border-3);
      background-color: var(--color-fill-1);
    }

    &:active {
      color: var(--color-text-1);
      background-color: var(--color-fill-2);
    }
  }

  &-modal {
    padding: 0;

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;

      &-info {
        font-size: 12px;
        color: var(--color-text-3);

        strong {
          color: var(--theme-color);
          font-weight: 500;
        }
      }
    }
  }
}
</style>
