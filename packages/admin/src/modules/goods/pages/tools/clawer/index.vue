<script lang="ts" setup>
import { GoodsCategorySelector } from '@/goods/components'

defineOptions({
  name: 'GoodsToolsClawerPage',
})

const form = reactive({
  url: '',
  category: 0,
})

const columns = [
  { title: '商品分类', dataIndex: 'category' },
  { title: '采集总数', dataIndex: 'total', width: 100 },
  { title: '成功', dataIndex: 'successCount', width: 100 },
  { title: '失败', dataIndex: 'failCount', width: 100 },
  { title: '时间', dataIndex: 'createdTime', width: 160 },
  { title: '操作', dataIndex: 'actions', width: 100 },
]
</script>

<template>
  <CommonContainer flexible>
    <FormCard
      :model="form"
      title="商品采集"
      scroll-to-first-error
    >
      <a-alert class="mb-8">
        <p>请先完成「采集设置」, 否则无法使用该功能</p>
      </a-alert>

      <a-form-item field="category" label="商品分类" show-colon>
        <div class="form-item">
          <GoodsCategorySelector v-model="form.category" path-mode />
        </div>
      </a-form-item>

      <a-form-item field="url" label="商品链接" show-colon>
        <div class="form-item">
          <a-textarea v-model="form.url" placeholder="目前商品采集只支持淘宝、天猫、1688、京东的商品" auto-size allow-clear />
        </div>

        <template #extra>
          商品采集需要一段时间同步商品信息, 大约每个商品约需10-30秒, 请耐心等待
        </template>
      </a-form-item>

      <a-form-item>
        <a-button type="primary">
          开始采集
        </a-button>
      </a-form-item>
    </FormCard>

    <CommonCard title="采集记录">
      <a-table
        :columns="columns"
        :data="[]"
        :bordered="false"
        :pagination="false"
        row-key="id"
        hoverable
        stripe
      />
    </CommonCard>
  </CommonContainer>
</template>
