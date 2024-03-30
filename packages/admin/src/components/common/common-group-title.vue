<script lang="ts" setup>
defineOptions({
  name: 'CommonGroupTitle',
})

defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="common-group-title">
    <div class="common-group-title__wrapper">
      <div class="common-group-title__dot" />
      <h3>
        <slot>
          {{ title }}
        </slot>
      </h3>
      <template v-if="$slots.append">
        <div class="common-group-title__append">
          <slot name="append" />
        </div>
      </template>
    </div>
    <div class="common-group-title__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<style lang="less">
.common-group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__wrapper {
    display: flex;
  }

  &__dot {
    width: 3px;
    height: 14px;
    margin-right: 10px;
    border-radius: 2px;
    background-color: var(--theme-color);
  }

  h3 {
    color: var(--color-text-1);
    font-size: 15px;
    line-height: 1;
    margin: 0;
    margin-right: 10px;
  }

  &__extra {
    font-size: 14px;
    color: var(--color-text-3);
  }
}
</style>
