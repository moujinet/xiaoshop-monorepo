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
    @ok="() => emit('ok')"
  >
    <a-button :disabled="disabled" size="mini" type="text" status="danger">
      删除
    </a-button>
  </a-popconfirm>
</template>
