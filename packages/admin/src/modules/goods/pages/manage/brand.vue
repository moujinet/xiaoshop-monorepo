<script lang="ts" setup>
import { AssetsBrowserImage } from '@/assets/components'
import { deleteGoodsBrand, fetchGoodsBrandList } from '@/goods/apis/brand'
import { GoodsBrandEditModal } from '@/goods/components'

defineOptions({
  name: 'GoodsManageBrandPage',
})

const columns = [
  {
    title: '品牌名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '品牌 LOGO',
    dataIndex: 'logo',
    slotName: 'logo',
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
      <GoodsBrandEditModal @success="refreshData">
        <a-button type="primary">
          创建品牌
        </a-button>
      </GoodsBrandEditModal>
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
        <template #logo="{ record }">
          <AssetsBrowserImage :asset="record.logo" width="40" height="40" />
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsBrandEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsBrandEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
