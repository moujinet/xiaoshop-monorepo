<script lang="ts" setup>
defineOptions({
  name: 'OthersVerifyCodePage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('others'),
    ['enableAdminLoginVerifyCode', 'enableLoginVerifyCode', 'enableRegisterVerifyCode'],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="验证码设置">
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item
          field="enableAdminLoginVerifyCode"
          label="登录管理后台"
          tooltip="开启后, 登录管理后台时将需要输入验证码"
          show-colon
        >
          <a-switch v-model="form.enableAdminLoginVerifyCode" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item
          field="enableLoginVerifyCode"
          label="用户登录"
          tooltip="开启后, 用户登录时将需要输入验证码"
          show-colon
        >
          <a-switch v-model="form.enableLoginVerifyCode" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item
          field="enableRegisterVerifyCode"
          label="用户注册"
          tooltip="开启后, 用户注册时将需要输入验证码"
          show-colon
        >
          <a-switch v-model="form.enableRegisterVerifyCode" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
