<script lang="ts" setup>
defineOptions({
  name: 'FormGroup',
})

defineProps<{
  title?: string
  tips?: string
}>()
</script>

<template>
  <div class="form-group">
    <div class="form-group__header">
      <CommonGroupTitle>
        <template #default>
          <slot name="title">
            {{ title }}
          </slot>
        </template>
        <template v-if="$slots.append" #append>
          <slot name="append" />
        </template>
        <template v-if="$slots.extra" #extra>
          <slot name="extra" />
        </template>
      </CommonGroupTitle>
    </div>

    <div v-if="tips || $slots.tips" class="form-group__tips">
      <slot name="tips">
        <a-alert>
          {{ tips }}
        </a-alert>
      </slot>
    </div>

    <div class="form-group__body">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.form-group {
  &__header {
    display: flex;
    align-items: center;
    height: 24px;
  }

  &__tips {
    padding-top: var(--page-padding);
  }

  &__body {
    padding: var(--page-padding) 0;
  }
}
</style>
