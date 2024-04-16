<script lang="ts" setup>
defineOptions({
  name: 'OrderSettingsPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('order'),
    [
      'enableBalance',
      'autoCloseOrderExpire',
      'autoDeliverOrderExpire',
      'autoCompleteOrderExpire',
      'allowRefundExpire',
      'refundMethod',
      'enableComment',
      'enableDisplayComment',
      'enableCommentAudit',
      'taxRate',
      'invoiceFee',
      'invoiceCategories',
      'invoiceType',
    ],
  ),
)

function handleAddInvoiceCategory() {
  form.invoiceCategories.push('')
}

function handleRemoveInvoiceCategory(index: number) {
  form.invoiceCategories.splice(index, 1)
}
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-form :model="form" scroll-to-first-error>
        <FormGroup title="余额支付">
          <a-form-item
            field="enableBalance"
            label="启用状态"
            tooltip="当启用余额支付，在客户端待支付订单会显示使用余额，反之，则不显示。"
            show-colon
          >
            <div class="form-item">
              <a-switch v-model="form.enableBalance" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="订单设置">
          <a-form-item
            field="autoCloseOrderExpire"
            label="未付款自动关闭时间"
            tooltip="订单创建后多长时间未付款自动关闭"
            show-colon
          >
            <div class="form-item-xs">
              <a-input v-model="form.autoCloseOrderExpire" placeholder="请输入未付款自动关闭时间">
                <template #suffix>
                  天
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item
            field="autoDeliverOrderExpire"
            label="发货后自动收货时间"
            tooltip="订单发货后多长时间后自动收货"
            show-colon
          >
            <div class="form-item-xs">
              <a-input v-model="form.autoDeliverOrderExpire" placeholder="请输入发货后自动收货时间">
                <template #suffix>
                  天
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item
            field="autoCompleteOrderExpire"
            label="收货后自动完成时间"
            tooltip="收货后, 多长时间订单自动完成, 设置为 0 时表示订单收货后立即完成"
            show-colon
          >
            <div class="form-item-xs">
              <a-input v-model="form.autoCompleteOrderExpire" placeholder="请输入收货后自动完成时间">
                <template #suffix>
                  天
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item
            field="allowRefundExpire"
            label="完成后可维权时间"
            tooltip="订单完成后, 多长时间内可申请维权, 设置为 0 则订单完成后不可维权"
            show-colon
          >
            <div class="form-item-xs">
              <a-input v-model="form.allowRefundExpire" placeholder="请输入完成后可维权时间">
                <template #suffix>
                  天
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item
            field="refundMethod"
            label="主动退款设置"
            show-colon
          >
            <div class="form-item">
              <a-radio-group v-model="form.refundMethod" direction="vertical">
                <a-radio value="direct">
                  直接确认退款
                </a-radio>
                <a-radio value="apply">
                  发起退款申请
                </a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="评价设置">
          <a-form-item
            field="enableComment"
            label="订单评价"
            tooltip="开启订单评价功能"
            show-colon
          >
            <div class="form-item">
              <a-switch v-model="form.enableComment" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>

          <a-form-item
            :disabled="!form.enableComment"
            field="enableDisplayComment"
            label="显示评价"
            tooltip="客户端商品详情是否显示评价"
            show-colon
          >
            <div class="form-item">
              <a-switch v-model="form.enableDisplayComment" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>

          <a-form-item
            :disabled="!form.enableComment"
            field="enableCommentAudit"
            label="评价审核"
            tooltip="评价是否需要后台审核"
            show-colon
          >
            <div class="form-item">
              <a-switch v-model="form.enableCommentAudit" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>
        </FormGroup>

        <FormGroup title="发票设置">
          <a-form-item
            field="enableComment"
            label="提供发票"
            show-colon
            required
          >
            <div class="form-item">
              <a-switch v-model="form.enableComment" checked-text="启用" unchecked-text="关闭" />
            </div>
          </a-form-item>

          <a-form-item
            field="taxRate"
            label="发票税率"
            show-colon
            required
          >
            <div class="form-item-xs">
              <a-input v-model="form.taxRate" placeholder="请输入发票税率, 如: 3.5">
                <template #suffix>
                  %
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item
            field="invoiceCategories"
            label="发票内容"
            show-colon
            required
          >
            <a-space direction="vertical">
              <div
                v-for="(_, index) in form.invoiceCategories"
                :key="index"
                class="form-item"
                flex="~ v-center gap-2"
              >
                <a-input v-model="form.invoiceCategories[index]" placeholder="请输入发票内容" class="flex-1" allow-clear />
                <a-button
                  v-if="index <= 0"
                  shape="square"
                  type="text"
                  @click="handleAddInvoiceCategory"
                >
                  <template #icon>
                    <CommonIcon name="ph:plus" />
                  </template>
                </a-button>
                <a-button
                  v-else
                  status="danger"
                  shape="square"
                  type="text"
                  @click="handleRemoveInvoiceCategory(index)"
                >
                  <template #icon>
                    <CommonIcon name="ph:trash" />
                  </template>
                </a-button>
              </div>
            </a-space>
          </a-form-item>

          <a-form-item
            field="invoiceFee"
            label="邮寄费用"
            show-colon
            required
          >
            <div class="form-item-xs">
              <a-input v-model="form.invoiceFee" placeholder="请输入邮寄费用">
                <template #suffix>
                  元
                </template>
              </a-input>
            </div>
          </a-form-item>

          <a-form-item
            field="invoiceType"
            label="支持发票类型"
            show-colon
            required
          >
            <a-checkbox-group v-model="form.invoiceType">
              <a-checkbox value="paper">
                普通发票
              </a-checkbox>
              <a-checkbox value="pdf">
                电子发票
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
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

<style lang="less">

</style>
