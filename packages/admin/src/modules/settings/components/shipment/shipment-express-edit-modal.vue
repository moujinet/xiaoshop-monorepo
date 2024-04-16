<script lang="ts" setup>
import { fetchShipmentCompanyDetail } from '@/settings/apis/shipment'

defineOptions({
  name: 'ShipmentCompanyEditModal',
})

const props = defineProps<{
  id?: number
}>()

const visible = defineModel('visible', { type: Boolean, default: false })
const isEdit = computed(() => props.id && props.id !== 0)

const form = reactive({
  id: 0,
  name: '',
  url: '',
  sort: 0,
})
const { loading, refreshData } = fetchShipmentCompanyDetail({
  id: props.id || 0,
})

watch(
  () => [
    visible.value,
    props.id,
  ],
  () => {
    if (visible.value && props.id && props.id !== 0) {
      refreshData({ id: props.id })
        .then((data) => {
          form.id = data.id
          form.name = data.name
          form.url = data.url
          form.sort = data.sort
        })
    }
  },
  { immediate: true },
)
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="isEdit ? '编辑物流公司' : '添加物流公司'"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item field="name" label="公司名称" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入公司名称"
            />
          </div>
        </a-form-item>

        <a-form-item field="url" label="公司网址" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.url"
              placeholder="请输入公司网址"
            />
          </div>
        </a-form-item>

        <a-form-item field="sort" label="排序" show-colon>
          <div class="form-item-xs">
            <a-input-number
              v-model="form.sort"
              placeholder="请输入排序"
            />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
