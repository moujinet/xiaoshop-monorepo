<script lang="ts" setup>
defineOptions({
  name: 'CustomerServiceH5Page',
})

const { getOptions } = useSettings()
const form = reactive(
  pick(
    getOptions('cs'),
    [
      'h5Type',
      'h5WxWorkUrl',
      'h53rdUrl',
    ],
  ),
)
</script>

<template>
  <CommonContainer>
    <CommonCard title="配置 H5 端客服">
      <a-form
        :model="form"
        max-w-900px
        scroll-to-first-error
      >
        <a-form-item field="h5Type" label="客服类型" show-colon>
          <a-radio-group v-model="form.h5Type" type="button">
            <a-radio value="none">
              不启用
            </a-radio>
            <a-radio value="system">
              云链客服
            </a-radio>
            <a-radio value="wxwork">
              企业微信客服
            </a-radio>
            <a-radio value="3rd">
              第三方客服
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <template v-if="form.h5Type === 'wxwork'">
          <a-form-item field="h5WxWorkUrl" label="企微客服连接" show-colon required>
            <div class="form-item">
              <a-input v-model="form.h5WxWorkUrl" placeholder="请输入企微客服连接" />
            </div>

            <template #extra>
              <div>
                H5 中如何接入企业微信客服请查看
                <a-link font="size-12px!" theme="primary" hover="color" size="small" href="https://work.weixin.qq.com/nl/act/p/3f8820e724cb44c5" target="_blank">
                  《在微信内网页中接入》
                </a-link>
              </div>
            </template>
          </a-form-item>
        </template>

        <template v-if="form.h5Type === '3rd'">
          <a-form-item field="h53rdUrl" label="第三方客服链接" show-colon required>
            <div class="form-item">
              <a-input v-model="form.h53rdUrl" placeholder="请输入第三方客服链接" />
            </div>

            <template #extra>
              <div>
                请填写客服链接，聊天时跳转至第三方聊天窗口。
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
