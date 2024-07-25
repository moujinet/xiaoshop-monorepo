<script lang="ts" setup>
defineOptions({
  name: 'AssetsSettingsUploadPage',
})

const groupKey = 'upload'
const { getOptions, updateOptions } = useSettings()

const form = reactive(
  getOptions(groupKey, {}, ['maxFileSizeImage', 'maxFileSizeVideo', 'customDomain']),
)

const { loading, onUpdate } = updateOptions(groupKey, form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <FormGroup title="文件上传">
        <a-form-item field="maxFileSizeImage" label="允许上传图片大小" tooltip="0 为不限制" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.maxFileSizeImage" placeholder="请输入">
              <template #suffix>
                KB
              </template>
            </a-input>
          </div>
        </a-form-item>

        <a-form-item field="maxFileSizeVideo" label="允许上传视频大小" tooltip="0 为不限制" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.maxFileSizeVideo" placeholder="请输入">
              <template #suffix>
                KB
              </template>
            </a-input>
          </div>
        </a-form-item>
      </FormGroup>

      <FormGroup title="资源访问">
        <a-form-item field="customDomain" label="自定义域名" show-colon>
          <div class="form-item">
            <a-input v-model="form.customDomain" placeholder="https://your.domain.com" />
          </div>

          <template #extra>
            必须正确绑定域名，否则素材资源将无法访问。此功能仅针对本地存储，不适用于云存储。
          </template>
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
