<script lang="ts" setup>
defineOptions({
  name: 'FormCard',
})

defineProps<{
  id?: string
  title?: string
  model: Record<string, any>
  rules?: Record<string, any>
  size?: 'small' | 'medium' | 'large'
  labelWidth?: string
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits(['submit', 'submitFailed', 'submitSuccess'])
</script>

<template>
  <CommonCard class="form-card" :title="title" :loading="loading">
    <template #extra>
      <slot name="extra" />
    </template>

    <a-form
      :id="id"
      :model="model"
      :rules="rules"
      :size="size"
      :label-col-props="{ flex: labelWidth || '180px' }"
      :wrapper-col-props="{ flex: 'auto' }"
      :disabled="disabled"
      class="form-card__form"
      scroll-to-first-error
      @submit="emit('submit', $event)"
      @submit-failed="emit('submitFailed', $event)"
      @submit-success="emit('submitSuccess', $event)"
    >
      <slot />
    </a-form>
  </CommonCard>
</template>

<style lang="less">
.form-card {
  &__form {
    .arco-col.arco-form-item-wrapper-col {
      width: auto;
    }
  }
}
</style>
