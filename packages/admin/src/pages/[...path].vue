<script lang="ts" setup>
defineOptions({
  name: 'PageNotFound',
})
</script>

<template>
  <CommonEmpty type="notfound" description="页面不存在" />
</template>

<route lang="json">
{
  "meta": {
    "layout": "blank"
  }
}
</route>
