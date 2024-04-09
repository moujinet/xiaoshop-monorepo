<script lang="ts" setup>
import AssetsBrowserFolderEditModal from './browser-folder-edit-modal.vue'
import { fetchAssetList } from '@/assets/apis/asset'
import { fetchAssetGroupTree } from '@/assets/apis/group'
import type { IAssetImagePreview } from '@/assets/types'

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

const keyword = ref('')
const searchForm = reactive({
  groupId: [0],
  name: '',
  page: 1,
  size: 12,
})

const limit = inject<number>('assets.uploader.limit', 1)
const selected = defineModel<IAssetImagePreview[]>('selected', {
  type: Array,
  default: () => [],
})
const computedTotal = computed(() => selected.value.length + props.total)

const { loading: folderLoading, data: folders, refreshData: refreshFolders } = fetchAssetGroupTree()
const { loading, data: assets, refreshData } = fetchAssetList()

watch(
  folders,
  () => {
    searchForm.groupId = folders.value.length > 0 ? [folders.value[0].id] : []
  },
  { immediate: true },
)

watch(
  [searchForm],
  () => {
    refreshData({
      ...removeEmpty({
        ...searchForm,
        groupId: searchForm.groupId[0] ? searchForm.groupId[0] : '',
      }),
    })
  },
)

refreshFolders()

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
    selected.value.push(pick(file, ['id', 'path']))
}
</script>

<template>
  <div class="assets-uploader-browser">
    <div class="assets-uploader-browser__folders">
      <div class="assets-uploader-browser__folders--actions">
        <AssetsBrowserFolderEditModal @success="refreshFolders">
          <a-button type="outline" long>
            创建分组
          </a-button>
        </AssetsBrowserFolderEditModal>
      </div>

      <a-spin :loading="folderLoading">
        <a-tree
          v-model:selected-keys="searchForm.groupId"
          :field-names="{ title: 'name', key: 'id' }"
          :data="folders"
          :virtual-list-props="{
            height: `calc(${height} + 36px)`,
          }"
          block-node
          show-line
        >
          <template #switcher-icon="node: any, { isLeaf, selected: folderSelected }">
            <CommonIcon v-if="!isLeaf" name="ph:caret-down" />
            <CommonIcon v-if="isLeaf && folderSelected" name="ph:folder-open" :active="folderSelected" font="size-16px" />
            <CommonIcon v-if="isLeaf && !folderSelected" name="ph:folder" font="size-16px" />
          </template>
        </a-tree>
      </a-spin>
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
          <a-input-search
            v-model="keyword"
            placeholder="搜索"
            allow-clear
            @search="() => searchForm.name = keyword"
            @clear="() => searchForm.name = ''"
          />
        </div>
      </div>

      <a-spin :loading="loading">
        <a-scrollbar :style="{ height, overflow: 'auto' }">
          <div v-if="assets && assets.total > 0" class="assets-uploader-browser__list--assets">
            <div
              v-for="asset in assets.result"
              :key="asset.id"
              class="assets-uploader-browser__file"
              :class="{
                'is-selected': selected.some(path => path.id === asset.id),
              }"
              @click="handleSelectFile(asset)"
            >
              <div class="assets-uploader-browser__file--cover">
                <div v-if="selected.some(path => path.id === asset.id)" class="assets-uploader-browser__file--checker">
                  <CommonIcon name="ph:check-bold" />
                </div>
                <a-image
                  :src="asset.path"
                  :alt="asset.name"
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
                {{ asset.name }}
              </div>
            </div>
          </div>
          <div v-else :style="{ height }" flex="~ center">
            <a-empty />
          </div>
        </a-scrollbar>
      </a-spin>

      <a-pagination
        v-if="assets && assets.total > 0"
        v-model:current="searchForm.page"
        :total="assets.total"
        :page-size="searchForm.size"
        size="mini"
        simple
      />
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

    .arco-tree-node-selected {
      .common-icon {
        color: var(--theme-color);
      }
    }
  }

  &__list {
    flex: 1 1 auto;

    &--actions {
      display: flex;
      justify-content: space-between;
    }

    &--assets {
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
