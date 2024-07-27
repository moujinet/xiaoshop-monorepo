<script lang="ts" setup>
import { ASSET_TYPES, AssetType, Enabled } from '@xiaoshop/schema'
import { deleteAsset, fetchAssetDetail } from '@/assets/apis'

defineOptions({
  name: 'AssetsBrowserListViewDrawer',
})

const props = defineProps<{
  title?: string
  id: number
}>()

const emit = defineEmits(['delete'])

const visible = ref(false)
const { loading, data, refreshData } = fetchAssetDetail(props.id)

watch(
  visible,
  () => {
    if (visible.value) {
      refreshData()
    }
  },
)

function handleDelete() {
  loading.value = true

  deleteAsset(props.id)
    .then(() => {
      loading.value = false
      visible.value = false

      emit('delete')
    })
}
</script>

<template>
  <span @click="() => (visible = true)">
    <slot />
  </span>

  <a-drawer
    v-model:visible="visible"
    :title="title"
    :width="480"
    unmount-on-close
  >
    <a-spin :loading="loading">
      <div v-if="data" class="relative mb-4">
        <template v-if="data.type === AssetType.IMAGE">
          <CommonImage
            :src="data.path"
            :alt="data.name"
            :preview="false"
            fit="contain"
            width="100%"
            height="100%"
            show-loader
          />
        </template>

        <template v-else>
          <CommonVideo :src="data.path" :height="280" />
        </template>
      </div>
      <a-descriptions v-if="data" :column="1" size="medium" bordered>
        <a-descriptions-item label="文件名称">
          {{ data.name }}
        </a-descriptions-item>
        <a-descriptions-item label="文件路径">
          {{ data.path }}
        </a-descriptions-item>
        <a-descriptions-item label="文件类型">
          {{ ASSET_TYPES.find(type => type.value === data.type)?.label || '未知' }}
        </a-descriptions-item>
        <a-descriptions-item label="文件大小">
          {{ formatBytes(data.size) }}
        </a-descriptions-item>
        <template v-if="data.type === 'image'">
          <a-descriptions-item label="启用图片压缩">
            <a-tag :color="data.group.enableCompress === Enabled.YES ? 'arcoblue' : ''">
              {{ data.group.enableCompress === Enabled.YES ? '启用' : '关闭' }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="启用缩略图">
            <a-tag :color="data.group.enableThumbnail === Enabled.YES ? 'arcoblue' : ''">
              {{ data.group.enableThumbnail === Enabled.YES ? '启用' : '关闭' }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="启用水印">
            <a-tag :color="data.group.enableWatermark === Enabled.YES ? 'arcoblue' : ''">
              {{ data.group.enableWatermark === Enabled.YES ? '启用' : '关闭' }}
            </a-tag>
          </a-descriptions-item>
        </template>
        <a-descriptions-item label="创建于">
          {{ formatDateTime(data.createdTime) }}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>

    <template #footer>
      <div class="flex-(~ v-center between) w-full">
        <CommonConfirm btn-type="primary" @ok="handleDelete" />

        <a-button @click="visible = false">
          关闭
        </a-button>
      </div>
    </template>
  </a-drawer>
</template>
