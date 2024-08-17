<script lang="ts" setup>
import {
  deleteMemberTag,
  fetchMemberTagPages,
} from '@/member/apis'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import { MemberTagModal } from '@/member/components'

defineOptions({
  name: 'MemberManageTagsIndexPage',
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive({
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns = [
  { title: '会员标签', dataIndex: 'name', slotName: 'name' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 200 },
  { title: '操作', slotName: 'actions', width: 100 },
]

const { loading, data, refreshData } = fetchMemberTagPages()

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
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteMemberTag(id)
    .then(() => {
      message.success('删除成功')
    })
    .catch(() => {
      message.error('删除失败')
    })
}
</script>

<template>
  <CommonContainer>
    <template #extra>
      <MemberTagModal @success="loadData">
        <a-button type="primary">
          创建标签
        </a-button>
      </MemberTagModal>
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
          <CommonBadge icon="mingcute:tag" color="gray" :label="record.name" linear />
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <MemberTagModal :id="record.id" @success="loadData">
              <a-button type="text">
                编辑
              </a-button>
            </MemberTagModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
