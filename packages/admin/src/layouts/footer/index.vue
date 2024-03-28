<script lang="ts" setup>
import LogoSVG from '~/assets/images/logo.svg'

defineOptions({
  name: 'LayoutFooter',
})

const { version } = useApp()
</script>

<template>
  <a-layout-footer class="layout-footer">
    <div class="layout-footer__copyright">
      <LogoSVG class="layout-footer__copyright--logo" />
      &copy; {{ new Date().getFullYear() }} XiaoShop All Rights Reserved.
    </div>

    <a-space class="layout-footer__links">
      <template #split>
        <a-divider direction="vertical" />
      </template>

      <router-link to="/">
        技术支持
      </router-link>
      <router-link to="/">
        意见反馈
      </router-link>
      <router-link to="/">
        版本更新 <small>v{{ version }}</small>
      </router-link>
    </a-space>
  </a-layout-footer>
</template>

<style lang="less" scoped>
.layout-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--page-padding);
  height: var(--layout-footer-height);
  color: var(--layout-footer-text-color);
  transition: var(--page-transition);

  &__copyright {
    display: flex;
    align-items: center;
    font-size: 12px;

    &--logo {
      font-size: 18px;
      margin-right: 8px;
    }
  }

  &__links {
    a {
      font-size: 12px;
      color: var(--layout-footer-text-color);
      text-decoration: none;

      &:hover {
        color: var(--layout-footer-text-color-hover);
      }
    }
  }
}
</style>
