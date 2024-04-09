<script lang="ts" setup>
defineOptions({
  name: 'FormPriceInput',
})

function formatter(value: string) {
  if (value === '0')
    return ''

  const values = value.split('.')
  values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return values.join('.')
}

function parser(value: string) {
  return value.replace(/,/g, '')
}
</script>

<template>
  <a-input-number :formatter="formatter" :parser="parser" hide-button>
    <template #suffix>
      元
    </template>
  </a-input-number>
</template>
