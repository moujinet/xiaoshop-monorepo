<script lang="ts" setup>
defineOptions({
  name: 'GoodsSkuValuePopover',
  inheritAttrs: false,
})

defineProps<{
  label?: string
}>()

const emit = defineEmits(['change'])

const visible = ref(false)
const value = ref(0)

function handleChange(value: number) {
  visible.value = false
  emit('change', value)
}
</script>

<template>
  <a-trigger v-model:popup-visible="visible" trigger="click">
    <a-tooltip :content="`批量设置${label || ''}`" mini>
      <CommonIcon
        name="mingcute:edit-2"
        class="cursor-pointer text-$color-text-3 hover:text-$color-text-1 active:text-$color-text-2"
      />
    </a-tooltip>

    <template #content>
      <CommonPanel class="shadow-2xl">
        <div class="pb-2 text-gray">
          批量设置
        </div>

        <a-input-group class="w-30">
          <FormNumberInput v-model="value" :placeholder="label" show-zero />

          <a-button type="primary" class="px-2!" @click="handleChange(value)">
            <CommonIcon name="mingcute:check" />
          </a-button>
        </a-input-group>
      </CommonPanel>
    </template>
  </a-trigger>
</template>
