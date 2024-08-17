<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import { MemberGroupModal } from '@/member/components'

import {
  deleteMemberGroup,
  fetchMemberGroupPages,
} from '@/member/apis'

defineOptions({
  name: 'MemberManageGroupsIndexPage',
})

const route = useRoute()
const router = useRouter()

const message = useMessage({
  onClose: () => {
    loadData()
  },
})

const searchForm = reactive({
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '群体名称', dataIndex: 'name', slotName: 'name' },
  { title: '描述', dataIndex: 'desc', slotName: 'desc' },
  { title: '人数', dataIndex: 'total', width: 100, align: 'center' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', align: 'right' },
  { title: '操作', slotName: 'actions', width: 100, align: 'center' },
]

const {
  loading,
  data,
  refreshData,
} = fetchMemberGroupPages()

const { params, transformQuery } = useSearchForm({
  form: searchForm,
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

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(pagesize: number) {
  router.replace({ query: { ...route.query, page: 1, pagesize } })
}

function handleDelete(id: number) {
  deleteMemberGroup(id)
    .then(() => {
      message.success('删除成功')
    })
}
</script>

<template>
  <CommonContainer>
    <template #extra>
      <MemberGroupModal @success="loadData">
        <a-button type="primary">
          创建会员群体
        </a-button>
      </MemberGroupModal>
    </template>

    <CommonCard :loading="loading">
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
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #name="{ record }">
          <CommonBadge icon="mingcute:group-3" color="gray" :label="record.name" linear />
        </template>

        <template #desc="{ record }">
          {{ record.desc || '-' }}
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <MemberGroupModal :id="record.id" @success="loadData">
              <a-button type="text">
                编辑
              </a-button>
            </MemberGroupModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
