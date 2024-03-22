<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

defineOptions({
  name: 'App',
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
