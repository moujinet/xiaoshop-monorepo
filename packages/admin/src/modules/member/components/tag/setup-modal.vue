<script lang="ts" setup>
import type { IMember } from '@xiaoshop/schema'
import { MemberTagCheckbox } from '@/member/components'
import { batchUpdateMemberTags } from '@/member/apis'

defineOptions({
  name: 'MemberTagSetupModal',
})

const props = defineProps<{
  ids: IMember['id'][]
}>()
const emit = defineEmits(['success'])

const visible = ref(false)
const selected = ref<number[]>([])

function handleSubmit(done: any) {
  batchUpdateMemberTags(props.ids, selected.value)
    .then(() => {
      useMessage({
        onClose: () => {
          emit('success', selected.value)
          done()
        },
      }).success('设置成功')
    })
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    title="设置会员标签"
    ok-text="设置"
    @before-ok="handleSubmit"
  >
    <span @click="visible = true">
      <slot />
    </span>

    <template #modal>
      <MemberTagCheckbox v-model="selected" />
    </template>
  </CommonModal>
</template>
