<script lang="ts" setup>
defineOptions({
  name: 'FormSearch',
})

const props = defineProps<{
  form?: any
  simple?: boolean
  defaultCollapsed?: boolean
}>()

const collapsed = ref(props.defaultCollapsed || false)
</script>

<template>
  <CommonCard
    class="form-search"
    :class="{
      'is-simple': simple,
    }"
  >
    <a-form
      :model="form"
      class="form-search__form"
      layout="inline"
      label-align="right"
    >
      <slot />

      <template v-if="!collapsed && $slots.more">
        <slot name="more" />
      </template>
    </a-form>

    <div class="form-search__footer">
      <a-space class="form-search__btn">
        <a-button type="primary">
          查询
        </a-button>

        <slot name="footer" />
      </a-space>

      <a-button
        v-if="$slots.more"
        type="text"
        class="form-search__collapse"
        :class="{
          'is-collapsed': collapsed,
        }"
        @click="collapsed = !collapsed"
      >
        {{ collapsed ? '展开' : '收起' }}
        <CommonIcon name="ph:caret-double-up" />
      </a-button>
    </div>
  </CommonCard>
</template>

<style lang="less">
.form-search {
  &.is-simple {
    .arco-card-body .arco-spin {
      display: flex;
      align-items: center;
      gap: var(--page-padding);
    }

    .form-search__form {
      width: auto;
      display: flex;
    }

    .form-search__footer {
      padding-top: 0;
    }
  }

  &__form {
    display: grid;
    grid-gap: var(--page-padding);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    transition: var(--page-transition);
  }

  &__footer {
    padding-top: var(--page-padding);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__collapse {
    .common-icon {
      transition: var(--page-transition);
      margin-left: 4px;
    }

    &.is-collapsed {
      .common-icon {
        transform: rotate(-0.5turn);
      }
    }
  }

  .arco-form-item-layout-inline {
    margin: 0;
  }
}
</style>
