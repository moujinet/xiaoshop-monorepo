<script lang="ts" setup>
defineOptions({
  name: 'CommonIconSwitch',
})

defineProps<{
  icon?: string
}>()

const visible = defineModel<boolean>('visible', {
  default: false,
})
</script>

<template>
  <a-tooltip :content="visible ? '收起' : '展开'" mini>
    <div
      class="hover:(text-$theme-color bg-$color-fill-1) px-1 rounded text-$color-text-3 cursor-pointer"
      :class="{
        'text-$theme-color bg-$color-fill-1': visible,
      }"
      @click="visible = !visible"
    >
      <slot>
        <CommonIcon v-if="icon" :name="icon" />
      </slot>
    </div>
  </a-tooltip>
</template>
