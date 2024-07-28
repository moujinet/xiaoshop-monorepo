<script lang="ts" setup>
import {
  Enabled,
} from '@xiaoshop/schema'
import type { TableColumnData, TableExpandable } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import {
  GoodsInfoBlock,
  GoodsSearchForm,
  GoodsSkuExpandList,
} from '@/goods/components'
import {
  fetchGoodsPages,
  restoreGoods,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageRecycleIndexPage',
  inheritAttrs: false,
})

const route = useRoute()
const router = useRouter()
const expandedRowKeys = ref<Array<string | number>>([])

const columns: TableColumnData[] = [
  { title: '商品信息', dataIndex: 'name', slotName: 'name' },
  { title: '价格', dataIndex: 'price', slotName: 'price', width: 100, align: 'right' },
  { title: '库存', dataIndex: 'inventory', slotName: 'inventory', width: 100, align: 'right' },
  { title: '销量', dataIndex: 'sales', slotName: 'sales', width: 100, align: 'right' },
  { title: '删除时间', dataIndex: 'deletedTime', slotName: 'deletedTime', width: 180, align: 'right' },
  { title: '操作', slotName: 'actions', width: 90, align: 'center', fixed: 'right' },
]

const searchForm = reactive({
  keywordType: 'name',
  keyword: '',
  status: 'all',
  source: '',
  categoryId: 0,
  groupId: 0,
  brandId: 0,
  tagId: 0,
  price: [],
  inventory: [],
  sales: [],
  inStockTime: [],
  stockedTime: [],
  createdTime: [],
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const { loading, data, refreshData } = fetchGoodsPages()

const message = useMessage({
  onClose: () => {
    handleRefresh()
  },
})

const expandable = reactive<TableExpandable>({
  expandedRowRender: (record) => {
    return h(GoodsSkuExpandList, { id: record.id, unit: record.unit })
  },
})

watch(
  () => route.query,
  () => {
    const formData = searchForm as Record<string, string | number | any[]>

    Object.keys(route.query)
      .forEach((key) => {
        if (['type', 'status', 'source', 'keywordType', 'keyword'].includes(key))
          formData[key] = route.query[key] as string
        else if (['price', 'inventory', 'sales'].includes(key))
          formData[key] = (route.query[key] as string).split(',').map(Number)
        else if (['inStockTime', 'stockedTime', 'createdTime'].includes(key))
          formData[key] = (route.query[key] as string).split(',')
        else
          formData[key] = Number(route.query[key] as string)
      })

    expandedRowKeys.value = []

    searchData()
  },
  { immediate: true },
)

function searchData() {
  const formData = searchForm as Record<string, string | number | any[]>
  const search: Record<string, string> = {}

  if (formData.keyword !== '')
    search[formData.keywordType as string] = formData.keyword as string

  Object.keys(formData)
    .filter(k => !['keyword', 'keywordType'].includes(k))
    .forEach((key) => {
      if (['price', 'inventory', 'sales', 'inStockTime', 'stockedTime', 'createdTime'].includes(key))
        search[key] = (formData[key] as []).join(',')
      else
        search[key] = formData[key] as string
    })

  refreshData({
    ...removeEmpty(search, true, ['all']),
    isDeleted: Enabled.YES,
  })
}

function handleRefresh() {
  handleSearch()

  expandedRowKeys.value = []

  if (searchForm.page === 1)
    searchData()
}

function handleReset() {
  searchForm.price = []
  searchForm.inventory = []
  searchForm.sales = []
  searchForm.inStockTime = []
  searchForm.stockedTime = []
  searchForm.createdTime = []

  handleSearch()
}

function handleSearch() {
  const formData = searchForm as Record<string, string | number | any[]>
  const search: Record<string, string> = {}

  Object.keys(formData)
    .forEach((key) => {
      if (['price', 'inventory', 'sales', 'inStockTime', 'stockedTime', 'createdTime'].includes(key))
        search[key] = (formData[key] as []).join(',')
      else
        search[key] = formData[key] as string
    })

  router.replace({
    query: {
      ...removeEmpty(search, true, ['all']),
      page: 1,
    },
  })
}

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(size: number) {
  router.replace({ query: { ...route.query, page: 1, size } })
}

function handleRestoreGoods(id: string) {
  restoreGoods(id).then(() => {
    message.success('恢复成功')
  })
}
</script>

<template>
  <CommonContainer flexible>
    <CommonCard>
      <a-table
        v-model:expanded-keys="expandedRowKeys"
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :bordered="false"
        :expandable="expandable"
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
        show-empty-tree
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #name="{ record }">
          <GoodsInfoBlock :goods="record" />
        </template>

        <template #price="{ record }">
          <CommonLabel :value="record.price" type="price" suffix="元" />
        </template>

        <template #inventory="{ record }">
          {{ record.inventory }} <small class="text-gray">{{ record.unit }}</small>
        </template>

        <template #sales="{ record }">
          {{ record.sales }} <small class="text-gray">{{ record.unit }}</small>
        </template>

        <template #deletedTime="{ record }">
          {{ formatDateTime(record.deletedTime) }}
        </template>

        <template #actions="{ record }">
          <CommonConfirm
            v-permission="['shop.goods.manage.recycle.restore']"
            confirm-ok-text="恢复"
            @ok="handleRestoreGoods(record.id)"
          />
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <GoodsSearchForm v-model:search="searchForm" @search="handleSearch" @reset="handleReset" />
    </template>
  </CommonContainer>
</template>
