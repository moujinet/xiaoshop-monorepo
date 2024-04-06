<script lang="ts" setup>
defineOptions({
  name: 'AssetsBrowserFolderEditModal',
})

const props = defineProps<{
  id?: number
}>()

const visible = defineModel('visible', { type: Boolean, default: false })
const isEdit = computed(() => props.id && props.id !== 0)
const loading = ref(false)
const form = reactive({
  id: 0,
  parentId: 0,
  name: '',
})

defineExpose({ visible })
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="isEdit ? '编辑分组' : '创建分组'"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item field="name" label="所属分组" show-colon>
          <div class="form-item">
            <a-select
              v-model="form.name"
              placeholder="作为顶级分组"
            />
          </div>
        </a-form-item>

        <a-form-item field="name" label="分组名称" show-colon required>
          <div class="form-item">
            <a-input
              v-model="form.name"
              placeholder="请输入分组名称"
            />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
