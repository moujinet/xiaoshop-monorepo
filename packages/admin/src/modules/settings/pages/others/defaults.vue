<script lang="ts" setup>
defineOptions({
  name: 'OthersDefaultsPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('others'),
    ['defaultGoodsImage', 'defaultUserAvatar'],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="默认图片">
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item field="defaultGoodsImage" label="默认商品图片" tooltip="默认商品图针对默认商品数据的商品图片" show-colon>
          <a-upload action="/" />
        </a-form-item>

        <a-form-item field="defaultUserAvatar" label="默认会员头像" tooltip="没有上传头像的会员会展示该默认图" show-colon>
          <a-upload action="/" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
