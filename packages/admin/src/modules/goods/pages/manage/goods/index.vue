<script lang="ts" setup>
import {
  GOODS_STATUSES,
  GoodsStatus,
  GoodsType,
  type IGoods,
} from '@xiaoshop/schema'
import type { TableColumnData, TableExpandable } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import {
  GoodsBatchSetupModal,
  GoodsInfoBlock,
  GoodsInventoryModal,
  GoodsSearchForm,
  GoodsSkuExpandList,
} from '@/goods/components'
import {
  batchSoftDelete,
  batchUpdate,
  copyToDraft,
  countGoodsWarning,
  fetchGoodsPages,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageGoodsIndexPage',
})

const route = useRoute()
const router = useRouter()

const isAffix = ref(false)
const selectedKeys = ref<IGoods['id'][]>([])
const expandedRowKeys = ref<Array<string | number>>([])

const columns: TableColumnData[] = [
  { title: '商品信息', dataIndex: 'name', slotName: 'name' },
  { title: '价格', dataIndex: 'price', slotName: 'price', width: 100, align: 'right' },
  { title: '库存', dataIndex: 'inventory', slotName: 'inventory', width: 100, align: 'right' },
  { title: '销量', dataIndex: 'sales', slotName: 'sales', width: 100, align: 'right' },
  { title: '排序', dataIndex: 'sort', slotName: 'sort', titleSlotName: 'sortTitle', width: 100, align: 'right' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 140, align: 'right' },
  { title: '状态', dataIndex: 'status', slotName: 'status', titleSlotName: 'statusTitle', width: 80 },
  { title: '操作', slotName: 'actions', width: 160, align: 'right', fixed: 'right' },
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

const alarms = ref(0)

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

    selectedKeys.value = []
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

  refreshData({ ...removeEmpty(search, true, ['all']) })

  countGoodsWarning().then((res) => {
    alarms.value = res
  })
}

function handleRefresh() {
  handleSearch()

  selectedKeys.value = []
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

function handleTabsChange(status: string | number) {
  router.replace({ query: { ...route.query, status, page: 1 } })
}

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(size: number) {
  router.replace({ query: { ...route.query, page: 1, size } })
}

function handleGoodsSortChange(id: IGoods['id'], sort: number) {
  batchUpdate([id], { sort })
    .then(() => {
      message.success('修改排序成功')
    })
}

function handleGoodsCopy(id: IGoods['id']) {
  copyToDraft(id).then(() => {
    searchForm.status = GoodsStatus.DRAFT
    message.success('复制成功')
  })
}

function handleBatchDelete(ids: IGoods['id'][]) {
  batchSoftDelete(ids).then(() => {
    message.success('删除成功')
  })
}

function handleBatchInStock(ids: IGoods['id'][]) {
  batchUpdate(ids, { status: GoodsStatus.IN_STOCK }).then(() => {
    message.success('上架成功')
  })
}

function handleBatchSoldOut(ids: IGoods['id'][]) {
  batchUpdate(ids, { status: GoodsStatus.STOCKED }).then(() => {
    message.success('下架成功')
  })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <a-button
        v-permission="['shop.goods.manage.goods.create']"
        type="primary"
        @click="$router.push({ path: '/goods/manage/goods/create', query: { type: GoodsType.ENTITY } })"
      >
        发布商品
      </a-button>
    </template>

    <a-alert v-if="alarms > 0" title="售馨预警" type="warning" closable>
      您有 {{ alarms }} 个商品即将售馨(或已经售馨), 请您及时<a-link @click="handleTabsChange('warning')">
        处理
      </a-link>, 避免造成不必要的损失。
    </a-alert>

    <CommonCard>
      <template #extra>
        <a-affix :offset-top="133" @change="(val) => (isAffix = val)">
          <div class="pt-4 px-4" :class="{ 'bg-white pb-4 border-solid border-0 border-b-1 border-$color-border-2': isAffix }">
            <a-tabs v-model:active-key="searchForm.status" type="card" size="large" class="mb-4" hide-content @change="handleTabsChange">
              <a-tab-pane key="all" title="全部" />
              <a-tab-pane v-for="item in GOODS_STATUSES" :key="item.value" :title="item.label" />
              <a-tab-pane key="warning">
                <template #title>
                  <a-badge :count="alarms" :offset="[6, -3]" dot>
                    预警
                  </a-badge>
                </template>
              </a-tab-pane>
            </a-tabs>

            <a-space>
              <CommonConfirm @ok="handleBatchDelete(selectedKeys)">
                <a-button
                  :disabled="selectedKeys.length === 0 && $permission(['shop.goods.manage.list.delete'])"
                  size="small"
                >
                  删除
                </a-button>
              </CommonConfirm>

              <a-button
                v-if="searchForm.status === GoodsStatus.SOLD_OUT || searchForm.status === GoodsStatus.DRAFT"
                :disabled="selectedKeys.length === 0"
                size="small"
                @click="handleBatchInStock(selectedKeys)"
              >
                上架
              </a-button>

              <a-button
                v-if="searchForm.status === GoodsStatus.IN_STOCK"
                :disabled="selectedKeys.length === 0"
                size="small"
                @click="handleBatchSoldOut(selectedKeys)"
              >
                下架
              </a-button>

              <GoodsBatchSetupModal :ids="selectedKeys" @success="handleRefresh">
                <a-button :disabled="selectedKeys.length === 0" size="small">
                  设置
                </a-button>
              </GoodsBatchSetupModal>
            </a-space>
          </div>
        </a-affix>
      </template>

      <a-table
        v-model:selected-keys="selectedKeys"
        v-model:expanded-keys="expandedRowKeys"
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :bordered="false"
        :expandable="expandable"
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
        hoverable
        show-empty-tree
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #sortTitle>
          排序
          <a-tooltip content="提示: 点击编辑按钮开始编辑排序, 数值越小越靠前" mini>
            <CommonIcon name="mingcute:question" class="c-primary" active />
          </a-tooltip>
        </template>

        <template #statusTitle>
          状态
          <a-tooltip content="提示: 「在售商品」无法编辑, 必须先将商品「下架」后, 才能进行「编辑」操作" mini>
            <CommonIcon name="mingcute:question" class="c-primary" active />
          </a-tooltip>
        </template>

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

        <template #status="{ record }">
          <a-tag
            :color="GOODS_STATUSES.find(item => item.value === record.status)?.color"
            size="small"
          >
            {{ GOODS_STATUSES.find(item => item.value === record.status)?.label }}
          </a-tag>
        </template>

        <template #sort="{ record }">
          <CommonEditable
            type="number"
            :default-value="record.sort"
            @change="(val) => handleGoodsSortChange(record.id, val)"
          />
        </template>

        <template #updatedTime="{ record }">
          {{ formatTimeAgo(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-button
            v-if="record.status !== GoodsStatus.IN_STOCK"
            v-permission="['shop.goods.manage.goods.update']"
            type="text"
            @click="$router.push({ path: '/goods/manage/goods/update', query: { id: record.id } })"
          >
            编辑
          </a-button>

          <GoodsInventoryModal
            v-if="$permission(['shop.goods.manage.goods.update'])"
            :id="record.id"
            @success="handleRefresh"
          >
            <a-button type="text">
              库存
            </a-button>
          </GoodsInventoryModal>

          <a-dropdown :hide-on-select="false">
            <a-button type="text">
              更多
            </a-button>

            <template #content>
              <a-doption
                v-if="record.status === GoodsStatus.SOLD_OUT || record.status === GoodsStatus.DRAFT"
                v-permission="['shop.goods.manage.goods.in-stock']"
              >
                <a-popconfirm
                  content="确定要上架吗?"
                  @ok="handleBatchInStock([record.id])"
                >
                  <span>上架</span>
                </a-popconfirm>
              </a-doption>

              <a-doption
                v-if="record.status === GoodsStatus.IN_STOCK"
                v-permission="['shop.goods.manage.goods.sold-out']"
              >
                <a-popconfirm
                  content="确定要下架吗?"
                  @ok="handleBatchSoldOut([record.id])"
                >
                  <span>下架</span>
                </a-popconfirm>
              </a-doption>

              <a-doption @click="$router.push({ path: '/goods/manage/goods/history', query: { id: record.id } })">
                浏览记录
              </a-doption>

              <a-doption>评价</a-doption>

              <a-doption v-permission="['shop.goods.manage.goods.edit']">
                <a-popconfirm
                  content="确定要复制吗?"
                  @ok="handleGoodsCopy(record.id)"
                >
                  <span>复制</span>
                </a-popconfirm>
              </a-doption>

              <a-doption v-permission="['shop.goods.manage.goods.delete']">
                <CommonConfirm @ok="handleBatchDelete([record.id])">
                  <span class="text-danger">删除</span>
                </CommonConfirm>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <GoodsSearchForm v-model:search="searchForm" @search="handleSearch" @reset="handleReset" />
    </template>
  </CommonContainer>
</template>
