<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { GoodsLogisticsCompanyModal } from '@/goods/components'

import {
  deleteLogisticsCompany,
  fetchLogisticsCompanyList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsSettingsDeliveryCompanyPage',
})

const columns: TableColumnData[] = [
  { title: '公司名称', dataIndex: 'name' },
  { title: '公司网站', dataIndex: 'url', slotName: 'url' },
  { title: '排序', dataIndex: 'sort', width: 100 },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 180 },
  { title: '操作', slotName: 'actions', width: 100, align: 'center' },
]

const { loading, data, refreshData } = fetchLogisticsCompanyList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteLogisticsCompany(id)
    .then(() => {
      message.success('删除成功')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsLogisticsCompanyModal @success="refreshData">
        <a-button type="primary">
          新增快递公司
        </a-button>
      </GoodsLogisticsCompanyModal>
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
      >
        <template #url="{ record }">
          {{ record.url || '-' }}
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsLogisticsCompanyModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsLogisticsCompanyModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
