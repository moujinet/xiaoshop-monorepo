<script lang="ts" setup>
defineOptions({
  name: 'GoodsSettingsDeliveryTrackingPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('shop.goods', {}, ['kd100AppKey', 'kd100Customer']))
const { loading, onUpdate } = updateOptions('shop.goods', form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <a-alert title="用户须知" class="mb-5">
        <p>
          1. 本功能集成了「快递100」第三方物流跟踪服务<br>
          2. 第三方物流跟踪服务必须先自行注册, 否则无法使用<br>
        </p>
      </a-alert>

      <FormGroup title="快递 100 接口设置" size="medium">
        <a-form-item field="kd100AppKey" label="应用密钥" show-colon>
          <a-input v-model="form.kd100AppKey" placeholder="请填写应用密钥 APP KEY" allow-clear />
        </a-form-item>

        <a-form-item field="kd100Customer" label="公司编号" show-colon>
          <a-input v-model="form.kd100Customer" placeholder="请填写公司编号 CUSTOMER" allow-clear />
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
