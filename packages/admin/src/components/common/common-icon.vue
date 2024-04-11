<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  ICON_SUFFIX_ACTIVE,
  ICON_SUFFIX_DEFAULT,
  ICON_SUFFIX_DUOTONE,
} from '~/constants/icon'

defineOptions({
  name: 'CommonIcon',
})

withDefaults(defineProps<{
  name: string
  inline?: boolean
  active?: boolean
  duotone?: boolean
  loading?: boolean
}>(), {
  inline: true,
})
</script>

<template>
  <i class="common-icon" :class="{ 'is-flex': !inline }">
    <a-spin v-if="loading" :size="14" />
    <Icon
      v-else
      :icon="duotone ? `${name}${ICON_SUFFIX_DUOTONE}` : active ? `${name}${ICON_SUFFIX_ACTIVE}` : `${name}${ICON_SUFFIX_DEFAULT}`"
      :inline="inline"
    />
  </i>
</template>

<style lang="less">
.common-icon {
  &.is-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
