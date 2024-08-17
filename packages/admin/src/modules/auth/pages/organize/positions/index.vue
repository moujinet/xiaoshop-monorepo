<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import {
  DepartmentSelector,
  PositionEditModal,
} from '@/auth/components'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import { deletePosition, fetchPositionPages } from '@/auth/apis'

defineOptions({
  name: 'AuthOrganizePositionIndexPage',
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive({
  departmentId: 0,
  name: '',
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '职位名称', dataIndex: 'name', width: 200 },
  { title: '所属部门', dataIndex: 'department', slotName: 'department', width: 200 },
  { title: '描述', dataIndex: 'desc', slotName: 'desc' },
  { title: '创建时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 180 },
  { title: '操作', slotName: 'actions', width: 180, align: 'center' },
]

const { loading, data, refreshData } = fetchPositionPages()

const { query, params, transformQuery } = useSearchForm({
  form: searchForm,
  stringKeys: ['name'],
})

watch(
  () => route.query,
  () => {
    transformQuery(route.query)
    loadData()
  },
  { immediate: true },
)

function loadData() {
  refreshData(params.value)
}

function handleRefresh() {
  handleSearch()

  if (searchForm.page === 1)
    loadData()
}

function handleSearch() {
  router.replace({ query: { ...query.value, page: 1 } })
}

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

  deletePosition(id)
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
      <PositionEditModal @success="handleRefresh">
        <a-button type="primary">
          创建职位
        </a-button>
      </PositionEditModal>
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
        <template #department="{ record }">
          {{ record.department.name }}
        </template>

        <template #desc="{ record }">
          <span class="text-$color-text-2 truncate">{{ record.desc }}</span>
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <PositionEditModal :id="record.id" @success="handleRefresh">
            <a-button type="text">
              编辑
            </a-button>
          </PositionEditModal>

          <CommonConfirm @ok="handleDelete(record.id)" />
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <FormSearch :form="searchForm" @search="handleSearch" @reset="handleRefresh">
        <a-form-item field="name" label="职位名称" show-colon>
          <a-input v-model="searchForm.name" placeholder="请输入" allow-clear />
        </a-form-item>

        <a-form-item field="departmentId" label="所属部门" show-colon>
          <DepartmentSelector v-model="searchForm.departmentId" />
        </a-form-item>
      </FormSearch>
    </template>
  </CommonContainer>
</template>
