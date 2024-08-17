<script lang="ts" setup>
defineOptions({
  name: 'MemberSettingsLogoutPage',
})

const { getOptions, updateOptions } = useSettings()

const form = reactive(
  getOptions(
    'member.logout',
    {},
    [
      'enableLogout',
      'enableAudit',
    ],
  ),
)

const { loading, onUpdate } = updateOptions('member.logout', form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <FormGroup title="会员注销">
        <a-form-item field="enableLogout" label="是否允许注销" show-colon>
          <div class="form-item">
            <a-switch v-model="form.enableLogout" checked-text="启用" unchecked-text="关闭" />
          </div>
        </a-form-item>

        <a-form-item field="enableAudit" label="注销审核" :disabled="!form.enableLogout" show-colon>
          <div class="form-item">
            <a-switch v-model="form.enableAudit" checked-text="启用" unchecked-text="关闭" />
          </div>
        </a-form-item>
      </FormGroup>

      <a-form-item>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
