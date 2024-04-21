<script lang="ts" setup>
import { GoodsExpressCompanyEditModal } from '@/goods/components'

import {
  deleteExpressCompany,
  fetchExpressCompanyList,
} from '@/goods/apis/express'

defineOptions({
  name: 'GoodsSettingsDeliveryExpressPage',
})

const columns = [
  {
    title: '公司名称',
    dataIndex: 'name',
  },
  {
    title: '公司网站',
    dataIndex: 'url',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '操作',
    slotName: 'actions',
    width: 100,
  },
]

const { loading, data, refreshData } = fetchExpressCompanyList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteExpressCompany(id)
    .then(() => {
      message.success('删除成功')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsExpressCompanyEditModal @success="refreshData">
        <a-button type="primary">
          新增快递公司
        </a-button>
      </GoodsExpressCompanyEditModal>
    </template>

    <CommonCard :loading="loading">
      <a-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        row-key="id"
        hoverable
        stripe
        show-empty-tree
      >
        <template #actions="{ record }">
          <a-space>
            <GoodsExpressCompanyEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsExpressCompanyEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
