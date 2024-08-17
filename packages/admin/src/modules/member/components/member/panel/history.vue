<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'

defineOptions({
  name: 'MemberHistoryPanel',
  inheritAttrs: false,
})

defineProps<{
  id?: number
  visible?: boolean
}>()

const columns: TableColumnData[] = [
  { title: '商品', dataIndex: 'order', slotName: 'order' },
  { title: '价格', dataIndex: 'total', slotName: 'total' },
  { title: '来源', dataIndex: 'source', slotName: 'source' },
  { title: '浏览时间', dataIndex: 'createdTime', slotName: 'createdTime' },
]
</script>

<template>
  <a-table
    row-key="id"
    size="large"
    :columns="columns"
    :data="[]"
    :bordered="false"
    hoverable
    stripe
  >
    <template #createdTime="{ record }">
      {{ formatTimeAgo(record.createdTime) }}
    </template>
  </a-table>
</template>
