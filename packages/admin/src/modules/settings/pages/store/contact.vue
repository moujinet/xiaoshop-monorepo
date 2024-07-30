<script lang="ts" setup>
defineOptions({
  name: 'SettingsStoreContactPage',
})

const { getOptions, updateOptions } = useSettings()

const rules: IFormRules = {
  contact: [
    {
      required: true,
      message: '请输入联系人',
    },
  ],
  contactMobile: [
    {
      required: true,
      message: '请输入联系人手机',
    },
  ],
}

const form = reactive(
  getOptions(
    'store',
    {},
    ['contact', 'contactMobile', 'contactPhone', 'location', 'address', 'email'],
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
      title="联系方式"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <a-form-item field="contact" label="联系人" show-colon>
        <div class="form-item-sm">
          <a-input v-model="form.contact" class="half-w" placeholder="请输入联系人" />
        </div>
      </a-form-item>

      <a-form-item field="contactMobile" label="联系人手机" show-colon>
        <div class="form-item-sm">
          <a-input v-model="form.contactMobile" placeholder="请输入联系人手机" />
        </div>
      </a-form-item>

      <a-form-item field="contactPhone" label="联系电话" show-colon>
        <div class="form-item-sm">
          <a-input v-model="form.contactPhone" placeholder="请输入联系电话" />
        </div>
      </a-form-item>

      <a-form-item field="location" label="联系地址" show-colon>
        <div class="form-item-full">
          <div class="form-item-sm">
            <FormLocationSelector v-model="form.location" />
          </div>

          <div class="form-item mt-2">
            <a-input-group class="w-full">
              <a-input v-model="form.address" placeholder="请输入详细地址" />

              <a-button type="primary" @click="console.log(form.location)">
                <template #icon>
                  <CommonIcon name="mingcute:location" class="text-4" :inline="false" />
                </template>

                定位
              </a-button>
            </a-input-group>
          </div>

          <div class="map" />
        </div>
      </a-form-item>

      <a-form-item field="email" label="电子邮箱" show-colon>
        <div class="form-item-sm">
          <a-input v-model="form.email" placeholder="请输入电子邮箱" />
        </div>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" size="large">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>

<style lang="less" scoped>
.map {
  width: 90%;
  height: 400px;
  margin-top: var(--page-padding-sm);
  background-color: var(--color-fill-2);
}
</style>
