<script lang="ts" setup>
import {
  type IMember,
  type IMemberInfo,
  type IMemberListItem,
  type IMemberProfile,
  MEMBER_GENDERS,
  MemberGender,
  MemberStatus,
} from '@xiaoshop/schema'

import {
  MemberAvatar,
  MemberCardBadge,
} from '@/member/components'

defineOptions({
  name: 'MemberInfoBlock',
})

defineProps<{
  member: IMember | IMemberInfo | IMemberProfile | IMemberListItem
}>()
</script>

<template>
  <div class="flex-(~ v-center items-stretch) gap-4" :class="{ grayscale: member.status === MemberStatus.BLOCKED }">
    <MemberAvatar :avatar="member.avatar" />
    <div class="flex-(~ 1 col between)">
      <div class="flex-(~ v-center) gap-1">
        <strong>{{ member.nickname }}</strong>
        <CommonIcon
          v-if="member.gender !== MemberGender.UNKNOWN"
          :name="MEMBER_GENDERS.find(item => item.value === member.gender)?.icon || ''"
          :color="MEMBER_GENDERS.find(item => item.value === member.gender)?.color || ''"
          :inline="false"
        />
      </div>
      <div class="flex-(~ v-center) gap-1">
        <MemberCardBadge :card="member.card" />

        <a-tag v-if="member.group" bordered>
          {{ member.group.name }}
        </a-tag>

        <a-tag v-for="tag in member.tags" :key="tag.id" bordered>
          {{ tag.name }}
        </a-tag>
      </div>
    </div>
  </div>
</template>
