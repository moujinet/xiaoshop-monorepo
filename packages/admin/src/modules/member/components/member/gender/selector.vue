<script lang="ts" setup>
import { MEMBER_GENDERS } from '@xiaoshop/schema'

defineOptions({
  name: 'MemberGenderSelector',
})
</script>

<template>
  <FormSelect
    :options="MEMBER_GENDERS"
    :field-names="{ label: 'label', value: 'value' }"
    placeholder="请选择"
  />
</template>
