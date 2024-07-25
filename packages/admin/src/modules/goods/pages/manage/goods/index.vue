<script lang="ts" setup>
import {
  GOODS_STATUSES,
  GOODS_TYPES,
  GoodsStatusEnum,
  GoodsTypeEnum,
  type IGoods,
} from '@xiaoshop/schema'
import type { TableColumnData } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import {
  GoodsSearchForm,
} from '@/goods/components'
import {
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
  { title: '商品类型', dataIndex: 'type', slotName: 'type', width: 100 },
  { title: '价格', dataIndex: 'price', slotName: 'price', width: 100, align: 'right' },
  { title: '库存', dataIndex: 'stock', slotName: 'stock', width: 100, align: 'right' },
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
  stock: [],
  sales: [],
  inStockTime: [],
  soldOutTime: [],
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

watch(
  () => route.query,
  () => {
    const formData = searchForm as Record<string, string | number | any[]>

    Object.keys(route.query).forEach((key) => {
      if (['type', 'status', 'keywordType', 'keyword'].includes(key))
        formData[key] = route.query[key] as string
      else if (['price', 'stock', 'sales'].includes(key))
        formData[key] = (route.query[key] as string).split(',').map(Number)
      else if (['inStockTime', 'soldOutTime', 'createdTime'].includes(key))
        formData[key] = (route.query[key] as string).split(',')
      else
        formData[key] = Number(route.query[key] as string)
    })

    selectedKeys.value = []
    expandedRowKeys.value = []
    refreshData(transformSearchQuery())
  },
  { immediate: true },
)

function transformSearchQuery() {
  const formData = searchForm as Record<string, string | number | any[]>
  const search: Record<string, string> = {}

  if (formData.keywordType && formData.keyword)
    search[formData.keywordType as string] = formData.keyword as string

  Object.keys(formData)
    .filter(k => !['keyword', 'keywordType'].includes(k))
    .forEach((key) => {
      if (['price', 'stock', 'sales', 'inStockTime', 'soldOutTime', 'createdTime'].includes(key))
        search[key] = (formData[key] as []).join(',')
      else
        search[key] = formData[key] as string
    })

  return { ...removeEmpty(search, true, ['all']) }
}

function handleRefresh() {
  handleSearch()

  selectedKeys.value = []
  expandedRowKeys.value = []

  if (searchForm.page === 1)
    refreshData(transformSearchQuery())
}

function handleSearch() {
  router.replace({ query: { ...transformSearchQuery(), page: 1 } })
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

function handleGoodsSortChange(id: number, sort: number) {
  updateGoodsSort(id, sort)
    .then(() => {
      message.success('修改排序成功')
    })
}

function handleGoodsCopy(id: IGoods['id']) {
  copyGoodsToDraft(id).then(() => {
    searchForm.status = GoodsStatusEnum.DRAFT
    message.success('复制成功')
  })
}

/**
 * 批量删除
 */
function handleBatchDelete(ids: IGoods['id'][]) {
  batchDeleteGoods(ids).then(() => {
    message.success('删除成功')
  })
}

/**
 * 批量上架
 */
function handleBatchInStock(ids: IGoods['id'][]) {
  setGoodsInStock(ids).then(() => {
    message.success('上架成功')
  })
}

/**
 * 批量下架
 */
function handleBatchSoldOut(ids: IGoods['id'][]) {
  setGoodsSoldOut(ids).then(() => {
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
        @click="$router.push({ path: '/goods/manage/goods/create', query: { type: GoodsTypeEnum.ENTITY } })"
      >
        发布商品
      </a-button>
    </template>

    <CommonCard>
      <template #extra>
        <a-affix :offset-top="133" @change="(val) => (isAffix = val)">
          <div class="pt-4 px-4" :class="{ 'bg-white pb-4 border-solid border-0 border-b-1 border-$color-border-2': isAffix }">
            <a-tabs v-model:active-key="searchForm.status" type="card" size="large" class="mb-4" hide-content @change="handleTabsChange">
              <a-tab-pane key="all" title="全部" />
              <a-tab-pane v-for="item in GOODS_STATUSES" :key="item.value">
                <template #title>
                  <a-badge :count="item.value === GoodsStatusEnum.WARNING ? alarms : 0" :offset="[6, -3]" dot>
                    {{ item.label }}
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
                v-if="searchForm.status === GoodsStatusEnum.SOLD_OUT || searchForm.status === GoodsStatusEnum.DRAFT"
                :disabled="selectedKeys.length === 0"
                size="small"
                @click="handleBatchInStock(selectedKeys)"
              >
                上架
              </a-button>

              <a-button
                v-if="searchForm.status === GoodsStatusEnum.IN_STOCK"
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
          <a-tooltip content="提示: 在售状态下的商品无法编辑, 需要先将商品下架, 再进行编辑" mini>
            <CommonIcon name="mingcute:question" class="c-primary" active />
          </a-tooltip>
        </template>

        <template #name="{ record }">
          <GoodsInfoBadge :goods="record" />
        </template>

        <template #type="{ record }">
          {{ GOODS_TYPES.find(item => item.value === record.type)?.label }}
        </template>

        <template #price="{ record }">
          <CommonLabel :value="record.price" type="price" suffix="元" />
        </template>

        <template #stock="{ record }">
          {{ record.stock }} <small class="text-gray">{{ record.unit }}</small>
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
            v-if="record.status !== GoodsStatusEnum.IN_STOCK"
            v-permission="['shop.goods.manage.goods.edit']"
            type="text"
            @click="$router.push({ path: '/goods/manage/goods/edit', query: { id: record.id } })"
          >
            编辑
          </a-button>

          <GoodsStockEditModal
            v-if="$permission(['shop.goods.manage.goods.edit'])"
            :id="record.id"
            @success="handleRefresh"
          >
            <a-button type="text">
              库存
            </a-button>
          </GoodsStockEditModal>

          <a-dropdown :hide-on-select="false">
            <a-button type="text">
              更多
            </a-button>

            <template #content>
              <a-doption
                v-if="record.status === GoodsStatusEnum.SOLD_OUT || record.status === GoodsStatusEnum.DRAFT"
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
                v-if="record.status === GoodsStatusEnum.IN_STOCK"
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
      <GoodsSearchForm v-model:search="searchForm" @search="handleSearch" />
    </template>
  </CommonContainer>
</template>