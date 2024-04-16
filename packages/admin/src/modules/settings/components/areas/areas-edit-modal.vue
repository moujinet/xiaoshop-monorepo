<script lang="ts" setup>
import { fetchAreaDetail } from '@/settings/apis/area'

defineOptions({
  name: 'AreasEditModal',
})

const props = withDefaults(defineProps<{
  id?: number
  parent?: number
  parentName?: string
}>(), {
  parent: 0,
})

const visible = defineModel('visible', { type: Boolean, default: false })
const isEdit = computed(() => props.id && props.id !== 0)

const form = reactive({
  id: '',
  parent: props.parent.toString(),
  name: '',
  shortName: '',
  code: '',
})
const { loading, refreshData } = fetchAreaDetail(props.id || 0)

watch(
  () => [
    visible.value,
    props.id,
  ],
  () => {
    if (visible.value && props.id && props.id !== 0) {
      refreshData({ id: props.id })
        .then((data) => {
          form.id = String(data.id)
          form.parent = String(data.parent)
          form.name = data.name
          form.shortName = data.shortName
          form.code = data.code
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
    :title="isEdit ? '编辑地区' : '添加地区'"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item v-if="parentName" label="上级地区" show-colon required>
          <div class="form-item">
            {{ parentName }}
          </div>
        </a-form-item>

        <a-form-item field="name" label="地区名称" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入地区名称"
            />
          </div>
        </a-form-item>

        <a-form-item field="shortName" label="地区简称" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.shortName"
              placeholder="请输入地区简称"
            />
          </div>
        </a-form-item>

        <a-form-item field="code" label="邮政编码" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.code"
              placeholder="请输入邮政编码"
            />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
