<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import { fetchStaffLogPages } from '@/auth/apis'
import {
  StaffLogTypeBadge,
  StaffLogsSearchForm,
} from '@/auth/components'

defineOptions({
  name: 'AuthLogsLoginPage',
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive<{
  type: string
  keywordType: string
  keyword: string
  time: string[]
  page: number
  pagesize: number
}>({
  type: '',
  keywordType: 'name',
  keyword: '',
  time: [],
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '日志操作', dataIndex: 'action', width: 140 },
  { title: '日志内容', dataIndex: 'content' },
  { title: '操作人', dataIndex: 'staff', slotName: 'staff', width: 100 },
  { title: '日志类型', dataIndex: 'type', slotName: 'type', width: 140 },
  { title: '额外信息', dataIndex: 'extra', slotName: 'extra', width: 160 },
  { title: '操作时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 180 },
]

const { loading, data, refreshData } = fetchStaffLogPages()

const { query, params, transformQuery } = useSearchForm({
  form: searchForm,
  combinedKeys: ['keywordType', 'keyword'],
  stringKeys: ['type'],
  splitStringKeys: ['time'],
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

function handleReset() {
  searchForm.time = []
  handleSearch()
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
</script>

<template>
  <CommonContainer flexible>
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
        <template #type="{ record }">
          <StaffLogTypeBadge :value="record.type" dotted />
        </template>

        <template #staff="{ record }">
          {{ record.staff.name }}
        </template>

        <template #extra="{ record }">
          <div class="flex-(~ v-center) gap-2">
            <CommonBadge icon="mingcute:radar-2" color="gray" :label="record.extra.ip" linear />

            <a-tooltip :content="`IP: ${record.extra.ip} | 浏览器: ${record.extra.ua} | 操作系统: ${record.extra.os}`">
              <CommonIcon name="mingcute:more-1" color="gray" />
            </a-tooltip>
          </div>
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <StaffLogsSearchForm v-model:form="searchForm" @search="handleSearch" @reset="handleReset" />
    </template>
  </CommonContainer>
</template>
