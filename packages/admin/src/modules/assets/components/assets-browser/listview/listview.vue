<script lang="ts" setup>
import AssetsBrowserGroupEditModal from '../group/group-edit-modal.vue'
import AssetsBrowserUploadModal from '../upload/upload-modal.vue'
import AssetsBrowserListviewCard from './listview-card.vue'

import type { IAsset, IAssetSnapshot, IAssetType } from '@/assets/types'
import { fetchAssetPages } from '@/assets/apis/asset'
import { ASSET_TYPES } from '@/assets/constants'

defineOptions({
  name: 'AssetsBrowserListView',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type: IAssetType
  height: number
  defaultSelected?: IAssetSnapshot[]
  mode?: 'select' | 'edit'
  limit?: number
  groupId?: number
  groupName?: string
}>(), {
  mode: 'select',
  limit: 1,
})

const emit = defineEmits(['groupNameChanged', 'groupDelete', 'select'])

const computedGroupId = computed(() => props.groupId)
const computedGroupTypeName = computed(() => {
  return ASSET_TYPES.find(item => item.value === props.type)?.label
})

const keyword = ref('')

const searchForm = reactive({
  name: '',
  page: 1,
  size: 24,
})

const { loading, data, refreshData } = fetchAssetPages()

watch(
  [searchForm, computedGroupId],
  () => {
    if (computedGroupId.value && computedGroupId.value !== 0)
      refresh()
  },
  { immediate: true },
)

function refresh() {
  refreshData(removeEmpty({
    ...searchForm,
    groupId: computedGroupId.value,
  }))
}

function handleSearch() {
  searchForm.name = keyword.value
}

const selected = ref<IAssetSnapshot[]>([])

watch(
  () => props.defaultSelected,
  () => {
    selected.value = props.defaultSelected ? [...props.defaultSelected] : []
  },
  { immediate: true },
)

function handleSelect(asset: IAsset, isSelected: boolean) {
  if (props.mode === 'select') {
    if (isSelected)
      selected.value.push({ id: asset.id, type: asset.type, path: asset.path } as IAssetSnapshot)
    else
      selected.value.splice(selected.value.indexOf(asset), 1)

    emit('select', [...selected.value])
  }
}

function isSelected(asset: IAsset) {
  return selected.value.some(item => item.id === asset.id)
}

function isCanSelect(asset: IAsset) {
  return props.limit !== 0
    && (
      selected.value.length === 0 // 没有选中
      || (!isSelected(asset) && selected.value.length < props.limit) // 没有选中, 且没有超过限制
      || isSelected(asset) // 有选中, 且超过限制, 允许取消选中
    )
}

function checkLimit(asset: IAsset) {
  if (props.mode === 'select'
    && props.limit !== 0
    && selected.value.length === props.limit
    && !isCanSelect(asset)
  )
    useMessage().info(`最多只能选择 ${props.limit} 张图片`)
}
</script>

<template>
  <div class="h-full">
    <div flex="~ v-center between" h-32px>
      <div v-if="mode === 'edit'" flex="~ v-center" bg="$color-fill-2" gap-4 rounded py-2 px-4>
        <CommonIcon :loading="!groupName" name="ph:folder" active color="$theme-color" />

        <span v-if="groupName" font="bold" color="$color-text-1">
          {{ groupName }}
        </span>

        <AssetsBrowserGroupEditModal
          v-if="computedGroupId"
          :id="computedGroupId"
          :type="type"
          @success="emit('groupNameChanged')"
          @delete="emit('groupDelete')"
        >
          <CommonLink type="primary">
            <CommonIcon name="ph:pencil-simple" />
          </CommonLink>
        </AssetsBrowserGroupEditModal>
      </div>

      <div flex="~ v-center gap-2" :class="{ 'w-full flex-between': mode === 'select' }">
        <AssetsBrowserUploadModal>
          <a-button type="primary">
            <template #icon>
              <CommonIcon name="ph:upload-simple" />
            </template>
            上传{{ computedGroupTypeName }}
          </a-button>
        </AssetsBrowserUploadModal>

        <div w-240px>
          <a-input-search
            v-model="keyword"
            :placeholder="`搜索${computedGroupTypeName}`"
            allow-clear
            @search="handleSearch"
            @clear="handleSearch"
          />
        </div>
      </div>
    </div>

    <div mt-4>
      <a-spin :loading="loading" w-full>
        <a-scrollbar
          outer-class="assets-browser-groups__scrollbar"
          :style="{ height: `${height - 120}px`, overflow: 'auto' }"
        >
          <div v-if="!data || data.total === 0" flex="~ center" h-full>
            <CommonEmpty :description="loading ? '努力加载中...' : `暂无${computedGroupTypeName}`" />
          </div>

          <template v-else>
            <div
              class="grid "
              :class="mode === 'edit' ? 'grid-cols-2 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 gap-6' : 'grid-cols-4 gap-4'"
            >
              <AssetsBrowserListviewCard
                v-for="asset in data.result || []"
                :key="asset.id"
                :asset="asset"
                :selected="isSelected(asset)"
                :editable="mode === 'edit'"
                :selectable="mode === 'select' && isCanSelect(asset)"
                @delete="refresh"
                @select="handleSelect"
                @click="checkLimit(asset)"
              />
            </div>
          </template>
        </a-scrollbar>

        <a-pagination
          v-if="data && data.total > 0"
          v-model:current="searchForm.page"
          :total="data && data.total || 0"
          :page-size="searchForm.size"
          size="mini"
          class="mt-4"
          simple
        />
      </a-spin>
    </div>
  </div>
</template>

<style lang="less">
.arco-pagination-simple {
  justify-content: end;
}
</style>
