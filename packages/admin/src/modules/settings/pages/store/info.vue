<script lang="ts" setup>
import { AssetsBrowser } from '@/assets/components'

defineOptions({
  name: 'SettingsStoreInfoPage',
})

const { getOptions, updateOptions } = useSettings()

const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入店铺名称',
    },
  ],
}

const form = reactive(
  getOptions(
    'store',
    {},
    ['name', 'logo', 'tel', 'enableH5', 'enableWeapp'],
  ),
)
const { loading, onUpdate } = updateOptions('store', form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :rules="rules"
      :model="form"
      :loading="loading"
      title="基本信息"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <a-form-item field="name" label="店铺名称" tooltip="店铺名称在管理端展示, 包括登录页及后台所有页面" show-colon>
        <div class="form-item">
          <a-input
            v-model="form.name"
            placeholder="请输入店铺名称"
          />
        </div>
      </a-form-item>

      <a-form-item field="logo" label="店铺 LOGO" tooltip="图片尺寸 200*200, 图片格式 jpg/png, 大小不超过 1MB" show-colon>
        <AssetsBrowser v-model:file="form.logo" />
      </a-form-item>

      <a-form-item field="tel" label="服务电话" show-colon>
        <div class="form-item">
          <a-input
            v-model="form.tel"
            placeholder="请输入服务电话"
          />
        </div>
      </a-form-item>

      <a-form-item
        field="enableWeapp"
        label="微信小程序"
        tooltip="关闭状态时, 用户将无法访问微信小程序"
        show-colon
      >
        <a-switch v-model="form.enableWeapp" checked-text="启用" unchecked-text="关闭" />
      </a-form-item>

      <a-form-item
        field="enableH5"
        label="手机 H5 端"
        tooltip="关闭状态时, 用户将无法访问店铺 H5 端"
        show-colon
      >
        <a-switch v-model="form.enableH5" checked-text="启用" unchecked-text="关闭" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
