<script lang="ts" setup>
import type { IGoods, IGoodsListItem } from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsInfoBlock',
  inheritAttrs: false,
})

defineProps<{
  goods: IGoods | IGoodsListItem
}>()
</script>

<template>
  <div class="flex gap-4">
    <CommonImage v-if="goods.images" :src="goods.images[0]" width="60" height="60" />
    <div class="flex-(~ 1 col)">
      <a-typography-text bold :ellipsis="{ showTooltip: true }">
        {{ goods.name }}
      </a-typography-text>

      <a-space>
        <a-tag v-if="goods.group" size="small" color="blue">
          {{ goods.group.name }}
        </a-tag>

        <a-tag v-if="goods.tag" size="small" color="orangered">
          {{ goods.tag.name }}
        </a-tag>
      </a-space>
    </div>
  </div>
</template>
