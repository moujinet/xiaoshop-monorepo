<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { fetchPointsChangeLogPages } from '@/member/apis'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

defineOptions({
  name: 'MemberPointsLogsIndexPage',
  inheritAttrs: false,
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive({
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const columns: TableColumnData[] = [
  { title: '会员信息', dataIndex: 'member', slotName: 'member', width: 320 },
  { title: '来源/用途', dataIndex: 'operation', slotName: 'operation', width: 100 },
  { title: '积分变化', dataIndex: 'change', slotName: 'change', align: 'right', width: 110 },
  { title: '变化后积分', dataIndex: 'points', slotName: 'points', align: 'right', width: 110 },
  { title: '备注', dataIndex: 'reason' },
  { title: '发生时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 180, align: 'right' },
]

const {
  loading,
  data,
  refreshData,
} = fetchPointsChangeLogPages()

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
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-table
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :pagination="{
          total: data && data.total,
          current: searchForm.page,
          pageSize: searchForm.pagesize,
          showPageSize: true,
          showTotal: true,
          hideOnSinglePage: true,
        }"
        :bordered="false"
        row-key="id"
        hoverable
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      />
    </CommonCard>
  </CommonContainer>
</template>
