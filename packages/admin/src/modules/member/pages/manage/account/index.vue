<script lang="ts" setup>
import {
  type IMemberListItem,
  MEMBER_DEFAULT_PASSWORD,
  MemberStatus,
} from '@xiaoshop/schema'

import type { TableColumnData } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import {
  fetchMemberPages,
  resetMemberPassword,
  updateMemberStatus,
} from '@/member/apis'

import {
  MemberCardSetupModal,
  MemberInfoBlock,
  MemberPointsSetupModal,
  MemberProfileModal,
  MemberSearchForm,
  MemberSourceBadge,
  MemberStatusBadge,
  MemberTagSetupModal,
} from '@/member/components'

defineOptions({
  name: 'MemberManageAccountIndexPage',
  inheritAttrs: false,
})

const route = useRoute()
const router = useRouter()

const selectedKeys = ref<IMemberListItem['id'][]>([])

const searchForm = reactive({
  keywordType: 'username',
  keyword: '',
  cardNo: '',
  gender: '',
  source: '',
  status: '',
  tagId: 0,
  cardId: 0,
  groupId: 0,
  exp: [],
  points: [],
  orders: [],
  orderAmount: [],
  createTime: [],
  lastLoginTime: [],
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '会员信息', dataIndex: 'member', slotName: 'member', minWidth: 240 },
  { title: '成交订单', dataIndex: 'orders', slotName: 'orders', align: 'right', width: 100 },
  { title: '消费金额', dataIndex: 'amount', slotName: 'amount', align: 'right', width: 100 },
  { title: '当前积分', dataIndex: 'points', slotName: 'points', align: 'right', width: 100 },
  { title: '注册来源', dataIndex: 'source', slotName: 'source', width: 140 },
  { title: '状态', dataIndex: 'status', slotName: 'status', align: 'center', width: 80 },
  { title: '最近登录时间', dataIndex: 'lastLoginTime', slotName: 'lastLoginTime', width: 180, align: 'right' },
  { title: '', slotName: 'actions', width: 100, align: 'center', fixed: 'right' },
]

const message = useMessage({
  onClose: () => {
    handleRefresh()
  },
})

const { loading, data, refreshData } = fetchMemberPages()

const { query, params, transformQuery } = useSearchForm({
  form: searchForm,
  combinedKeys: ['keywordType', 'keyword'],
  stringKeys: ['cardNo', 'gender', 'status', 'source'],
  splitNumberKeys: ['exp', 'points', 'orders', 'orderAmount'],
  splitStringKeys: ['createTime', 'lastLoginTime'],
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
  selectedKeys.value = []

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

function handleResetPassword(id: number) {
  resetMemberPassword(id, MEMBER_DEFAULT_PASSWORD)
    .then(() => {
      message.success(`密码已重置为: ${MEMBER_DEFAULT_PASSWORD}`)
    })
}

function handleBlockMember(id: number) {
  updateMemberStatus(id, MemberStatus.BLOCKED)
    .then(() => {
      message.success('冻结成功')
    })
}

function handleEnableMember(id: number) {
  updateMemberStatus(id, MemberStatus.NORMAL)
    .then(() => {
      message.success('恢复成功')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <MemberProfileModal @success="handleRefresh">
        <a-button type="primary">
          创建会员
        </a-button>
      </MemberProfileModal>
    </template>

    <template #header>
      <MemberSearchForm
        v-model:form="searchForm"
        @search="handleSearch"
        @reset="handleSearch"
      />
    </template>

    <CommonCard>
      <template #extra>
        <div class="pt-4 px-4">
          <a-space>
            <MemberTagSetupModal :ids="selectedKeys" @success="handleRefresh">
              <a-button size="small" :disabled="selectedKeys.length === 0">
                设置标签
              </a-button>
            </MemberTagSetupModal>

            <MemberCardSetupModal :ids="selectedKeys" @success="handleRefresh">
              <a-button size="small" :disabled="selectedKeys.length === 0">
                设置等级
              </a-button>
            </MemberCardSetupModal>

            <MemberPointsSetupModal :ids="selectedKeys" @success="handleRefresh">
              <a-button size="small" :disabled="selectedKeys.length === 0">
                设置积分
              </a-button>
            </MemberPointsSetupModal>

            <!-- <a-button size="small" :disabled="selectedKeys.length === 0">
              赠送优惠券
            </a-button> -->
          </a-space>
        </div>
      </template>

      <a-table
        v-model:selected-keys="selectedKeys"
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :bordered="false"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false,
        }"
        :pagination="{
          total: data && data.total,
          current: searchForm.page,
          pageSize: searchForm.pagesize,
          showPageSize: true,
          showTotal: true,
          hideOnSinglePage: true,
        }"
        row-key="id"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #member="{ record }">
          <MemberInfoBlock :member="record" />
        </template>

        <template #orders="{ record }">
          <CommonLabel type="number" suffix="笔" :value="record.account.orders" />
        </template>

        <template #amount="{ record }">
          <CommonLabel type="number" suffix="元" :value="record.account.orderAmount" />
        </template>

        <template #points="{ record }">
          <CommonLabel type="number" suffix="点" :value="record.account.points" />
        </template>

        <template #source="{ record }">
          <MemberSourceBadge :value="record.source" />
        </template>

        <template #status="{ record }">
          <MemberStatusBadge :status="record.status" dotted />
        </template>

        <template #lastLoginTime="{ record }">
          {{ record.lastLoginTime ? formatDateTime(record.lastLoginTime) : '-' }}
        </template>

        <template #actions="{ record }">
          <a-button type="text" @click="$router.push({ path: '/member/manage/account/profile', query: { id: record.id } })">
            查看
          </a-button>

          <a-dropdown :hide-on-select="false">
            <a-button type="text">
              更多
            </a-button>

            <template #content>
              <a-doption>
                <CommonConfirm confirm-ok-text="重置密码" btn-status="normal" @ok="handleResetPassword(record.id)">
                  <span>
                    重置密码
                  </span>
                </CommonConfirm>
              </a-doption>

              <a-doption v-if="record.status === MemberStatus.BLOCKED">
                <CommonConfirm confirm-ok-text="恢复账户" btn-status="normal" @ok="handleEnableMember(record.id)">
                  <span>
                    恢复账户
                  </span>
                </CommonConfirm>
              </a-doption>

              <a-doption v-else>
                <CommonConfirm confirm-ok-text="冻结账户" btn-status="normal" @ok="handleBlockMember(record.id)">
                  <span>
                    冻结账户
                  </span>
                </CommonConfirm>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
