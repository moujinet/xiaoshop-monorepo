<script lang="ts" setup>
import { GoodsTagModal } from '@/goods/components'

import {
  deleteGoodsTag,
  fetchGoodsTagList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageTagsPage',
})

const columns = [
  { title: '标签名称', dataIndex: 'name', width: 150 },
  { title: '排序', dataIndex: 'sort' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchGoodsTagList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsTag(id)
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
      <GoodsTagModal @success="refreshData">
        <a-button type="primary">
          创建标签
        </a-button>
      </GoodsTagModal>
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
            <GoodsTagModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsTagModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
