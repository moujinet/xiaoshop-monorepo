<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import { deleteRole, fetchRolePages } from '@/auth/apis'

defineOptions({
  name: 'AuthManageRoleIndexPage',
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive({
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    slotName: 'desc',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    slotName: 'createdTime',
    width: 180,
  },
  {
    title: '操作',
    slotName: 'actions',
    width: 180,
    align: 'center',
  },
]

const { loading, data, refreshData } = fetchRolePages()

watch(
  () => route.query,
  () => {
    const formData = searchForm as Record<string, string | number>

    Object.keys(route.query).forEach((key) => {
      formData[key] = Number(route.query[key] as string)
    })

    refreshData(removeEmpty(searchForm, true))
  },
  { immediate: true },
)

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(size: number) {
  router.replace({ query: { ...route.query, page: 1, size } })
}

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteRole(id)
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
      <a-button type="primary" @click="router.push({ path: '/auth/manage/roles/create' })">
        创建角色
      </a-button>
    </template>

    <CommonCard>
      <a-table
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :bordered="false"
        :pagination="{
          total: data && data.total,
          current: searchForm.page,
          pageSize: searchForm.pagesize,
          showPageSize: true,
          showTotal: true,
          hideOnSinglePage: true,
        }"
        row-key="id"
        hoverable
        stripe
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #desc="{ record }">
          <span class="text-$color-text-2 truncate">{{ record.desc }}</span>
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <a-button type="text" @click="router.push({ path: '/auth/manage/roles/edit', query: { id: record.id } })">
            编辑
          </a-button>

          <CommonConfirm @ok="handleDelete(record.id)" />
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
