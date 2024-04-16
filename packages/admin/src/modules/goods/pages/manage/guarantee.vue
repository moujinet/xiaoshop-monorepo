<script lang="ts" setup>
import { deleteGoodsGuarantee, fetchGoodsGuaranteeList } from '@/goods/apis/guarantee'
import { GoodsGuaranteeEditModal } from '@/goods/components'
import { AssetsBrowserImage } from '@/assets/components'

defineOptions({
  name: 'GoodsManageGuaranteePage',
})

const columns = [
  {
    title: '服务保障',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    slotName: 'icon',
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

const { loading, data, refreshData } = fetchGoodsGuaranteeList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsGuarantee(id)
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
      <GoodsGuaranteeEditModal @success="refreshData">
        <a-button type="primary">
          创建服务保障
        </a-button>
      </GoodsGuaranteeEditModal>
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
        <template #icon="{ record }">
          <AssetsBrowserImage :asset="record.icon" :width="40" :height="40" />
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsGuaranteeEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsGuaranteeEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
