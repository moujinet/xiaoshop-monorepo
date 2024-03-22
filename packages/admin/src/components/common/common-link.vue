<script lang="ts" setup>
defineOptions({
  name: 'CommonLink',
})

defineProps<{
  href?: string
  type?: 'primary' | 'danger' | 'success' | 'warning'
  size?: 'small' | 'large'
  disable?: boolean
  prefixIcon?: string
  suffixIcon?: string
}>()
</script>

<template>
  <a
    class="common-link"
    :class="{
      [`is-${size}`]: size,
      [`is-${type}`]: type,
      'is-disable': disable,
    }"
    :href="!disable && href ? href : undefined"
  >
    <slot name="prefixIcon">
      <CommonIcon
        v-if="prefixIcon"
        :name="prefixIcon"
        :inline="false"
        class="common-link__prefix"
      />
    </slot>

    <slot />

    <slot name="suffixIcon">
      <CommonIcon
        v-if="suffixIcon"
        :name="suffixIcon"
        :inline="false"
        class="common-link__suffix"
      />
    </slot>
  </a>
</template>

<style lang="less">
.common-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  color: var(--color-neutral-6);
  font-size: 14px;

  &:hover {
    color: var(--color-neutral-5);
  }

  &:active {
    color: var(--color-neutral-7);
  }

  &.is-disable {
    cursor: not-allowed;
    color: var(--color-neutral-4);

    &:hover {
      color: var(--color-neutral-4);
    }
  }

  &.is-primary {
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color-light);
    }

    &:active {
      color: var(--primary-color-dark);
    }
  }

  &.is-danger {
    color: rgb(var(--danger-6));

    &:hover {
      color: rgb(var(--danger-5));
    }

    &:active {
      color: rgb(var(--danger-7));
    }
  }

  &.is-success {
    color: rgb(var(--success-6));

    &:hover {
      color: rgb(var(--success-5));
    }

    &:active {
      color: rgb(var(--success-7));
    }
  }

  &.is-warning {
    color: rgb(var(--warning-6));

    &:hover {
      color: rgb(var(--warning-5));
    }

    &:active {
      color: rgb(var(--warning-7));
    }
  }

  &.is-small {
    font-size: 12px;
  }

  &.is-large {
    font-size: 16px;
  }

  &__prefix {
    margin-right: 4px;
  }

  &__suffix {
    margin-left: 4px;
  }
}
</style>
