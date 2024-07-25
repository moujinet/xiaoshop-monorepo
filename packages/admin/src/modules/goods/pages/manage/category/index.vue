<script lang="ts" setup>
import { GoodsCategoryModal } from '@/goods/components'

import {
  deleteGoodsCategory,
  fetchGoodsCategoryList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageCategoryIndexPage',
})

const columns = [
  { title: '分类名称', dataIndex: 'name', slotName: 'name', width: 300 },
  { title: '分类图片', dataIndex: 'image', slotName: 'image' },
  { title: '排序', dataIndex: 'sort' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
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
      <GoodsCategoryModal @success="refreshData">
        <a-button type="primary">
          创建分类
        </a-button>
      </GoodsCategoryModal>
    </template>

    <CommonCard :loading="loading">
      <a-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        :load-more="loadChildren"
        hide-expand-button-on-empty
        row-key="id"
        hoverable
        stripe
      >
        <template #image="{ record }">
          <CommonImage v-if="record.image" :src="record.image" height="32" />
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsCategoryModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsCategoryModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
