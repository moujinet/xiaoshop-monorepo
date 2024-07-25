<script lang="ts" setup>
import { fetchPositionList } from '@/auth/apis'

defineOptions({
  name: 'StaffPositionRoleSelector',
})

const props = defineProps<{
  departmentId?: number
}>()

const { loading, data, refreshData } = fetchPositionList(0)

watch(
  () => props.departmentId,
  () => {
    if (props.departmentId)
      refreshData({ departmentId: props.departmentId })

    data.value = []
  },
  { immediate: true },
)

defineExpose({
  refresh: refreshData,
})
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
