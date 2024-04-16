<script lang="ts" setup>
defineOptions({
  name: 'RegisterLicensePage',
})

const form = reactive({
  title: '用户协议',
  content: '',
})
</script>

<template>
  <CommonContainer>
    <CommonCard title="用户协议">
      <a-form :model="form" scroll-to-first-error>
        <a-space direction="vertical" size="medium">
          <FormRichTextEditor v-model="form.content" placeholder="请输入用户协议" />

          <div flex="~ between">
            <a-button type="primary" html-type="submit">
              保存
            </a-button>

            <a-button>
              <template #icon>
                <CommonIcon name="ph:lightbulb" />
              </template>
              导入范本
            </a-button>
          </div>
        </a-space>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
