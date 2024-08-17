<script lang="ts" setup>
import { fetchMemberTagDictList } from '@/member/apis'

defineOptions({
  name: 'MemberTagCheckbox',
})

const { data, refreshData } = fetchMemberTagDictList()

refreshData()
</script>

<template>
  <a-checkbox-group v-if="data && data.length > 0">
    <a-checkbox v-for="item in data" :key="item.id" :value="item.id">
      {{ item.name }}
    </a-checkbox>
  </a-checkbox-group>
</template>
