<script lang="ts" setup>
import { deleteGoodsAttributeTemplate, fetchGoodsAttributeTemplateList } from '@/goods/apis/attribute'
import { GoodsAttributeTemplateEditModal } from '@/goods/components'

defineOptions({
  name: 'GoodsManageAttributesIndexPage',
})

const columns = [
  {
    title: '模板名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '模板说明',
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

const router = useRouter()

function handleSetup(id: number) {
  router.push({ name: '/goods/manage/attributes/template', query: { id } })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsAttributeTemplateEditModal @success="refreshData">
        <a-button type="primary">
          创建参数模板
        </a-button>
      </GoodsAttributeTemplateEditModal>
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
            <a-button type="text" @click="handleSetup(record.id)">
              设置
            </a-button>

            <CommonDeleteBtn @delete="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
