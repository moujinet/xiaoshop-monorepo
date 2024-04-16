<script lang="ts" setup>
defineOptions({
  name: 'RegisterSettingsPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('register'),
    [
      'enableUsernameLogin',
      'enableMobileLogin',
      'enable3rdLogin',
      'enableBindingMobile',
      'passwordLength',
      'passwordStrong',
    ],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-form :model="form" scroll-to-first-error>
        <FormGroup title="登录/注册方式" tips="第三方平台是指微信公众号, 微信小程序, 支付宝小程序, 微博, QQ等平台。">
          <a-form-item field="enableUsernameLogin" label="用户名" tooltip="通过「用户名」+「密码」的注册登录方式" show-colon>
            <div class="form-item">
              <a-switch v-model="form.enableUsernameLogin" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>
          <a-form-item field="enableMobileLogin" label="手机号" tooltip="通过「手机号」+「动态验证码」的注册登录方式" show-colon>
            <div class="form-item">
              <a-switch v-model="form.enableMobileLogin" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>
          <a-form-item field="enable3rdLogin" label="第三方平台登录" tooltip="通过「第三方平台」授权的注册登录方式" show-colon>
            <div class="form-item">
              <a-switch v-model="form.enable3rdLogin" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="第三方平台注册设置">
          <a-form-item
            field="enableBindingMobile"
            label="强制绑定手机"
            tooltip="为了实现不同的第三方平台用户账户的统一，需要在注册过程中强制绑定用户手机，通过手机实现微信平台与支付宝平台，抖音平台等账号的统一。开启之后在对应会员相关页面会引导会员绑定手机账号。"
            show-colon
            :disabled="!form.enable3rdLogin"
          >
            <div class="form-item">
              <a-switch
                v-model="form.enableBindingMobile"
                checked-text="是"
                unchecked-text="否"
              />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="密码设置">
          <a-form-item
            field="passwordLength"
            label="密码长度"
            tooltip="新用户注册时密码最小长度, 常用长度为 6~12 位"
            show-colon
          >
            <div class="form-item-xs">
              <a-input v-model="form.passwordLength" placeholder="请输入密码长度" />
            </div>
          </a-form-item>
          <a-form-item
            field="passwordStrong"
            label="密码复杂度"
            tooltip="根据选项设置密码复杂程度，如果不勾选，则密码无限制"
            show-colon
          >
            <a-checkbox-group v-model="form.passwordStrong">
              <a-checkbox value="number">
                数字
              </a-checkbox>
              <a-checkbox value="lower">
                小写字母
              </a-checkbox>
              <a-checkbox value="upper">
                大写字母
              </a-checkbox>
              <a-checkbox value="special">
                特殊字符
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </FormGroup>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
