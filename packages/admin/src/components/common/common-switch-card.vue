<script lang="ts" setup>
import { tryOnBeforeMount } from '@vueuse/core'

defineOptions({
  name: 'CommonSwitchCard',
})

const props = defineProps<{
  title?: string
  desc?: string
  icon?: string
  loading?: boolean
  defaultValue?: string | number | boolean
  enableValue?: string | number | boolean
  disableValue?: string | number | boolean
}>()

defineEmits(['change'])

const enable = defineModel<string | number | boolean>('enable', { default: undefined })

tryOnBeforeMount(() => {
  if (enable.value === undefined && props.defaultValue !== undefined)
    enable.value = props.defaultValue
})
</script>

<template>
  <div class="p-5 bg-white rounded transition hover:(shadow-xl)">
    <div class="flex-(~ v-center between) mb-2">
      <strong class="text-$color-text-1">
        {{ title }}
      </strong>

      <div v-if="icon" class="flex-(~ center) bg-primary ring-(3 color-$color-primary/20) rounded-full w-8 h-8">
        <CommonIcon class="text-white text-5" :name="icon" :inline="false" active />
      </div>
    </div>

    <div class="text-xs text-$color-text-3 min-h-8">
      {{ desc }}
    </div>

    <div class="flex-(~ v-center between) mt-3 pt-4 b-t-(1 solid $color-border-1)">
      <a-switch
        v-model="enable"
        checked-text="启用"
        unchecked-text="关闭"
        :checked-value="enableValue || true"
        :unchecked-value="disableValue || false"
        :loading="loading"
        @change="() => $emit('change', enable)"
      />

      <a-space>
        <slot />
      </a-space>
    </div>
  </div>
</template>
