<script lang="ts" setup>
import { GoodsAdditionalModal } from '@/goods/components'

import {
  deleteGoodsAdditional,
  fetchGoodsAdditionalList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageAdditionsIndexPage',
})

const columns = [
  { title: '服务名称', dataIndex: 'name', slotName: 'name', width: 150 },
  { title: '价格', dataIndex: 'price', slotName: 'price', width: 150 },
  { title: '描述', dataIndex: 'desc', slotName: 'desc' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchGoodsAdditionalList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsAdditional(id)
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
      <GoodsAdditionalModal @success="refreshData">
        <a-button type="primary">
          创建附加服务
        </a-button>
      </GoodsAdditionalModal>
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
        <template #name="{ record }">
          <div class="flex-(~ v-center gap-2)">
            <CommonImage v-if="record.icon" :src="record.icon" width="20" height="20" />
            {{ record.name }}
          </div>
        </template>

        <template #price="{ record }">
          <CommonLabel :value="record.price" type="price" suffix="元" />
        </template>

        <template #desc="{ record }">
          {{ record.desc || '-' }}
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsAdditionalModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsAdditionalModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
