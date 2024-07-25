<script lang="ts" setup>
defineOptions({
  name: 'SmsSettingsAliyunPage',
})

const { getOption, getOptions, updateOptions } = useSettings()
const form = reactive(
  getOptions(
    'sms',
    {},
    ['appKey', 'secretKey', 'sign'],
  ),
)
const { loading, onUpdate } = updateOptions('sms', form)
const enableAliyun = getOption('sms.enableAliyun', false)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      title="阿里云短信服务配置"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <template v-if="enableAliyun">
        <a-form-item field="appKey" label="APP_KEY" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.appKey"
              placeholder="请输入 APP_KEY"
            />
          </div>
        </a-form-item>

        <a-form-item field="secretKey" label="SECRET_KEY" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.secretKey"
              placeholder="请输入 SECRET_KEY"
            />
          </div>
        </a-form-item>

        <a-form-item field="sign" label="短信内容签名" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.sign"
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
    </FormCard>
  </CommonContainer>
</template>
