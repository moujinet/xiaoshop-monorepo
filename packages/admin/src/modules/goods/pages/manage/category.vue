<script lang="ts" setup>
import { deleteGoodsCategory, fetchGoodsCategoryList } from '@/goods/apis/category'
import { GoodsCategoryEditModal } from '@/goods/components'

defineOptions({
  name: 'GoodsManageCategoryPage',
})

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
    width: 300,
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

const { loading, data, refreshData } = fetchGoodsCategoryList(0)

refreshData()

function loadChildren(record: any, done: (children?: any[]) => void) {
  const { refreshData: fetchChildren } = fetchGoodsCategoryList(record.id)

  fetchChildren().then((children) => {
    done(children.map(item => ({ ...item, isLeaf: true })))
  })
}

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsCategory(id)
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
      <GoodsCategoryEditModal @success="refreshData">
        <a-button type="primary">
          创建分类
        </a-button>
      </GoodsCategoryEditModal>
    </template>

    <CommonCard :loading="loading">
      <a-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        :load-more="loadChildren"
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
            <GoodsCategoryEditModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsCategoryEditModal>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
