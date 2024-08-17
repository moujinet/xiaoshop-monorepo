<script lang="ts" setup>
import { MEMBER_CARD_TYPES } from '@xiaoshop/schema'
import { fetchMemberCardDictList } from '@/member/apis'

defineOptions({
  name: 'MemberCardSelector',
})

const props = defineProps<{
  type?: string
}>()

const computedTypes = computed(() => {
  return MEMBER_CARD_TYPES.filter(type => !props.type ? true : type.value === props.type)
})

const { loading, data, refreshData } = fetchMemberCardDictList()

refreshData()

function getData(type: string) {
  return data.value && data.value.length > 0
    ? data.value.filter(item => item.type === type)
    : []
}
</script>

<template>
  <a-select
    :loading="loading"
    :default-active-first-option="false"
    :fallback-option="false"
    :max-tag-count="3"
    placeholder="请选择"
    allow-clear
  >
    <template v-for="cardType in computedTypes" :key="cardType.value">
      <a-optgroup v-if="getData(cardType.value).length > 0" :label="cardType.label">
        <a-option
          v-for="item in getData(cardType.value)"
          :key="item.id"
          :value="item.id"
        >
          {{ item.name }}
        </a-option>
      </a-optgroup>
    </template>
  </a-select>
</template>
