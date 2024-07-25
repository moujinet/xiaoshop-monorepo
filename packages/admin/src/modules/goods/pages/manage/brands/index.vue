<script lang="ts" setup>
import { GoodsBrandModal } from '@/goods/components'

import {
  deleteGoodsBrand,
  fetchGoodsBrandList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageBrandPage',
})

const columns = [
  { title: '品牌名称', dataIndex: 'name', width: 150 },
  { title: '品牌 LOGO', dataIndex: 'logo', slotName: 'logo' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchGoodsBrandList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsBrand(id)
    .then(() => {
      message.success('删除成功')
    })
    .catch(() => {
      message.error('删除失败')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsBrandModal @success="refreshData">
        <a-button type="primary">
          创建品牌
        </a-button>
      </GoodsBrandModal>
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
        <template #logo="{ record }">
          <CommonImage v-if="record.logo" :src="record.logo" width="40" height="40" />
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsBrandModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsBrandModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
