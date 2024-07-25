<script lang="ts" setup>
defineOptions({
  name: 'CommonGrid',
})
</script>

<template>
  <div class="grid gap-4 2xl:cols-4 xl:cols-3 lt-xl:cols-2 lt-lg:cols-1">
    <slot />
  </div>
</template>
