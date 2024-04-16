<script lang="ts" setup>
defineOptions({
  name: 'SmsLogStatusBadge',
})

defineProps<{
  status: number
}>()

const statusMap = [{
  value: '1',
  label: '待发送',
  status: 'processing',
}, {
  value: '2',
  label: '发送成功',
  status: 'success',
}, {
  value: '3',
  label: '发送失败',
  status: 'danger',
}]

function getStatusMap(status: unknown, key: 'label' | 'status') {
  const map = statusMap.find(item => Number(item.value) === status)
  return (map ? map[key] : '') as any
}
</script>

<template>
  <a-badge
    :status="getStatusMap(status, 'status')"
    :text="getStatusMap(status, 'label')"
  />
</template>
