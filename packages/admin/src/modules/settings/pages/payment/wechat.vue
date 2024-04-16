<script lang="ts" setup>
defineOptions({
  name: 'PaymentWechatPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('payment'),
    [
      'enableWepay',
      'enableWepayRefund',
      'enableWepayTransfer',
      'wepayAppId',
      'wepayApiVer',
      'wepayApiV2Key',
      'wepayApiV3Key',
      'enableWepayCert',
      'wepayApiClientCert',
      'wepayApiClientKey',
    ],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <FormGroup title="微信支付">
          <a-form-item field="enableWepay" label="使用微信支付" show-colon>
            <a-switch v-model="form.enableWepay" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>

          <a-form-item field="enableWepayRefund" label="使用微信退款" show-colon :disabled="!form.enableWepay">
            <a-switch v-model="form.enableWepayRefund" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>

          <a-form-item field="enableWepayTransfer" label="使用微信转账" show-colon :disabled="!form.enableWepay">
            <a-switch v-model="form.enableWepayTransfer" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>
        </FormGroup>

        <FormGroup v-if="form.enableWepay" title="微信支付 API 配置">
          <a-form-item field="wepayAppId" label="商户号" tooltip="[MCHID]微信支付商户号" show-colon>
            <div class="form-item">
              <a-input v-model="form.wepayAppId" placeholder="请输入商户号" />
            </div>
          </a-form-item>

          <a-form-item field="wepayApiVer" label="支付接口版本" show-colon>
            <a-radio-group v-model="form.wepayApiVer" type="button">
              <a-radio value="v2">
                V2
              </a-radio>
              <a-radio value="v3">
                V3
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-if="form.wepayApiVer === 'v2'" field="wepayApiV2Key" label="APIv2密钥" show-colon>
            <div class="form-item">
              <a-input v-model="form.wepayApiV2Key" placeholder="请输入APIv2密钥" />
            </div>

            <template #extra>
              <div>
                微信商户 APIv2 密钥
                <a-link font="size-12px!" theme="primary" hover="color" size="small" href="https://kf.qq.com/faq/180830UVRZR7180830Ij6ZZz.html" target="_blank">
                  查看详情
                </a-link>
              </div>
            </template>
          </a-form-item>

          <a-form-item v-if="form.wepayApiVer === 'v3'" field="wepayApiV3Key" label="APIv3密钥" show-colon>
            <div class="form-item">
              <a-input v-model="form.wepayApiV3Key" placeholder="请输入APIv3密钥" />
            </div>

            <template #extra>
              <div>
                微信商户 APIv3 密钥
                <a-link font="size-12px!" theme="primary" hover="color" size="small" href="https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html" target="_blank">
                  查看详情
                </a-link>
              </div>
            </template>
          </a-form-item>

          <a-form-item field="enableWepayCert" label="支付证书" show-colon>
            <div class="form-item" flex="~ 1 v-center">
              <a-checkbox v-model="form.enableWepayCert">
                使用支付证书
              </a-checkbox>
            </div>
          </a-form-item>

          <template v-if="form.enableWepayCert">
            <a-form-item field="wepayApiClientCert" label="支付证书Cert" tooltip="上传 apiclient_cert.pem 文件" show-colon>
              <a-upload action="/" />
            </a-form-item>

            <a-form-item field="wepayApiClientKey" label="支付证书Key" tooltip="上传 apiclient_key.pem 文件" show-colon>
              <a-upload action="/" />
            </a-form-item>
          </template>
        </FormGroup>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
