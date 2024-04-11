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
  btnType?: 'text' | 'primary' | 'outline' | 'dashed' | 'secondary'
  disabled?: boolean
}>()

const emit = defineEmits(['delete'])
</script>

<template>
  <a-popconfirm
    :ok-loading="loading"
    :content="confirmContent || '确定要删除吗?'"
    :ok-text="confirmOkText || '删除'"
    :cancel-text="confirmCancelText || '取消'"
    :ok-button-props="{ status: 'danger' }"
    type="warning"
    @ok="() => emit('delete')"
  >
    <slot>
      <a-button :disabled="disabled" :type="btnType || 'text'" status="danger">
        <slot name="text">
          {{ btnText || '删除' }}
        </slot>
      </a-button>
    </slot>
  </a-popconfirm>
</template>
