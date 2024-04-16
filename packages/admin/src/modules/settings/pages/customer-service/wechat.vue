<script lang="ts" setup>
defineOptions({
  name: 'CustomerServiceWechatPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('cs'),
    [
      'weappType',
      'weappWxWorkCropId',
      'weappWxWorkUrl',
    ],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="配置微信小程序客服">
      <a-form
        :model="form"
        max-w-900px
        scroll-to-first-error
      >
        <a-form-item field="weappType" label="客服类型" show-colon>
          <a-radio-group v-model="form.weappType" type="button">
            <a-radio value="none">
              不启用
            </a-radio>
            <a-radio value="system">
              云链客服
            </a-radio>
            <a-radio value="weapp">
              小程序客服
            </a-radio>
            <a-radio value="wxwork">
              企业微信客服
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <template v-if="form.weappType === 'wxwork'">
          <a-form-item field="weappWxWorkCropId" label="企业 ID" show-colon required>
            <div class="form-item">
              <a-input v-model="form.weappWxWorkCropId" placeholder="请输入企业 ID" />
            </div>
          </a-form-item>

          <a-form-item field="weappWxWorkUrl" label="企微客服连接" show-colon required>
            <div class="form-item">
              <a-input v-model="form.weappWxWorkUrl" placeholder="请输入企微客服连接" />
            </div>

            <template #extra>
              <div>
                小程序中如何接入企业微信客服请查看
                <a-link font="size-12px!" theme="primary" hover="color" size="small" href="https://work.weixin.qq.com/nl/act/p/a733314375294bdd" target="_blank">
                  《在小程序中接入》
                </a-link>
              </div>
            </template>
          </a-form-item>
        </template>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
