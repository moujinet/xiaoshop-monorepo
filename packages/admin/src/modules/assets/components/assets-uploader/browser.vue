<script lang="ts" setup>
import AssetsBrowserFolderEditModal from './browser-folder-edit-modal.vue'
import type { IAsset, IAssetImagePreview } from '@/assets/apis/assets'

defineOptions({
  name: 'AssetsBrowser',
})

const props = withDefaults(defineProps<{
  reSelect?: number
  total?: number
  height?: string
}>(), {
  reSelect: 0,
  total: 0,
  height: '400px',
})

const currentFolder = ref(['0'])
const limit = inject<number>('assets.uploader.limit', 1)

const selected = defineModel<IAssetImagePreview[]>('selected', {
  type: Array,
  default: () => [],
})

const computedTotal = computed(() => selected.value.length + props.total)

const treeData = [
  {
    key: '0',
    title: '默认分组',
  },
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Leaf',
            key: '0-0-0-0',
          },
          {
            title: 'Leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
]

const fileList = [
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
  { name: 'album', path: 'https://place.dog/200/100' },
].map(item => ({
  ...item,
  id: Math.random(),
  type: 'image',
  path: `${item.path}?random=${Math.random()}`,
  size: Math.floor(Math.random() * 1000),
  createdTime: '2022-01-01 00:00:00',
})) as IAsset[]

function handleSelectFile(file: IAssetImagePreview) {
  if (
    selected.value.some(path => path.id !== file.id)
    && props.reSelect === 0
    && computedTotal.value >= limit
  )
    return

  if (
    selected.value.some(path => path.id !== file.id)
    && props.reSelect > 0
    && selected.value.length === props.reSelect
  )
    return

  if (selected.value.some(path => path.id === file.id))
    selected.value.splice(selected.value.findIndex(path => path.id === file.id), 1)
  else
    selected.value.push(file)
}
</script>

<template>
  <div class="assets-uploader-browser">
    <div class="assets-uploader-browser__folders">
      <div class="assets-uploader-browser__folders--actions">
        <AssetsBrowserFolderEditModal>
          <a-button type="outline" long>
            创建分组
          </a-button>
        </AssetsBrowserFolderEditModal>
      </div>

      <a-tree
        v-model:selected-keys="currentFolder"
        :data="treeData"
        :virtual-list-props="{
          height,
        }"
        class="assets-uploader-browser__folders--tree"
        size="mini"
        block-node
        show-line
      />
    </div>

    <div class="assets-uploader-browser__list">
      <div class="assets-uploader-browser__list--actions">
        <a-upload action="/">
          <template #upload-button>
            <a-button type="primary">
              上传
            </a-button>
          </template>
        </a-upload>

        <div>
          <a-input-search placeholder="搜索" />
        </div>
      </div>

      <a-scrollbar :style="{ height, overflow: 'auto' }">
        <div class="assets-uploader-browser__list--files">
          <div
            v-for="file in fileList"
            :key="file.id"
            class="assets-uploader-browser__file"
            :class="{
              'is-selected': selected.some(path => path.id === file.id),
            }"
            @click="handleSelectFile(file)"
          >
            <div class="assets-uploader-browser__file--cover">
              <div v-if="selected.some(path => path.id === file.id)" class="assets-uploader-browser__file--checker">
                <CommonIcon name="ph:check-bold" />
              </div>
              <a-image
                :src="file.path"
                :alt="file.name"
                fit="contain"
                width="100%"
                height="100%"
                :preview="false"
                show-loader
              >
                <template #loader>
                  <div flex="~ center" w-full h-full>
                    <a-spin />
                  </div>
                </template>
              </a-image>
            </div>
            <div class="assets-uploader-browser__file--info">
              {{ file.name }}
            </div>
          </div>
        </div>
      </a-scrollbar>

      <a-pagination :total="50" size="mini" simple />
    </div>
  </div>
</template>

<style lang="less">
.assets-uploader-browser {
  display: flex;

  &__folders,
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding: 12px 20px;
    user-select: none;
  }

  &__folders {
    flex: 0 0 200px;
    border-right: 1px solid var(--color-border-2);

    &--tree {
      .arco-tree-node-title.arco-tree-node-title-block {
        display: block;
      }
    }
  }

  &__list {
    flex: 1 1 auto;

    &--actions {
      display: flex;
      justify-content: space-between;
    }

    &--files {
      display: grid;
      grid-template-columns: repeat(auto-fill, 142px);
      gap: 12px;
    }
  }

  &__file {
    border-radius: 3px;
    border: 1px solid rgb(0 0 0 / 0%);

    &:hover {
      .assets-uploader-browser__file--cover {
        border: 1px solid var(--theme-color);
      }
    }

    &--cover {
      position: relative;
      width: 140px;
      height: 140px;
      overflow: hidden;
      padding: 5px;
      border-radius: 3px;
      background-color: rgb(0 0 0 / 5%);
      border: 1px solid rgb(0 0 0 / 5%);
      transition: var(--page-transition);

      .arco-image {
        background: var(--color-fill-2);
      }
    }

    &.is-selected {
      border: 1px solid var(--theme-color);
      background-color: var(--theme-color);

      .assets-uploader-browser__file--cover {
        border-color: transparent;

        .arco-image {
          background: #fff;
          box-shadow: 0 0 2px 0.5px rgb(0 0 0 / 45%);
        }
      }

      .assets-uploader-browser__file--info {
        color: white;
      }
    }

    &--checker {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: white;
      background-color: var(--theme-color);
      border: 1px solid white;
      top: 10px;
      right: 10px;
      z-index: 2;
    }

    &--info {
      padding: 5px 8px;
      color: var(--color-text-2);
      font-size: 12px;
    }
  }

  .arco-pagination-simple {
    justify-content: end;
  }
}
</style>
