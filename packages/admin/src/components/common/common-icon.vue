<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'CommonIcon',
})

withDefaults(defineProps<{
  name: string
  inline?: boolean
  active?: boolean
  activeSuffix?: string
}>(), {
  inline: true,
  active: false,
  activeSuffix: '-fill',
})
</script>

<template>
  <i class="common-icon">
    <Icon
      :icon="active ? `${name}${activeSuffix}` : name"
      :inline="inline"
    />
  </i>
</template>

<style lang="less">
.common-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
