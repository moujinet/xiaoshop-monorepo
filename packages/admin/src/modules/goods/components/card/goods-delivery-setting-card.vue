<script lang="ts" setup>
defineOptions({
  name: 'GoodsDeliverySettingCard',
})

defineProps<{
  title?: string
  desc?: string
  icon?: string
  loading?: boolean
}>()

const enable = defineModel('enable', { type: Boolean, default: false })
</script>

<template>
  <div class="p-5 bg-white rounded transition hover:(shadow-xl)">
    <div class="mb-2" flex="~ v-center between">
      <strong class="text-$color-text-1">
        {{ title }}
      </strong>

      <div v-if="icon" class="bg-primary ring-(3 color-$color-primary/20) rounded-full w-8 h-8" flex="~ center">
        <CommonIcon class="text-white text-4" :name="icon" />
      </div>
    </div>

    <div class="text-xs text-$color-text-3 min-h-8">
      {{ desc }}
    </div>

    <div class="mt-3 pt-4 b-t-(1 solid $color-border-1)" flex="~ v-center between">
      <a-switch v-model="enable" checked-text="启用" unchecked-text="关闭" :loading="loading" />

      <a-space>
        <slot />
      </a-space>
    </div>
  </div>
</template>
