<script lang="ts" setup>
defineOptions({
  name: 'GoodsStockEditModal',
})

defineProps<{
  id?: number
}>()

const visible = ref(false)
const loading = ref(false)
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    title="修改商品库存"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      TODO
    </template>
  </CommonModal>
</template>
