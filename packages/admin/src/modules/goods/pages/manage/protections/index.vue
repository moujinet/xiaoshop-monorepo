<script lang="ts" setup>
import { GoodsProtectionModal } from '@/goods/components'

import {
  deleteGoodsProtection,
  fetchGoodsProtectionList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageProtectionsIndexPage',
})

const columns = [
  { title: '服务保障', dataIndex: 'name', slotName: 'name', width: 150 },
  { title: '描述', dataIndex: 'desc', slotName: 'desc' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchGoodsProtectionList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsProtection(id)
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
      <GoodsProtectionModal @success="refreshData">
        <a-button type="primary">
          创建服务保障
        </a-button>
      </GoodsProtectionModal>
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

        <template #desc="{ record }">
          {{ record.desc || '-' }}
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsProtectionModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsProtectionModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
