<script lang="ts" setup>
defineOptions({
  name: 'CommonEmpty',
})

withDefaults(defineProps<{
  size?: 'small' | 'medium' | 'large'
  type?: 'empty' | 'error' | 'message' | 'auth' | 'notfound'
  description?: string
}>(), {
  size: 'medium',
  type: 'empty',
  description: '暂无记录',
})
</script>

<template>
  <div
    class="common-empty"
    :class="{
      [`is-${size}`]: size,
    }"
  >
    <IconEmptyEmpty v-if="type === 'empty'" class="common-empty__icon" />
    <IconEmptyError v-if="type === 'error'" class="common-empty__icon" />
    <IconEmptyMessage v-if="type === 'message'" class="common-empty__icon" />
    <IconEmptyNotFound v-if="type === 'notfound'" class="common-empty__icon" />

    <div class="common-empty__desc">
      {{ description }}
    </div>

    <slot />
  </div>
</template>

<style lang="less">
.common-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-4);
  user-select: none;

  &__icon {
    opacity: .7;
  }

  &__desc {
    font-size: 12px;
    padding-bottom: var(--page-padding-sm);
  }

  &.is-small {
    svg {
      width: 48px;
      height: 48px;
    }
  }

  &.is-medium {
    svg {
      width: 120px;
      height: 120px;
    }
  }

  &.is-large {
    svg {
      width: 280px;
      height: 280px;
    }
  }
}
</style>
