<script lang="ts" setup>
defineOptions({
  name: 'NotificationSettingsPage',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('notification'),
    ['verificationCodeExpires'],
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
        <FormGroup title="商品核销">
          <a-form-item
            field="verificationCodeExpires"
            label="过期前提醒"
            tooltip="核销码过期前多少时间发送提醒"
            show-colon
          >
            <div class="form-item-xs">
              <a-input v-model="form.verificationCodeExpires" placeholder="请输入">
                <template #suffix>
                  小时
                </template>
              </a-input>
            </div>
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
