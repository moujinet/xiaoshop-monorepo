<script lang="ts" setup>
import { GoodsGroupModal } from '@/goods/components'

import {
  deleteGoodsGroup,
  fetchGoodsGroupList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageGroupPage',
})

const columns = [
  { title: '分组名称', dataIndex: 'name', width: 200 },
  { title: '排序', dataIndex: 'sort' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchGoodsGroupList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsGroup(id)
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
      <GoodsGroupModal @success="refreshData">
        <a-button type="primary">
          创建分组
        </a-button>
      </GoodsGroupModal>
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
        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsGroupModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsGroupModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
