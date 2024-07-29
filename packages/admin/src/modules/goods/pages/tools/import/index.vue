<script lang="ts" setup>
import AssetsBrowserModal from '@/assets/components/assets-browser'

defineOptions({
  name: 'GoodsToolsImportIndexPage',
  inheritAttrs: false,
})

const currentStep = ref(1)
</script>

<template>
  <CommonContainer>
    <CommonCard class="goods-tools-import__steps">
      <div class="flex flex-gap-4">
        <div class="flex-basis-180px b-r-(1 solid $color-border-1)">
          <a-steps v-model:current="currentStep" direction="vertical" small>
            <a-step>准备商品分类</a-step>
            <a-step>上传商品图片</a-step>
            <a-step>完成导入商品</a-step>
          </a-steps>
        </div>

        <div class="flex-auto">
          <template v-if="currentStep === 1">
            <a-alert title="步骤说明">
              <p>在开始导入商品前，需要先准备好商品分类。</p>
              <p>您可以在左侧的「商品分类」中添加分类。</p>
              <p>完成后，点击「下载导入模板」下载导入模板。</p>
            </a-alert>

            <a-space class="mt-6">
              <a-button type="primary" @click="currentStep = 2">
                下载导入模板
              </a-button>
            </a-space>
          </template>

          <template v-if="currentStep === 2">
            <a-alert title="步骤说明">
              <p>导入商品功能使用的是 Excel 文件, 在模板中直接插入图片系统将无法识别，需要您先上传图片。</p>
              <p>上传商品图片后, 请将图片路径填入模板的商品图片单元格中。</p>

              <a-button type="outline">
                下载导入模板 v1.0.0
              </a-button>
            </a-alert>

            <a-space class="mt-6">
              <a-button type="primary" @click="AssetsBrowserModal.openModal({ limit: 0 })">
                上传图片
              </a-button>

              <a-button @click="currentStep = 3">
                上传完成
              </a-button>
            </a-space>
          </template>

          <template v-if="currentStep === 3">
            <a-alert title="步骤说明">
              <p>请点击「选择导入模板」将导入模板 Excel 文件上传。</p>
              <p>完成后，点击「开始导入」, 并耐心等待导入结果。</p>
            </a-alert>

            <a-space class="mt-6">
              <a-button type="primary">
                选择导入模板
              </a-button>

              <a-button>
                开始导入
              </a-button>
            </a-space>
          </template>
        </div>
      </div>
    </CommonCard>
  </CommonContainer>
</template>

<style lang="less">
.goods-tools-import__steps {
  .arco-card-body {
    padding: 32px;
  }
}
</style>
