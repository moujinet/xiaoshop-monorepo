<script lang="ts" setup>
defineOptions({
  name: 'CommonIconButton',
  inheritAttrs: false,
})

const props = defineProps<{
  text: string
  icon?: string
  color?: string
  disabled?: boolean
}>()

const emit = defineEmits(['click'])

function handleClick() {
  if (!props.disabled)
    emit('click')
}
</script>

<template>
  <div
    class="flex-(~ col center) py-3 px-2 gap-1.5 cursor-pointer op-85 hover:op-100 text-(24px center) rounded is-colorful"
    :class="{
      [`is-${color}`]: !!color,
      'is-gray op-100! cursor-not-allowed': disabled,
    }"
    @click="handleClick"
  >
    <CommonIcon v-if="icon" :name="icon" :inline="false" active />
    <span class="text-12px">{{ text }}</span>
  </div>
</template>
