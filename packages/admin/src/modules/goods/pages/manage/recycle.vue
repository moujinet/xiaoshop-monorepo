<script lang="ts" setup>
defineOptions({
  name: 'GoodsManageRecyclePage',
})

const searchForm = reactive({
  test: '',
})

const columns = [
  {
    title: '商品信息',
    dataIndex: 'name',
  },
  {
    title: '商品类型',
    dataIndex: 'type',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '库存',
    dataIndex: 'pcs',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    slotName: 'actions',
  },
]
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <a-button type="primary">
        清空回收站
      </a-button>
    </template>

    <FormSearch :form="searchForm">
      <a-form-item
        field="name"
        label="商品名称"
        show-colon
      >
        <a-input v-model="searchForm.test" placeholder="请输入" />
      </a-form-item>

      <a-form-item
        field="sku"
        label="商品SKU"
        show-colon
      >
        <a-input v-model="searchForm.test" placeholder="请输入" />
      </a-form-item>

      <a-form-item
        field="verificationCodeExpires"
        label="商品类型"
        show-colon
      >
        <a-input v-model="searchForm.test" placeholder="请输入" />
      </a-form-item>

      <a-form-item
        field="verificationCodeExpires"
        label="所属分类"
        show-colon
      >
        <a-input v-model="searchForm.test" placeholder="请输入" />
      </a-form-item>
    </FormSearch>

    <CommonCard>
      <a-table
        :columns="columns"
        :bordered="false"
        row-key="id"
        hoverable
        stripe
        show-empty-tree
      />
    </CommonCard>
  </CommonContainer>
</template>
