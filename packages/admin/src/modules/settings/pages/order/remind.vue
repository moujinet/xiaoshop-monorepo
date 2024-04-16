<script lang="ts" setup>
defineOptions({
  name: 'OrderRemindPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('order'),
    [
      'enablePayouts',
      'enablePayoutsAudit',
      'enableAutoTransfer',
      'transferChargeRate',
      'minPayoutsAmount',
      'maxPayoutsAmount',
      'payoutsType',
    ],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="提醒设置">
      <a-form
        :model="form"
        scroll-to-first-error
      >
        <a-form-item field="enablePayouts" label="是否启用提现" tooltip="会员可以将现金余额账户的金额申请提现" show-colon>
          <a-switch v-model="form.enablePayouts" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item field="enablePayoutsAudit" label="提现审核" show-colon>
          <a-switch v-model="form.enablePayoutsAudit" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item field="enableAutoTransfer" label="自动转账" tooltip="只有微信和支付宝支付支持自动转账" show-colon>
          <a-switch v-model="form.enableAutoTransfer" checked-text="启用" unchecked-text="关闭" />
        </a-form-item>

        <a-form-item field="transferChargeRate" label="提现手续费比率" tooltip="比率必须为 0-100 的整数" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.transferChargeRate" placeholder="请输入提现手续费比率">
              <template #suffix>
                %
              </template>
            </a-input>
          </div>
        </a-form-item>

        <a-form-item field="minPayoutsAmount" label="最低提现额度" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.minPayoutsAmount" placeholder="请输入最低提现额度">
              <template #suffix>
                元
              </template>
            </a-input>
          </div>
        </a-form-item>

        <a-form-item field="maxPayoutsAmount" label="最高提现额度" show-colon>
          <div class="form-item-xs">
            <a-input v-model="form.maxPayoutsAmount" placeholder="请输入最高提现额度">
              <template #suffix>
                元
              </template>
            </a-input>
          </div>
        </a-form-item>

        <a-form-item field="payoutsType" label="转账方式" show-colon>
          <a-checkbox-group v-model="form.payoutsType">
            <a-checkbox value="card">
              银行卡
            </a-checkbox>
            <a-checkbox value="alipay">
              支付宝
            </a-checkbox>
            <a-checkbox value="wepay">
              微信零钱
            </a-checkbox>
          </a-checkbox-group>
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
