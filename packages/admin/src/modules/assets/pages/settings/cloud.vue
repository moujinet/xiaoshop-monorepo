<script lang="ts" setup>
defineOptions({
  name: 'AssetsSettingsCloudPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive<IKeyValue>(getOptions('app.assets', {}))
const { loading, onUpdate } = updateOptions('app.assets', form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <a-alert title="温馨提示" class="mb-5">
        1. 阿里云 OSS 必须先创建 Bucket 后才能使用<br>
        2. 启用阿里云 OSS 后, 会自动将图片上传至阿里云 OSS, 不占用服务器资源<br>
        3. 启用阿里云 OSS 后, 图片处理中的设置依然有效, 但您依然可以使用 OSS 对图片进行处理
      </a-alert>

      <FormGroup title="阿里云 OSS 设置" size="medium">
        <a-form-item field="enableAliyunOSS" label="启用阿里云 OSS" show-colon>
          <a-switch v-model="form.enableAliyunOSS" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <template v-if="form.enableAliyunOSS">
          <a-form-item field="aliyunOSSAccessKeyID" label="AccessKeyID" show-colon>
            <a-input v-model="form.aliyunOSSAccessKeyID" placeholder="请输入" />

            <template #extra>
              阿里云 Access Key 管理的 (ID)
            </template>
          </a-form-item>

          <a-form-item field="aliyunOSSAccessKeySecret" label="AccessKeySecret" show-colon>
            <a-input v-model="form.aliyunOSSAccessKeySecret" placeholder="请输入" />

            <template #extra>
              Access Key Secret 是您访问阿里云 API 的密钥, 具有该账户完全的权限, 请您妥善保管。
            </template>
          </a-form-item>

          <a-form-item field="aliyunOSSBucket" label="Bucket" show-colon>
            <a-input v-model="form.aliyunOSSBucket" placeholder="请输入" />

            <template #extra>
              与「阿里云 OSS」开通对象名称一致
            </template>
          </a-form-item>

          <a-form-item field="aliyunOSSEndpoint" label="Endpoint" show-colon>
            <a-input v-model="form.aliyunOSSEndpoint" placeholder="请输入" />

            <template #extra>
              Bucket 地域 endpoint
            </template>
          </a-form-item>

          <a-form-item field="enableAliyunOSSCustomDomain" label="自定义域名" show-colon>
            <a-switch v-model="form.enableAliyunOSSCustomDomain" checked-text="启用" unchecked-text="关闭" />

            <template #extra>
              建议开启
            </template>
          </a-form-item>

          <a-form-item v-if="form.enableAliyunOSSCustomDomain" field="aliyunOSSCustomDomain" label="域名" show-colon>
            <a-input v-model="form.aliyunOSSCustomDomain" placeholder="请输入" />

            <template #extra>
              域名格式: http://your.domain.com/
            </template>
          </a-form-item>
        </template>
      </FormGroup>

      <a-form-item>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
