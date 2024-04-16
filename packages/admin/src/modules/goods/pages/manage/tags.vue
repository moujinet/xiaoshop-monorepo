<script lang="ts" setup>
import { deleteGoodsTag, fetchGoodsTagList } from '@/goods/apis/tag'
import { GoodsTagEditModal } from '@/goods/components'

defineOptions({
  name: 'GoodsManageTagsPage',
})

const columns = [
  {
    title: '标签名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    slotName: 'createdTime',
    width: 200,
  },
  {
    title: '操作',
    slotName: 'actions',
    width: 100,
  },
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
      <GoodsTagEditModal @success="refreshData">
        <a-button type="primary">
          创建标签
        </a-button>
      </GoodsTagEditModal>
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
        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsTagEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsTagEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
