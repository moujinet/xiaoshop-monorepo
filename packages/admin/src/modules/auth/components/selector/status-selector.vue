<script lang="ts" setup>
import { STAFF_ACCOUNT_STATUSES } from '@xiaoshop/schema'

defineOptions({
  name: 'StaffStatusSelector',
})
</script>

<template>
  <FormSelect
    :options="STAFF_ACCOUNT_STATUSES"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
