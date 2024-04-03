<script lang="ts" setup>
defineOptions({
  name: 'CommonDeleteBtn',
})

defineProps<{
  loading?: boolean
  confirmContent?: string
  confirmOkText?: string
  confirmCancelText?: string
  btnText?: string
  disabled?: boolean
}>()

const emit = defineEmits(['ok'])
</script>

<template>
  <a-popconfirm
    :ok-loading="loading"
    :content="confirmContent || '确定要删除吗?'"
    :ok-text="confirmOkText || '删除'"
    :cancel-text="confirmCancelText || '取消'"
    type="warning"
    @ok="() => emit('ok')"
  >
    <slot>
      <a-button :disabled="disabled" type="text" status="danger">
        删除
      </a-button>
    </slot>
  </a-popconfirm>
</template>
