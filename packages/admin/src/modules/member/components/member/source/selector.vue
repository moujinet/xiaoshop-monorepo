<script lang="ts" setup>
import { MEMBER_SOURCES } from '@xiaoshop/schema'

defineOptions({
  name: 'MemberSourceSelector',
})
</script>

<template>
  <FormSelect
    :options="MEMBER_SOURCES"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
