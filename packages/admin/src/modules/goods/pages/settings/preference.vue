<script lang="ts" setup>
import { AssetsBrowser } from '@/assets/components'

defineOptions({
  name: 'GoodsSettingsPreferencePage',
})

const { getOptions, updateOptions } = useSettings()
const form = reactive(
  getOptions(
    'goods.preference',
    {},
    ['enableGoodsStock', 'enableGoodsSales', 'enableGoodsOriginalPrice', 'defaultGoodsImage'],
  ),
)
const { loading, onUpdate } = updateOptions('goods.preference', form)
</script>

<template>
  <CommonContainer>
    <FormCard
      :model="form"
      :loading="loading"
      scroll-to-first-error
      @submit="onUpdate"
    >
      <FormGroup title="显示设置">
        <a-form-item field="enableGoodsStock" label="商品库存" show-colon>
          <a-switch v-model="form.enableGoodsStock" checked-text="显示" unchecked-text="隐藏" />
        </a-form-item>

        <a-form-item field="enableGoodsSales" label="商品销量" show-colon>
          <a-switch v-model="form.enableGoodsSales" checked-text="显示" unchecked-text="隐藏" />
        </a-form-item>

        <a-form-item field="enableGoodsOriginalPrice" label="商品划线价" show-colon>
          <a-switch v-model="form.enableGoodsOriginalPrice" checked-text="显示" unchecked-text="隐藏" />
        </a-form-item>
      </FormGroup>

      <FormGroup title="商品图片">
        <a-form-item field="defaultGoodsImage" label="默认商品图片" tooltip="商品未上传图片时或加载失败时，显示的默认图片" show-colon>
          <AssetsBrowser v-model:file="form.defaultGoodsImage" />
        </a-form-item>
      </FormGroup>

      <a-form-item>
        <a-button type="primary" html-type="submit" size="large">
          保存
        </a-button>
      </a-form-item>
    </FormCard>
  </CommonContainer>
</template>
