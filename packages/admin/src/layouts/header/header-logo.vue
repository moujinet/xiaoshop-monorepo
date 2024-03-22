<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderLogo',
})

const options = {
  name: 'XiaoShop',
  desc: 'XiaoShop Admin',
  logo: '/img/logo.png',
}
</script>

<template>
  <router-link class="layout-header__logo" to="/" :title="options.desc">
    <img :src="options.logo" :alt="options.name">
    <h1>{{ options.name }}</h1>
  </router-link>
</template>

<style lang="less" scoped>
.layout-header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  user-select: none;
  padding: 0 24px 0 12px;

  img {
    width: 20px;
    height: 20px;
  }

  h1 {
    color: var(--layout-header-text-color-active);
    font-size: 16px;
    line-height: 1;
    padding: 0;
    margin: 0 0 0 .5em;
    text-transform: uppercase;
  }
}
</style>
