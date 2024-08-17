<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { Enabled } from '@xiaoshop/schema'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import { deleteAccount, fetchAccountPages } from '@/auth/apis'

import {
  AccountEditModal,
  DepartmentSelector,
  PositionSelector,
  StaffAccountStatusBadge,
  StaffRoleSelector,
  StaffStatusSelector,
} from '@/auth/components'

defineOptions({
  name: 'AuthManageStaffsIndexPage',
})

const route = useRoute()
const router = useRouter()

const positionSelectorRef = ref()

const searchForm = reactive({
  status: '',
  name: '',
  mobile: '',
  roleId: 0,
  departmentId: 0,
  positionId: 0,
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '员工', dataIndex: 'name', width: 120 },
  { title: '角色', dataIndex: 'roles', slotName: 'roles' },
  { title: '部门', dataIndex: 'department', slotName: 'department' },
  { title: '职位', dataIndex: 'position', slotName: 'position' },
  { title: '状态', dataIndex: 'status', slotName: 'status', width: 90 },
  { title: '最后登录时间', dataIndex: 'lastLoginTime', slotName: 'lastLoginTime', width: 180 },
  { title: '操作', slotName: 'actions', align: 'center', width: 160 },
]

const { loading, data, refreshData } = fetchAccountPages()

const { query, params, transformQuery } = useSearchForm({
  form: searchForm,
  stringKeys: ['name', 'status', 'mobile'],
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

  deleteAccount(id)
    .then(() => {
      message.success('删除成功')
    })
    .catch(() => {
      message.error('删除失败')
    })
}

function handleDepartmentChange(departmentId: number) {
  searchForm.positionId = 0
  positionSelectorRef.value?.refresh({ departmentId: departmentId || 0 })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <AccountEditModal @success="handleRefresh">
        <a-button type="primary">
          创建员工
        </a-button>
      </AccountEditModal>
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
        <template #roles="{ record }">
          <template v-if="record.roles && record.roles.length > 0">
            <a-tag v-for="role in record.roles" :key="role.id">
              {{ role.name }}
            </a-tag>
          </template>
          <template v-else-if="record.isAdmin === Enabled.YES">
            <CommonBadge icon="mingcute:incognito-mode" color="arcoblue" label="管理员" />
          </template>
          <template v-else>
            -
          </template>
        </template>

        <template #department="{ record }">
          {{ record.department ? record.department.name : '-' }}
        </template>

        <template #position="{ record }">
          {{ record.position ? record.position.name : '-' }}
        </template>

        <template #status="{ record }">
          <StaffAccountStatusBadge :value="record.status" dotted />
        </template>

        <template #lastLoginTime="{ record }">
          {{ record.lastLoginTime ? formatDateTime(record.lastLoginTime) : '-' }}
        </template>

        <template #actions="{ record }">
          <AccountEditModal :id="record.id" @success="handleRefresh">
            <a-button type="text">
              编辑
            </a-button>
          </AccountEditModal>

          <CommonConfirm @ok="handleDelete(record.id)" />
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <FormSearch :form="searchForm" @search="handleSearch" @reset="handleRefresh">
        <a-form-item field="name" label="员工姓名" show-colon>
          <a-input v-model="searchForm.name" placeholder="请输入" allow-clear />
        </a-form-item>

        <a-form-item field="mobile" label="员工手机" show-colon>
          <a-input v-model="searchForm.mobile" placeholder="请输入" allow-clear />
        </a-form-item>

        <a-form-item field="status" label="员工状态" show-colon>
          <StaffStatusSelector v-model="searchForm.status" />
        </a-form-item>

        <a-form-item field="roleId" label="员工角色" show-colon>
          <StaffRoleSelector v-model="searchForm.roleId" />
        </a-form-item>

        <a-form-item field="departmentId" label="所属部门" show-colon>
          <DepartmentSelector v-model="searchForm.departmentId" @change="handleDepartmentChange" />
        </a-form-item>

        <a-form-item field="positionId" label="所属职位" show-colon>
          <PositionSelector ref="positionSelectorRef" v-model="searchForm.positionId" />
        </a-form-item>
      </FormSearch>
    </template>
  </CommonContainer>
</template>
