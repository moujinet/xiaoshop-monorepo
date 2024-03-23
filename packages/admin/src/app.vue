<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import Loading from '~/assets/images/loading.svg'

defineOptions({
  name: 'App',
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <template #loading>
      <Loading />
    </template>

    <router-view />
  </a-config-provider>
</template>
