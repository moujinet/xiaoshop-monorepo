<script lang="ts" setup>
import { fetchRoleList } from '@/auth/apis'

defineOptions({
  name: 'StaffRoleSelector',
})

const { loading, data, refreshData } = fetchRoleList()

refreshData()

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
