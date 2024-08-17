<script lang="ts" setup>
import { fetchMemberTagDictList } from '@/member/apis'

defineOptions({
  name: 'MemberTagSelector',
})

const { loading, data, refreshData } = fetchMemberTagDictList()

refreshData()
</script>

<template>
  <FormSelect
    :options="data"
    :loading="loading"
    placeholder="请选择"
  />
</template>
