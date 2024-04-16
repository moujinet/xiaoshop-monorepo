<script lang="ts" setup>
defineOptions({
  name: 'OthersMapPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('others'),
    ['qqMapKey', 'enableMobileLocation', 'mobileLocationExpire'],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="腾讯地图设置">
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item field="qqMapKey" label="腾讯地图 KEY" tooltip="平台腾讯定位地图应用KEY" show-colon>
          <div class="form-item">
            <a-input
              v-model="form.qqMapKey"
              placeholder="腾讯地图 KEY"
            />
          </div>

          <template #extra>
            <a-link font="size-12px!" theme="primary" hover="color" size="small" href="https://lbs.qq.com/dev/console/key/manage" target="_blank">
              获取密钥
            </a-link>
          </template>
        </a-form-item>

        <a-form-item field="enableMobileLocation" label="手机端定位" tooltip="开启后会在手机端显示当前位置" show-colon>
          <div class="form-item">
            <a-switch v-model="form.enableMobileLocation" checked-text="启用" unchecked-text="关闭" />
          </div>
        </a-form-item>

        <a-form-item field="mobileLocationExpire" label="定位有效期" tooltip="过期后将重新获取定位信息, 0 为不过期" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.mobileLocationExpire" placeholder="请输入定位有效期">
              <template #suffix>
                分钟
              </template>
            </a-input>
          </div>
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
