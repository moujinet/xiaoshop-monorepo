<script lang="ts" setup>
import {
  ASSET_TYPES,
  AssetType,
  type IAssetType,
  type IEnabled,
} from '@xiaoshop/schema'
import type { RequestOption, UploadRequest } from '@arco-design/web-vue'
import { uploadAsset } from '@/assets/apis'

defineOptions({
  name: 'AssetsBrowserUploadModal',
})

const props = defineProps<{
  groupId?: number
  type: IAssetType
  enableCompress?: IEnabled
  enableThumbnail?: IEnabled
  enableWatermark?: IEnabled
}>()

const emit = defineEmits(['success'])

const visible = defineModel(
  'visible',
  {
    type: Boolean,
    default: false,
  },
)

const uploadRef = ref()

const options = useSettings().getOptions(
  'upload',
  {},
  ['maxFileSizeImage', 'maxFileSizeVideo'],
)

const computedLabel = computed(() => {
  return `上传${ASSET_TYPES.find(item => item.value === props.type)?.label}` || ''
})

const computedAccept = computed(() => {
  return ASSET_TYPES.find(item => item.value === props.type)?.accept
})

const computedTips = computed(() => {
  if (props.type === AssetType.IMAGE) {
    return `支持批量上传图片, 最多上传 10 张图片, 单张图片不超过 ${options.maxFileSizeImage / 1000}M (支持格式: jpg/png/gif)`
  }

  return `视频文件不超过 ${options.maxFileSizeVideo / 1000}M (支持格式: mp4)`
})

function handleUploadRequest(options: RequestOption): UploadRequest {
  if (options.fileItem.file) {
    const abort = uploadAsset(options.fileItem.file, {
      type: props.type,
      groupId: props.groupId?.toString() || '',
      enableCompress: props.enableCompress,
      enableThumbnail: props.enableThumbnail,
      enableWatermark: props.enableWatermark,
    }, {
      onError: (err) => {
        options.onError(err)
      },
      onProgress: (progress, event) => {
        options.onProgress(progress, event)
      },
      onSuccess: (success) => {
        options.onSuccess(success)
        emit('success')
      },
    })

    return {
      abort,
    }
  }

  return {
  }
}

function handleUploadClick(e: MouseEvent) {
  e.stopPropagation()
  uploadRef.value.submit()
}

function handleClose() {
  visible.value = false
}
</script>

<template>
  <a-button type="primary" @click="visible = true">
    <template #icon>
      <CommonIcon name="mingcute:upload" />
    </template>
    {{ computedLabel }}
  </a-button>

  <a-modal
    v-model:visible="visible"
    :title="computedLabel"
    :footer="false"
    class="asset-upload"
    title-align="start"
    width="600px"
    simple
    unmount-on-close
  >
    <a-upload
      ref="uploadRef"
      :custom-request="handleUploadRequest"
      :auto-upload="false"
      :accept="computedAccept"
      :limit="10"
      multiple
      draggable
    >
      <template #upload-button>
        <div class="bg-$color-fill-2 hover:bg-$color-fill-1 leading-40 b-(1 dashed $color-fill-4) text-(center $color-text-1) rounded cursor-pointer">
          <div>
            拖拽至此区域 或
            <span class="text-primary">点击上传</span>
          </div>
        </div>

        <div class="flex-(~ between gap-6) mt-4">
          <div class="flex-(~ gap-1)" @click="(e) => e.stopPropagation()">
            <CommonIcon name="mingcute:information" color="blue" />
            <span class="ml-1 text-($color-text-3 12px)">
              {{ computedTips }}
            </span>
          </div>

          <div class="flex-(~ justify-end gap-2)" @click="(e) => e.stopPropagation()">
            <a-button @click="handleClose">
              关闭
            </a-button>

            <a-button type="primary" @click="handleUploadClick">
              开始上传
            </a-button>
          </div>
        </div>
      </template>
    </a-upload>
  </a-modal>
</template>

<style lang="less">
.asset-upload {
  user-select: none;

  .arco-upload {
    cursor: auto;
  }

  .arco-upload-list {
    .arco-upload-list-item-operation {
      width: 16px;
    }
  }
}
</style>
