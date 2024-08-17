<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'

defineOptions({
  name: 'MemberOrdersPanel',
  inheritAttrs: false,
})

defineProps<{
  id?: number
  visible?: boolean
}>()

const columns: TableColumnData[] = [
  { title: '订单信息', dataIndex: 'order', slotName: 'order' },
  { title: '商品数量', dataIndex: 'total', slotName: 'total' },
  { title: '订单金额', dataIndex: 'price', slotName: 'price' },
  { title: '支付金额', dataIndex: 'payment', slotName: 'payment' },
  { title: '交易完成时间', dataIndex: 'createdTime', slotName: 'createdTime' },
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
