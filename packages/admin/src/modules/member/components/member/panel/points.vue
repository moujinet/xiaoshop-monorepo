<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'

defineOptions({
  name: 'MemberPointsPanel',
  inheritAttrs: false,
})

defineProps<{
  id?: number
  visible?: boolean
}>()

const columns: TableColumnData[] = [
  { title: '来源/用途', dataIndex: 'order', slotName: 'order' },
  { title: '积分变化', dataIndex: 'total', slotName: 'total' },
  { title: '变化后积分', dataIndex: 'price', slotName: 'price' },
  { title: '备注', dataIndex: 'payment', slotName: 'payment' },
  { title: '发生时间', dataIndex: 'createdTime', slotName: 'createdTime' },
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
