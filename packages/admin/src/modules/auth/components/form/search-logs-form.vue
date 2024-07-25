<script lang="ts" setup>
import { STAFF_LOG_TYPES } from '@xiaoshop/schema'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

defineOptions({
  name: 'StaffLogsSearchForm',
})

const emit = defineEmits(['reset'])

const form = defineModel('form', {
  type: Object,
  default: () => ({
    type: '',
    keywordType: 'name',
    keyword: '',
    time: [],
    page: 1,
    pagesize: DEFAULT_PAGE_SIZE,
  }),
})

const keywordTypes = [
  { label: '员工姓名', value: 'name' },
  { label: '员工账号', value: 'username' },
  { label: '员工手机', value: 'mobile' },
]

function handleReset() {
  form.value.keywordType = 'name'
  form.value.keyword = ''
  form.value.time = []

  emit('reset')
}
</script>

<template>
  <FormSearch :form="form" @reset="handleReset">
    <a-form-item field="keyword" label="日志搜索" show-colon>
      <a-input-group class="flex-auto">
        <a-select v-model="form.keywordType" class="w-105px!">
          <a-option v-for="kt in keywordTypes" :key="kt.value" :value="kt.value" :label="kt.label" />
        </a-select>

        <a-input v-model="form.keyword" class="flex-1" placeholder="请输入" allow-clear />
      </a-input-group>
    </a-form-item>

    <a-form-item field="type" label="日志类型" show-colon>
      <FormSelect
        v-model="form.type"
        :options="STAFF_LOG_TYPES"
        :field-names="{ label: 'label', value: 'value' }"
        placeholder="请选择"
      />
    </a-form-item>

    <a-form-item field="time" label="操作时间" show-colon>
      <a-range-picker v-model="form.time" />
    </a-form-item>
  </FormSearch>
</template>
