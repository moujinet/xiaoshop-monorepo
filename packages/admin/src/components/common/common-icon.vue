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
  inline: false,
  active: false,
  activeSuffix: '-fill',
})
</script>

<template>
  <Icon
    class="t-icon"
    :icon="active ? `${name}${activeSuffix}` : name"
    :inline="inline"
  />
</template>
