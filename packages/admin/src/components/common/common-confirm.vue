<script lang="ts" setup>
defineOptions({
  name: 'CommonConfirm',
})

defineProps<{
  loading?: boolean
  confirmType?: 'info' | 'success' | 'warning' | 'error'
  confirmOkText?: string
  confirmCancelText?: string
  btnSize?: 'mini' | 'small' | 'medium' | 'large'
  btnText?: string
  btnType?: 'text' | 'primary' | 'outline' | 'dashed' | 'secondary'
  btnStatus?: 'normal' | 'danger'
  disabled?: boolean
}>()

const emit = defineEmits(['ok'])
</script>

<template>
  <a-popconfirm
    :ok-loading="loading"
    :content="`确定要${confirmOkText || '删除'}吗?`"
    :ok-text="confirmOkText || '删除'"
    :cancel-text="confirmCancelText || '取消'"
    :ok-button-props="{ status: btnStatus || 'danger' }"
    :type="confirmType || 'warning'"
    @ok="() => emit('ok')"
  >
    <slot>
      <a-button :disabled="disabled" :type="btnType || 'text'" :size="btnSize || 'medium'" :status="btnStatus || 'danger'">
        <slot name="text">
          {{ btnText || confirmOkText || '删除' }}
        </slot>
      </a-button>
    </slot>
  </a-popconfirm>
</template>
