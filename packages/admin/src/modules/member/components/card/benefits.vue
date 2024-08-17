<script lang="ts" setup>
import type {
  IMemberCard,
  IMemberCustomCardListItem,
  IMemberLevelListItem,
} from '@xiaoshop/schema'
import { Enabled } from '@xiaoshop/schema'

defineOptions({
  name: 'MemberCardBenefits',
  inheritAttrs: false,
})

defineProps<{
  card: IMemberCard | IMemberCustomCardListItem | IMemberLevelListItem
}>()
</script>

<template>
  <div v-if="card.isFreeShipping === Enabled.YES">
    <CommonIcon name="mingcute:package" color="gold" />
    专享包邮特权
  </div>
  <div v-if="card.discount < 100">
    <CommonIcon name="mingcute:sale" color="cyan" />
    购物享 {{ card.discount / 10 }} 折优惠
  </div>
  <div>
    <CommonIcon name="mingcute:gift-2" color="magenta" />
    购物享 {{ card.pointsRatio }} 倍积分
  </div>
</template>
