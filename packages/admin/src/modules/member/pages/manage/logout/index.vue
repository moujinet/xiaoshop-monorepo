<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { MEMBER_LOGOUT_STATUSES, MemberLogoutStatus } from '@xiaoshop/schema'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import {
  fetchMemberLogoutPages,
  updateMemberLogoutStatus,
} from '@/member/apis'

defineOptions({
  name: 'MemberManageLogoutIndexPage',
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive({
  status: '',
  username: '',
  mobile: '',
  nickname: '',
  createdTime: [],
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '会员账号', dataIndex: 'member', slotName: 'member', width: 200 },
  { title: '注销原因', dataIndex: 'reason' },
  { title: '申请状态', dataIndex: 'status', slotName: 'status', width: 100 },
  { title: '申请时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 200, align: 'center' },
  { title: '', slotName: 'actions', width: 160, fixed: 'right' },
]

const message = useMessage({
  onClose: () => {
    handleRefresh()
  },
})

const settings = useSettings().getOptions('member.logout', {}, ['enableLogout', 'enableAudit'])

const { data, loading, refreshData } = fetchMemberLogoutPages()

const { query, params, transformQuery } = useSearchForm({
  form: searchForm,
  stringKeys: ['status', 'username', 'nickname', ''],
  splitStringKeys: ['createdTime'],
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

function handlePageSizeChange(pagesize: number) {
  router.replace({ query: { ...route.query, page: 1, pagesize } })
}

function handleTabsChange(status: string | number) {
  router.replace({ query: { ...route.query, status, page: 1 } })
}

function handleApprove(id: number) {
  updateMemberLogoutStatus(id, MemberLogoutStatus.APPROVED)
    .then(() => {
      message.success('操作成功')
    })
}

function handleReject(id: number) {
  updateMemberLogoutStatus(id, MemberLogoutStatus.REJECTED)
    .then(() => {
      message.success('操作成功')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #header>
      <FormSearch :form="searchForm" @search="handleSearch" @reset="handleSearch">
        <a-form-item field="username" label="会员账号" show-colon>
          <a-input v-model="searchForm.username" placeholder="请输入会员账号" allow-clear />
        </a-form-item>

        <a-form-item field="nickname" label="会员昵称" show-colon>
          <a-input v-model="searchForm.nickname" placeholder="请输入会员昵称" allow-clear />
        </a-form-item>

        <a-form-item field="mobile" label="手机号码" show-colon>
          <a-input v-model="searchForm.mobile" placeholder="请输入手机号码" allow-clear />
        </a-form-item>

        <a-form-item field="createdTime" label="申请时间" show-colon>
          <a-range-picker v-model="searchForm.createdTime" />
        </a-form-item>
      </FormSearch>
    </template>

    <CommonCard>
      <template #extra>
        <a-alert v-if="!settings.enableLogout || !settings.enableAudit" :type="settings.enableLogout ? 'info' : 'warning'" banner>
          <template v-if="!settings.enableLogout">
            「注销功能」已禁用，用户将无法申请注销账号操作。
          </template>
          <template v-if="!settings.enableAudit">
            「注销审核」已关闭，所有「注销申请」都会自动通过，并在 1 小时内完成「会员账户」注销操作。
          </template>
        </a-alert>

        <div class="pt-4 px-4">
          <a-tabs
            v-model:active-key="searchForm.status"
            type="card"
            size="large"
            hide-content
            @change="handleTabsChange"
          >
            <a-tab-pane key="" title="全部" />
            <a-tab-pane v-for="item in MEMBER_LOGOUT_STATUSES" :key="item.value" :title="item.label" />
          </a-tabs>
        </div>
      </template>

      <a-table
        row-key="id"
        :loading="loading"
        :columns="columns.filter((item) => (settings.enableLogout && settings.enableAudit) || item.slotName !== 'actions')"
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
        hoverable
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #member="{ record }">
          <div>
            <span>{{ record.nickname || record.username }}</span>
            <span class="text-$color-text-3">
              ({{ record.mobile ? hidePhone(record.mobile) : '-' }})
            </span>
          </div>
        </template>

        <template #status="{ record }">
          <a-tag :color="MEMBER_LOGOUT_STATUSES.find((item) => item.value === record.status)?.color" size="small">
            {{ MEMBER_LOGOUT_STATUSES.find((item) => item.value === record.status)?.label }}
          </a-tag>
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}

          <template v-if="record.logoutTime">
            <div>
              {{ `注销于: ${formatDateTime(record.logoutTime)}` }}
            </div>
          </template>
        </template>

        <template #actions="{ record }">
          <div v-if="settings.enableAudit && settings.enableLogout && record.status === MemberLogoutStatus.PENDING" class="text-right">
            <CommonConfirm confirm-ok-text="同意申请" btn-status="normal" @ok="handleApprove(record.id)">
              <a-button type="text">
                通过
              </a-button>
            </CommonConfirm>

            <CommonConfirm confirm-ok-text="拒绝申请" btn-status="danger" @ok="handleReject(record.id)">
              <a-button type="text" status="danger">
                拒绝
              </a-button>
            </CommonConfirm>
          </div>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
