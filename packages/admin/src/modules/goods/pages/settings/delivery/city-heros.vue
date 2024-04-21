<script lang="ts" setup>
import { GoodsExpressPostmanEditModal } from '@/goods/components'

import {
  deleteExpressPostman,
  fetchExpressPostmanList,
} from '@/goods/apis/express'

defineOptions({
  name: 'GoodsSettingsDeliveryExpressPage',
})

const columns = [
  {
    title: '配送员',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
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

const { loading, data, refreshData } = fetchExpressPostmanList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteExpressPostman(id)
    .then(() => {
      message.success('删除成功')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsExpressPostmanEditModal @success="refreshData">
        <a-button type="primary">
          新增配送员
        </a-button>
      </GoodsExpressPostmanEditModal>
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
            <GoodsExpressPostmanEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsExpressPostmanEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
