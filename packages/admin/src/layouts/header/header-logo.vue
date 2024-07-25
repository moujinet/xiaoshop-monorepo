<script lang="ts" setup>
defineOptions({
  name: 'LayoutHeaderLogo',
})

const { getOptions } = useSettings()
const options = getOptions('store', {}, ['name', 'logo'])

const splitName = computed(() => {
  return options.name?.split('') || []
})
</script>

<template>
  <router-link class="layout-header__logo" to="/" :title="options.name || ''">
    <CommonImage v-if="options.logo" :src="options.logo" width="20px" height="20px" class="mr-2" />
    <h1 v-if="options.name">
      <span
        v-for="(word, index) in splitName"
        :key="word"
        :style="{
          zIndex: splitName.length - index,
        }"
      >
        {{ word }}
      </span>
    </h1>
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
    letter-spacing: -1px;
    padding: 0;
    text-transform: uppercase;

    span {
      position: relative;
      text-shadow: 2px 0 2px #000;
    }
  }
}
</style>
