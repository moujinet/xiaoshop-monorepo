<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import {
  ICON_SUFFIX_ACTIVE,
  ICON_SUFFIX_DEFAULT,
} from '~/constants/icon'

defineOptions({
  name: 'CommonIcon',
})

withDefaults(defineProps<{
  name: string
  color?: IColorName
  inline?: boolean
  active?: boolean
  loading?: boolean
}>(), {
  inline: true,
})
</script>

<template>
  <i class="common-icon" :class="{ 'is-flex': !inline }">
    <a-spin v-if="loading" :size="14" />
    <IconifyIcon
      v-else
      :icon="active ? `${name}${ICON_SUFFIX_ACTIVE}` : `${name}${ICON_SUFFIX_DEFAULT}`"
      :inline="inline"
      :class="{
        [`is-colorful is-${color} bg-transparent!`]: color,
      }"
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
