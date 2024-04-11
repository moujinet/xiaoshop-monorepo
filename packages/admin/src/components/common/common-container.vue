<script lang="ts" setup>
defineOptions({
  name: 'CommonContainer',
})

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  showHeader?: boolean
  showBreadcrumb?: boolean
  showBack?: boolean
  flexible?: boolean
}>(), {
  showHeader: true,
  showBreadcrumb: true,
  showBack: true,
})

const route = useRoute()
const router = useRouter()
const { getMeta } = useMeta()
const { visible } = storeToRefs(useTheme())

const space = computed(() => {
  return getMeta(route.meta.space || '')
})

const computedTitle = computed(() => {
  if (!props.title)
    return route.meta.name
  return props.title
})

const computedSubTitle = computed(() => {
  if (!props.subtitle)
    return route.meta.desc || undefined
  return props.subtitle
})

useTheme().setAutoVisible('container', true)
</script>

<template>
  <div class="common-container">
    <div
      class="common-container__header"
      :class="{
        'has-sidebar': visible.main && visible.sidebar,
        'only-main': visible.main && !visible.sidebar,
        'only-sub': visible.sidebar && !visible.main,
      }"
    >
      <a-page-header
        v-if="showHeader"
        class="common-container__header--inner"
        :show-back="showBack"
        @back="router.go(-1)"
      >
        <template #title>
          <slot name="title">
            {{ computedTitle }}
          </slot>
        </template>

        <template v-if="$slots.subtitle || computedSubTitle" #subtitle>
          <slot name="subtitle">
            {{ computedSubTitle }}
          </slot>
        </template>

        <template v-if="$slots.extra" #extra>
          <slot name="extra" />
        </template>

        <template v-if="showBreadcrumb" #breadcrumb>
          <a-breadcrumb class="common-container__breadcrumb">
            <a-breadcrumb-item v-if="space">
              {{ space.name }}
            </a-breadcrumb-item>

            <template v-for="item in route.matched" :key="item.name">
              <a-breadcrumb-item v-if="Object.keys(item.meta).length">
                {{ item.meta.name }}
              </a-breadcrumb-item>
            </template>
          </a-breadcrumb>
        </template>

        <template v-if="$slots.append" #default>
          <slot name="append" />
        </template>
      </a-page-header>
    </div>

    <div class="common-container__body" :class="{ 'is-flex': flexible }">
      <slot name="header" />

      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.common-container {
  position: relative;
  width: 100%;

  &__header {
    position: fixed;
    width: 100%;
    z-index: var(--layout-header-zindex);

    &.has-sidebar {
      width: calc(100% - var(--layout-sider-main-width) - var(--layout-sider-sub-width));
    }

    &.only-main {
      width: calc(100% - var(--layout-sider-main-width));
    }

    &.only-sub {
      width: calc(100% - var(--layout-sider-sub-width));
    }

    &--inner {
      background: url("/img/header-bg.png") no-repeat top right;
      background-size: contain;

      :deep(.arco-page-header-title) {
        font-size: 17px;
      }
    }

    border-bottom: 1px solid var(--color-border-2);
    background-image: linear-gradient(
      18deg,
      #fff 70%,
      rgb(var(--primary-2)) 100%
    );
  }

  &__breadcrumb {
    :deep(.arco-breadcrumb-item) {
      font-size: 12px;
      color: var(--color-text-3);
    }
  }

  &__body {
    padding: calc(83px + var(--page-padding)) var(--page-padding) 0 var(--page-padding);

    &.is-flex {
      display: flex;
      flex-direction: column;
      row-gap: var(--page-padding);
    }
  }
}
</style>
