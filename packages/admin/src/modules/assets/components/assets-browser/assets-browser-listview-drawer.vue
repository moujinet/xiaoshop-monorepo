<script lang="ts" setup>
import type { IAsset } from '@/assets/types'
import { deleteAsset } from '@/assets/apis/asset'

defineOptions({
  name: 'AssetsBrowserListViewDrawer',
})

const props = defineProps<{
  title?: string
  asset: IAsset
}>()

const emit = defineEmits(['delete'])

const loading = ref(false)
const visible = ref(false)

function handleDelete() {
  loading.value = true

  deleteAsset(props.asset.id)
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
    :width="400"
    unmount-on-close
  >
    <a-spin :loading="loading">
      <a-descriptions :column="1" layout="inline-vertical" size="medium" bordered>
        <a-descriptions-item>
          <div relative py-1.5>
            <a-image
              :src="asset.path"
              :alt="asset.name"
              :preview="false"
              fit="contain"
              width="100%"
              height="100%"
              show-loader
            />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="文件名称">
          {{ asset.name }}
        </a-descriptions-item>
        <a-descriptions-item label="文件路径">
          {{ asset.path }}
        </a-descriptions-item>
        <a-descriptions-item label="文件类型">
          {{ asset.type }}
        </a-descriptions-item>
        <a-descriptions-item label="文件大小">
          {{ formatBytes(asset.size) }}
        </a-descriptions-item>
        <a-descriptions-item label="创建于">
          {{ formatDateTime(asset.createdTime) }}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>

    <template #footer>
      <div w-full text-left>
        <CommonDeleteBtn btn-type="primary" @delete="handleDelete" />
      </div>
    </template>
  </a-drawer>
</template>
