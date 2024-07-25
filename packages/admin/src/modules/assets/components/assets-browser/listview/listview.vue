<script lang="ts" setup>
import { ASSET_TYPES, EnabledEnum, type IAsset, type IAssetType, type IEnabled } from '@xiaoshop/schema'
import AssetsBrowserGroupEditModal from '../group/group-edit-modal.vue'
import AssetsBrowserUploadModal from '../upload/upload-modal.vue'
import AssetsBrowserListviewCard from './listview-card.vue'

import { fetchAssetPages } from '@/assets/apis'

defineOptions({
  name: 'AssetsBrowserListView',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  type: IAssetType
  height: number
  defaultSelected?: string[]
  mode?: 'select' | 'edit'
  limit?: number
  groupId?: number
  groupName?: string
  enableCompress?: IEnabled
  enableThumbnail?: IEnabled
  enableWatermark?: IEnabled
  empty?: boolean
}>(), {
  mode: 'select',
  limit: 1,
  enableCompress: EnabledEnum.NO,
  enableThumbnail: EnabledEnum.NO,
  enableWatermark: EnabledEnum.NO,
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
  pagesize: 24,
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
    type: props.type,
    groupId: computedGroupId.value,
  }))
}

function handleSearch() {
  searchForm.name = keyword.value
}

const selected = ref<string[]>([])

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
      selected.value.push(asset.path)
    else
      selected.value.splice(selected.value.indexOf(asset.path), 1)

    emit('select', [...selected.value])
  }
}

function isSelected(asset: IAsset) {
  return selected.value.includes(asset.path)
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
  ) {
    useMessage().info(`最多只能选择 ${props.limit} 张图片`)
  }
}
</script>

<template>
  <div class="h-full">
    <div class="flex-(~ v-center between) h-8">
      <div v-if="mode === 'edit'" class="flex-(~ v-center) bg-$color-fill-2 gap-4 rounded py-2 px-4">
        <CommonIcon :loading="!groupName && !empty" name="mingcute:folder" color="arcoblue" active />

        <span v-if="groupName || empty" class="font-bold text-$color-text-1">
          {{ groupName ? groupName : '暂无分组' }}
        </span>

        <AssetsBrowserGroupEditModal
          v-if="computedGroupId"
          :id="computedGroupId"
          :type="type"
          @success="emit('groupNameChanged')"
          @delete="emit('groupDelete')"
        >
          <CommonLink type="primary">
            <CommonIcon name="mingcute:edit-2" />
          </CommonLink>
        </AssetsBrowserGroupEditModal>
      </div>

      <div class="flex-(~ v-center gap-2)" :class="{ 'w-full flex-between': mode === 'select' }">
        <AssetsBrowserUploadModal
          v-if="!empty"
          :type="type"
          :group-id="computedGroupId"
          :enable-compress="enableCompress"
          :enable-thumbnail="enableThumbnail"
          :enable-watermark="enableWatermark"
          @success="refresh"
        />

        <div class="w-240px">
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

    <div class="mt-4">
      <a-spin :loading="loading" class="w-full">
        <a-scrollbar
          outer-class="assets-browser-groups__scrollbar"
          :style="{ height: `${height - 120}px`, overflow: 'auto' }"
        >
          <div v-if="!data || data.total === 0" class="flex-(~ center) h-full">
            <CommonEmpty :description="loading ? '努力加载中...' : `暂无${computedGroupTypeName}`" />
          </div>

          <template v-else>
            <div
              class="grid"
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
          :page-size="searchForm.pagesize"
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
