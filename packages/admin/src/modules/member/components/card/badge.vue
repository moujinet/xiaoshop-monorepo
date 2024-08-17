<script lang="ts" setup>
import type {
  IMemberBadgeType,
} from '@xiaoshop/schema'
import { MemberCardType } from '@xiaoshop/schema'

defineOptions({
  name: 'MemberCardBadge',
  inheritAttrs: false,
})

defineProps<{
  card: IMemberBadgeType
}>()
</script>

<template>
  <span
    class="flex-(inline v-center) py-0.5 px-1.5 gap-1 rounded select-none overflow-hidden"
    :style="{ color: card.badgeStyles.textColor, backgroundColor: card.badgeStyles.bgColor }"
  >
    <template v-if="card.badgeStyles.icon">
      <CommonIcon
        v-if="card.type === MemberCardType.LEVEL"
        class="text-3"
        :name="card.badgeStyles.icon"
        :inline="false"
        active
      />
    </template>
    <span class="h-4.5 text-3 leading-4.5">
      {{ card.name }}
    </span>
  </span>
</template>
