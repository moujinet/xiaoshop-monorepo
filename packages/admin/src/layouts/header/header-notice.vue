<script lang="ts" setup>
import { NOTIFICATION_TYPES } from '~/constants'

defineOptions({
  name: 'LayoutHeaderNotice',
})

const type = ref(NOTIFICATION_TYPES[0].value)
const loading = ref(false)
const unread = ref(0)
const tooltip = computed(() => unread.value === 0 ? '暂无消息' : `您有 ${unread.value} 条未读消息`)
</script>

<template>
  <a-trigger
    :popup-offset="8"
    content-class="layout-header__notice"
    position="br"
    trigger="click"
  >
    <div class="layout-header__notice--btn">
      <a-tooltip :content="tooltip" position="br" mini>
        <a-badge :count="unread" :dot="unread > 0">
          <CommonIcon
            name="ph:chat-centered-dots"
            :class="{ 'is-unread': unread > 0 }"
            :active="unread > 0"
          />
        </a-badge>
      </a-tooltip>
    </div>

    <template #content>
      <a-tabs
        v-model:active-key="type"
        size="large"
        hide-content
      >
        <a-tab-pane v-for="item in NOTIFICATION_TYPES" :key="item.value">
          <template #title>
            <a-badge :count="unread" :offset="[12, -4]">
              {{ item.label }}
            </a-badge>
          </template>
        </a-tab-pane>
      </a-tabs>

      <a-spin :loading="loading" style="width: 100%">
        <a-scrollbar class="layout-header__notice--scroll">
          <div class="layout-header__notice--list">
            <!-- <CommonEmpty type="message" description="暂无未读消息" /> -->
          </div>
        </a-scrollbar>
      </a-spin>

      <div class="layout-header__notice--footer">
        <CommonLink size="small" :disable="unread === 0">
          设为已读
        </CommonLink>
        <CommonLink size="small" suffix-icon="ph:caret-right">
          查看全部
        </CommonLink>
      </div>
    </template>
  </a-trigger>
</template>

<style lang="less">
.layout-header__notice {
  width: 360px;
  padding-top: 4px;
  background-color: var(--color-bg-5);
  border-radius: var(--border-radius-large);
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);

  &--btn {
    cursor: pointer;

    &:hover {
      .common-icon {
        color: var(--layout-header-text-color-active);
      }
    }

    .common-icon {
      font-size: 20px;
      color: var(--layout-header-text-color);

      &.is-unread {
        color: var(--layout-header-text-color-active);
      }
    }
  }

  &--list,
  &--footer {
    padding: 12px 16px;
  }

  &--scroll,
  &--list {
    width: 100%;
    height: 320px;
  }

  &--scroll {
    overflow: auto;
  }

  &--footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-border-1);
  }
}
</style>
