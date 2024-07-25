<script lang="ts" setup>
defineOptions({
  name: 'AssetsSettingsCloudIndexPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('upload.storage.aliyun', {}, ['enable']))
const { loading, onUpdate } = updateOptions('upload.storage.aliyun', form)
</script>

<template>
  <CommonContainer>
    <CommonGrid>
      <CommonSwitchCard
        v-model:enable="form.enable"
        title="阿里云 OSS"
        icon="mingcute:server-2"
        desc="启用阿里云 OSS 后, 会自动将图片上传至阿里云 OSS, 不占用服务器资源"
        :loading="loading"
        @change="onUpdate"
      >
        <a-button size="small" type="text" @click="$router.push('/assets/settings/cloud/aliyun')">
          接口设置
        </a-button>
      </CommonSwitchCard>
    </CommonGrid>
  </CommonContainer>
</template>
