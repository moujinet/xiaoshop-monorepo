<script lang="ts" setup>
defineOptions({
  name: 'GoodsSettingsClawerPage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(getOptions('shop.goods', {}, ['clawerApiKey']))
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
          1. 本功能集成了第三方商品抓取服务, 可直接通过抓取服务抓取商品信息<br>
          2. 第三方商品抓取服务必须先自行注册, 否则无法使用<br>
          3. 注册第三方商品抓取服务后, 进入用户中心复制 API KEY 并完成配置<br>
          4. 第三方商品抓取服务, 目前仅支持淘宝、天猫、京东及 1688<br>
        </p>

        <a-button size="small" type="outline">
          前往注册
        </a-button>
      </a-alert>

      <FormGroup title="采集接口" size="medium">
        <a-form-item field="clawerApiKey" label="API KEY" show-colon>
          <a-input v-model="form.clawerApiKey" placeholder="请填写 API KEY" allow-clear />
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
