<script lang="ts" setup>
import { fetchDepartmentTree } from '@/auth/apis'

defineOptions({
  name: 'StaffDepartmentSelector',
})

const { loading, data, refreshData } = fetchDepartmentTree()

refreshData()

defineExpose({
  refresh: refreshData,
})
</script>

<template>
  <a-cascader
    :options="data"
    :loading="loading"
    :field-names="{ label: 'name', value: 'id' }"
    :allow-search="false"
    :fallback="false"
    placeholder="请选择"
    allow-clear
  />
</template>
