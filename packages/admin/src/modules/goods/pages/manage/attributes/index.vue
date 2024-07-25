<script lang="ts" setup>
import { GoodsAttributeTemplateModal } from '@/goods/components'

import {
  deleteGoodsAttributeTemplate,
  fetchGoodsAttributeTemplateList,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageAttributesIndexPage',
})

const router = useRouter()

const columns = [
  { title: '模板名称', dataIndex: 'name', width: 200 },
  { title: '模板说明', dataIndex: 'desc', slotName: 'desc' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchGoodsAttributeTemplateList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsAttributeTemplate(id)
    .then(() => {
      message.success('删除成功')
    })
    .catch(() => {
      message.error('删除失败')
    })
}

function handleSetup(id: number) {
  router.push({ name: '/goods/manage/attributes/template', query: { id } })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsAttributeTemplateModal @success="refreshData">
        <a-button type="primary">
          创建参数模板
        </a-button>
      </GoodsAttributeTemplateModal>
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
        <template #desc="{ record }">
          {{ record.desc || '-' }}
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <a-button type="text" @click="handleSetup(record.id)">
              设置
            </a-button>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
