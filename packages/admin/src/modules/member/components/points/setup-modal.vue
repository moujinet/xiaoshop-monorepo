<script lang="ts" setup>
// import { batchUpdateMemberAccount } from '@/member/apis'

defineOptions({
  name: 'MemberPointsSetupModal',
})

// const props = defineProps<{
//   ids: IMember['id'][]
// }>()
// const emit = defineEmits(['success'])

const formRef = ref()
const visible = ref(false)
const form = reactive({
  operator: '',
  points: 0,
  reason: '',
})

function handleSubmit() {
// batchUpdateMemberAccount(props.ids, form).then(() => {
//   useMessage({
//     onClose: () => {
//       emit('success')
//       done()
//     },
//   }).success('设置成功')
// })
}
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    title="设置会员积分"
    ok-text="设置"
    :disable-ok="form.points === 0"
    @before-ok="handleSubmit"
  >
    <span @click="visible = true">
      <slot />
    </span>

    <template #modal>
      <a-form ref="formRef" :model="form" scroll-to-first-error>
        <a-form-item field="operator" label="操作类型" show-colon>
          <div class="form-item">
            <!-- <a-radio-group v-model="form.operator">
              <a-radio v-for="opt in MEMBER_POINTS_OPERATORS" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </a-radio>
            </a-radio-group> -->
          </div>
        </a-form-item>

        <a-form-item field="points" label="变更积分" show-colon>
          <div class="form-item-sm">
            <FormNumberInput v-model="form.points">
              <template #suffix>
                点
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item field="reason" label="变更原因" show-colon>
          <div class="form-item">
            <a-textarea v-model="form.reason" placeholder="请输入变更原因" />
          </div>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
