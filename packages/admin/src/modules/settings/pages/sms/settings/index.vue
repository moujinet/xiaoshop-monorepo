<script lang="ts" setup>
defineOptions({
  name: 'SettingsSmsSettingsIndexPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('sms', {}, ['enableAliyun']))
const { loading, onUpdate } = updateOptions('sms', form)
</script>

<template>
  <CommonContainer>
    <div grid="~ cols-3 gap-4">
      <CommonSwitchCard
        v-model:enable="form.enableAliyun"
        title="阿里云 SMS"
        icon="mingcute:message-3"
        desc="启用阿里云 SMS 后, 短信通知功能可用。"
        :loading="loading"
        @change="onUpdate"
      >
        <a-button size="small" type="text" @click="$router.push('/settings/sms/settings/aliyun')">
          接口设置
        </a-button>
      </CommonSwitchCard>
    </div>
  </CommonContainer>
</template>
