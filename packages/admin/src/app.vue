<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

defineOptions({
  name: 'App',
})

useSettings().refresh()
useTheme().changeTheme()
</script>

<template>
  <a-config-provider :locale="zhCN">
    <template #empty>
      <CommonEmpty />
    </template>

    <router-view />
  </a-config-provider>
</template>
