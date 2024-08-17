<script lang="ts" setup>
import { MEMBER_STATUSES } from '@xiaoshop/schema'

defineOptions({
  name: 'MemberStatusSelector',
})
</script>

<template>
  <FormSelect
    :options="MEMBER_STATUSES"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
