<script lang="ts" setup>
import { deleteGoodsService, fetchGoodsServiceList } from '@/goods/apis/service'
import { GoodsServiceEditModal } from '@/goods/components'

defineOptions({
  name: 'GoodsSettingsGuaranteePage',
})

const columns = [
  {
    title: '服务名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '价格',
    dataIndex: 'price',
    slotName: 'price',
    width: 150,
  },
  {
    title: '描述',
    dataIndex: 'desc',
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

const { loading, data, refreshData } = fetchGoodsServiceList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsService(id)
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
      <GoodsServiceEditModal @success="refreshData">
        <a-button type="primary">
          创建商品服务
        </a-button>
      </GoodsServiceEditModal>
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
        <template #price="{ record }">
          <CommonPrice :price="record.price" mode="suffix" />
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsServiceEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsServiceEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
