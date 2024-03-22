<script lang="ts" setup>
defineOptions({
  name: 'LayoutContent',
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="route" />
    </transition>
  </router-view>
</template>
