<script lang="ts" setup>
defineOptions({
  name: 'FormSelect',
})
</script>

<template>
  <a-select
    :field-names="{ label: 'name', value: 'id' }"
    :default-active-first-option="false"
    :fallback-option="false"
    :max-tag-count="3"
    unmount-on-close
    allow-clear
  />
</template>
