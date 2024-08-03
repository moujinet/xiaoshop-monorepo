<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { DepartmentEditModal } from '@/auth/components'
import { deleteDepartment, fetchDepartmentTree } from '@/auth/apis'

defineOptions({
  name: 'AuthOrganizeDepartmentIndexPage',
})

const expandedKeys = ref([])

const columns: TableColumnData[] = [
  { title: '部门名称', dataIndex: 'name', width: 300 },
  { title: '描述', dataIndex: 'desc', slotName: 'desc' },
  { title: '创建时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 180 },
  { title: '操作', slotName: 'actions', width: 180, align: 'center' },
]

const {
  loading,
  data,
  refreshData,
} = fetchDepartmentTree()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteDepartment(id)
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
      <DepartmentEditModal @success="refreshData">
        <a-button type="primary">
          创建部门
        </a-button>
      </DepartmentEditModal>
    </template>

    <CommonCard>
      <a-table
        v-model:expandedKeys="expandedKeys"
        :loading="loading"
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        row-key="id"
        hoverable
      >
        <template #desc="{ record }">
          <span class="text-$color-text-2 truncate">{{ record.desc }}</span>
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <DepartmentEditModal :id="record.id" @success="refreshData">
            <a-button type="text">
              编辑
            </a-button>
          </DepartmentEditModal>

          <CommonConfirm @ok="handleDelete(record.id)" />
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
