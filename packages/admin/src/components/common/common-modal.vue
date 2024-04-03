<script lang="ts" setup>
defineOptions({
  name: 'CommonModal',
})

defineProps<{
  title?: string
  loading?: boolean
  okText?: string
  cancelText?: string
  hideCancel?: boolean
}>()

const emit = defineEmits(['ok', 'cancel'])

const visible = defineModel(
  'visible',
  {
    type: Boolean,
    default: false,
  },
)

function handleModalOk(ev: Event) {
  emit('ok', ev)
}

function handleModalCancel(ev: Event) {
  emit('cancel', ev)
}
</script>

<template>
  <span @click="visible = true">
    <slot />
  </span>

  <a-modal
    v-model:visible="visible"
    :title="title"
    :ok-text="okText"
    :cancel-text="cancelText"
    :hide-cancel="hideCancel"
    title-align="start"
    width="auto"
    simple
    unmount-on-close
    @ok="handleModalOk"
    @cancel="handleModalCancel"
  >
    <div v-if="visible" flex="~ center" w-500px>
      <a-spin :loading="loading" w-full>
        <slot name="modal" />
      </a-spin>
    </div>
  </a-modal>
</template>
