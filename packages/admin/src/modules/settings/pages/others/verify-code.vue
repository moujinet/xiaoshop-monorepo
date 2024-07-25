<script lang="ts" setup>
defineOptions({
  name: 'OthersVerifyCodePage',
})

const { getOptions, updateOptions } = useSettings()

const form = reactive(
  getOptions('verifyCode', {}, ['enableOnAdminLogin', 'enableOnLogin', 'enableOnRegister']),
)

const { loading, onUpdate } = updateOptions('verifyCode', form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      title="验证码设置"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <a-form-item
        field="enableOnAdminLogin"
        label="登录管理后台"
        tooltip="开启后, 登录管理后台时将需要输入验证码"
        show-colon
      >
        <a-switch v-model="form.enableOnAdminLogin" checked-text="启用" unchecked-text="关闭" />
      </a-form-item>

      <a-form-item
        field="enableOnLogin"
        label="用户登录"
        tooltip="开启后, 用户登录时将需要输入验证码"
        show-colon
      >
        <a-switch v-model="form.enableOnLogin" checked-text="启用" unchecked-text="关闭" />
      </a-form-item>

      <a-form-item
        field="enableOnRegister"
        label="用户注册"
        tooltip="开启后, 用户注册时将需要输入验证码"
        show-colon
      >
        <a-switch v-model="form.enableOnRegister" checked-text="启用" unchecked-text="关闭" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
