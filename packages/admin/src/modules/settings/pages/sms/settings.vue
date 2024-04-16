<script lang="ts" setup>
defineOptions({
  name: 'SmsSettingsPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('sms'),
    ['enableAliyunSms', 'aliyunSmsAppKey', 'aliyunSmsSecretKey', 'aliyunSmsSign'],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="阿里云短信服务配置">
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item
          field="enableAliyunSms"
          label="阿里云短信服务"
          show-colon
        >
          <a-switch v-model="form.enableAliyunSms" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <template v-if="form.enableAliyunSms">
          <a-form-item field="aliyunSmsAppKey" label="APP_KEY" show-colon required>
            <div class="form-item">
              <a-input
                v-model="form.aliyunSmsAppKey"
                placeholder="请输入 APP_KEY"
              />
            </div>
          </a-form-item>

          <a-form-item field="aliyunSmsSecretKey" label="SECRET_KEY" show-colon required>
            <div class="form-item">
              <a-input
                v-model="form.aliyunSmsSecretKey"
                placeholder="请输入 SECRET_KEY"
              />
            </div>
          </a-form-item>

          <a-form-item field="aliyunSmsSign" label="短信内容签名" show-colon required>
            <div class="form-item">
              <a-input
                v-model="form.aliyunSmsSign"
                placeholder="请输入短信内容签名"
              />
            </div>
          </a-form-item>
        </template>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
