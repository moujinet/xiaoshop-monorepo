<script lang="ts" setup>
import { fetchMemberGroupDictList } from '@/member/apis'

defineOptions({
  name: 'MemberGroupSelector',
})

const { loading, data, refreshData } = fetchMemberGroupDictList()

refreshData()
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
