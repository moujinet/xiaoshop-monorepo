<script lang="ts" setup>
defineOptions({
  name: 'PaymentAlipayPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('payment'),
    [
      'enableAlipay',
      'enableAlipayRefund',
      'enableAlipayTransfer',
      'alipayApiMode',
      'alipayAppId',
      'alipayAppPrivateKey',
      'alipayAppPublicKey',
      'alipayPublicKey',
      'alipayAppCertPublicKeyFile',
      'alipayCertPublicKeyFile',
      'alipayRootCertFile',
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
        <FormGroup title="支付宝">
          <a-form-item field="enableAlipay" label="使用支付宝支付" show-colon>
            <a-switch v-model="form.enableAlipay" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>

          <a-form-item field="enableAlipayRefund" label="使用支付宝退款" show-colon :disabled="!form.enableAlipay">
            <a-switch v-model="form.enableAlipayRefund" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>

          <a-form-item field="enableAlipayTransfer" label="使用支付宝转账" show-colon :disabled="!form.enableAlipay">
            <a-switch v-model="form.enableAlipayTransfer" checked-text="启用" unchecked-text="关闭" />
          </a-form-item>
        </FormGroup>

        <FormGroup v-if="form.enableAlipay" title="支付宝 API 配置">
          <a-form-item field="alipayAppId" label="支付宝应用ID" tooltip="[API_ID]支付宝分配给开发者的应用ID" show-colon>
            <div class="form-item">
              <a-input v-model="form.alipayAppId" placeholder="请输入支付宝应用ID" />
            </div>
          </a-form-item>

          <a-form-item field="alipayApiMode" label="加签模式" tooltip="支付宝配置规则加签模式" show-colon>
            <a-radio-group v-model="form.alipayApiMode" type="button">
              <a-radio value="key">
                公钥
              </a-radio>
              <a-radio value="cert">
                证书
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item field="alipayAppPrivateKey" label="应用私钥" show-colon>
            <div class="form-item">
              <a-textarea v-model="form.alipayAppPrivateKey" placeholder="请输入应用私钥" allow-clear />
            </div>
          </a-form-item>

          <template v-if="form.alipayApiMode === '1'">
            <a-form-item field="alipayAppPublicKey" label="应用公钥" show-colon>
              <div class="form-item">
                <a-textarea v-model="form.alipayAppPublicKey" placeholder="请输入应用公钥" allow-clear />
              </div>
            </a-form-item>

            <a-form-item field="alipayPublicKey" label="支付宝公钥" show-colon>
              <div class="form-item">
                <a-textarea v-model="form.alipayPublicKey" placeholder="请输入支付宝公钥" allow-clear />
              </div>
            </a-form-item>
          </template>

          <template v-else>
            <a-form-item field="alipayAppCertPublicKeyFile" label="应用公钥证书" tooltip="上传 appCertPublicKey 文件" show-colon>
              <a-upload action="/" />
            </a-form-item>

            <a-form-item field="alipayCertPublicKeyFile" label="支付宝公钥证书" tooltip="上传 alipayCertPublicKey 文件" show-colon>
              <a-upload action="/" />
            </a-form-item>

            <a-form-item field="alipayRootCertFile" label="支付宝根证书" tooltip="上传 alipayRootCert 文件" show-colon>
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
