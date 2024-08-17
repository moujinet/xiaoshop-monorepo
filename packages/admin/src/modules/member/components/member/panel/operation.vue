<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'

defineOptions({
  name: 'MemberOperationPanel',
  inheritAttrs: false,
})

defineProps<{
  id?: number
  visible?: boolean
}>()

const columns: TableColumnData[] = [
  { title: '操作内容', dataIndex: 'order', slotName: 'order' },
  { title: '操作来源', dataIndex: 'price', slotName: 'price' },
  { title: '操作 IP', dataIndex: 'total', slotName: 'total' },
  { title: '操作时间', dataIndex: 'createdTime', slotName: 'createdTime' },
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
