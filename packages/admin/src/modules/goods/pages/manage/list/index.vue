<script lang="ts" setup>
import type { TableColumnData, TableExpandable } from '@arco-design/web-vue'

import { AssetsBrowserImage } from '@/assets/components'
import {
  GoodsBatchSetupModal,
  GoodsBrandSelector,
  GoodsCategorySelector,
  GoodsStockEditModal,
  GoodsTagsSelector,
  GoodsTypeSelector,
} from '@/goods/components'
import {
  GoodsSkuList,
} from '@/goods/components/sku'

import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import {
  GOODS_STATUSES,
  GOODS_STATUS_ALARM,
  GOODS_STATUS_DRAFT,
  GOODS_STATUS_IN_STOCK,
  GOODS_STATUS_SOLD_OUT,
  GOODS_TYPES,
} from '@/goods/constants'

import {
  batchDeleteGoods,
  copyGoodsToDraft,
  countGoodsAlarms,
  fetchGoodsPages,
  setGoodsInStock,
  setGoodsSoldOut,
  updateGoodsSort,
} from '@/goods/apis/goods'
import type { IGoods } from '@/goods/types'

defineOptions({
  name: 'GoodsManageListIndexPage',
})

const route = useRoute()
const router = useRouter()

const selectedKeys = ref<IGoods['id'][]>([])
const expandedRowKeys = ref<Array<string | number>>([])
const searchForm = reactive({
  status: 'all',
  name: '',
  sku: '',
  type: 0,
  price: 0,
  stock: 0,
  category: 0,
  brand: 0,
  tag: 0,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
})
const computedSearchForm = computed(() => ({ ...removeEmpty(searchForm, true, ['all']) }))

const message = useMessage({
  onClose: () => {
    refresh()
  },
})

const columns: TableColumnData[] = [
  {
    title: '商品信息',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: '商品类型',
    dataIndex: 'type',
    slotName: 'type',
    width: 100,
  },
  {
    title: '价格',
    dataIndex: 'price',
    slotName: 'price',
    width: 100,
  },
  {
    title: '库存',
    dataIndex: 'stock',
    slotName: 'stock',
    width: 100,
  },
  {
    title: '销量',
    dataIndex: 'sales',
    slotName: 'sales',
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    slotName: 'sort',
    titleSlotName: 'sortTitle',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    slotName: 'createdTime',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    titleSlotName: 'statusTitle',
    width: 80,
  },
  {
    title: '',
    slotName: 'actions',
    width: 160,
    fixed: 'right',
  },
]

const expandable = reactive<TableExpandable>({
  expandedRowRender: (record) => {
    return h(GoodsSkuList, { id: record.id, unit: record.unit })
  },
})

const isAffix = ref(false)

const alarms = ref(0)
countGoodsAlarms().then(res => (alarms.value = res))

const { loading, data, refreshData } = fetchGoodsPages()

watch(
  () => route.query,
  () => {
    const formData = searchForm as Record<string, string | number>

    Object.keys(route.query).forEach((key) => {
      if (['status', 'name', 'sku'].includes(key))
        formData[key] = route.query[key] as string
      else
        formData[key] = Number(route.query[key] as string)
    })

    selectedKeys.value = []
    expandedRowKeys.value = []
    refreshData(computedSearchForm.value)
  },
  { immediate: true },
)

function refresh() {
  handleSearch()

  selectedKeys.value = []
  expandedRowKeys.value = []

  searchForm.page === 1 && refreshData({ ...computedSearchForm.value })
}

function handleSearch() {
  router.replace({ query: { ...computedSearchForm.value, page: 1 } })
}

function handleTabsChange(status: string | number) {
  router.replace({ query: { ...route.query, status, page: 1 } })
}

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(size: number) {
  router.replace({ query: { ...route.query, page: 1, pageSize: size } })
}

function handleGoodsSortChange(id: number, sort: number) {
  updateGoodsSort(id, sort)
    .then(() => {
      message.success('修改排序成功')
    })
}

function handleGoodsCopy(id: IGoods['id']) {
  copyGoodsToDraft(id).then(() => {
    searchForm.status = GOODS_STATUS_DRAFT
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
        v-permission="['shop.goods.manage.list.create']"
        type="primary"
        @click="$router.push({ path: '/goods/manage/list/create/goods' })"
      >
        发布商品
      </a-button>
    </template>

    <a-alert v-if="alarms > 0" title="售馨预警" type="warning" closable>
      您有 {{ alarms }} 个商品即将售馨(或已经售馨), 请您及时<a-link @click="handleTabsChange(GOODS_STATUS_ALARM)">
        处理
      </a-link>, 避免造成不必要的损失。
    </a-alert>

    <CommonCard>
      <template #extra>
        <a-affix :offset-top="133" @change="(val) => (isAffix = val)">
          <div :class="{ 'bg-white pb-4 border-solid border-0 border-b-1 border-$color-border-2': isAffix }" class="pt-4 px-4">
            <a-tabs
              v-model:active-key="searchForm.status"
              type="card"
              size="large"
              class="mb-4"
              hide-content
              @change="handleTabsChange"
            >
              <a-tab-pane key="all" title="全部" />
              <a-tab-pane v-for="item in GOODS_STATUSES" :key="item.value">
                <template #title>
                  <a-badge :count="item.value === GOODS_STATUS_ALARM ? alarms : 0" :offset="[6, -3]" dot>
                    {{ item.label }}
                  </a-badge>
                </template>
              </a-tab-pane>
            </a-tabs>

            <a-space>
              <CommonDeleteBtn @ok="handleBatchDelete(selectedKeys)">
                <a-button
                  :disabled="selectedKeys.length === 0 && $permission(['shop.goods.manage.list.delete'])"
                  size="small"
                >
                  删除
                </a-button>
              </CommonDeleteBtn>

              <a-button
                v-if="searchForm.status === GOODS_STATUS_SOLD_OUT || searchForm.status === GOODS_STATUS_DRAFT"
                :disabled="selectedKeys.length === 0"
                size="small"
                @click="handleBatchInStock(selectedKeys)"
              >
                上架
              </a-button>

              <a-button
                v-if="searchForm.status === GOODS_STATUS_IN_STOCK"
                :disabled="selectedKeys.length === 0"
                size="small"
                @click="handleBatchSoldOut(selectedKeys)"
              >
                下架
              </a-button>

              <GoodsBatchSetupModal :ids="selectedKeys" @success="refresh">
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
          pageSize: searchForm.pageSize,
          showPageSize: true,
          showTotal: true,
          hideOnSinglePage: true,
        }"
        row-key="id"
        hoverable
        stripe
        show-empty-tree
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #sortTitle>
          排序
          <a-tooltip content="提示: 点击编辑按钮开始编辑排序, 数值越小越靠前" mini>
            <CommonIcon name="ph:question-fill" c-primary />
          </a-tooltip>
        </template>

        <template #statusTitle>
          状态
          <a-tooltip content="提示: 在售状态下的商品无法编辑, 需要先将商品下架, 再进行编辑" mini>
            <CommonIcon name="ph:question-fill" c-primary />
          </a-tooltip>
        </template>

        <template #name="{ record }">
          <div flex="~ gap-4">
            <AssetsBrowserImage :asset="record.images[0]" width="60" height="60" />
            <div flex="~ 1 col">
              <a-typography-text bold :ellipsis="{ showTooltip: true }">
                {{ record.name }}
              </a-typography-text>

              <a-overflow-list>
                <a-tag size="small" color="orangered">
                  {{ record.tag && record.tag.name }}
                </a-tag>
                <a-tag v-for="item in record.services" :key="item.id" size="small" color="blue">
                  {{ item.name }}
                </a-tag>
                <a-tag v-for="item in record.guarantees" :key="item.id" size="small" color="gold">
                  {{ item.name }}
                </a-tag>
              </a-overflow-list>
            </div>
          </div>
        </template>

        <template #type="{ record }">
          {{ GOODS_TYPES.find(item => item.value === record.type)?.label }}
        </template>

        <template #price="{ record }">
          <CommonPrice :price="record.price" mode="suffix" />
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

        <template #createdTime="{ record }">
          {{ formatTimeAgo(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <div class="text-right">
            <a-button
              v-if="record.status !== GOODS_STATUS_IN_STOCK"
              v-permission="['shop.goods.manage.list.edit']"
              type="text"
            >
              编辑
            </a-button>

            <GoodsStockEditModal
              v-if="$permission(['shop.goods.manage.list.edit'])"
              :id="record.id"
              @success="refresh"
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
                  v-if="record.status === GOODS_STATUS_SOLD_OUT || record.status === GOODS_STATUS_DRAFT"
                  v-permission="['shop.goods.manage.list.in-stock']"
                >
                  <a-popconfirm
                    content="确定要上架吗?"
                    @ok="handleBatchInStock([record.id])"
                  >
                    <span>上架</span>
                  </a-popconfirm>
                </a-doption>

                <a-doption
                  v-if="record.status === GOODS_STATUS_IN_STOCK"
                  v-permission="['shop.goods.manage.list.sold-out']"
                >
                  <a-popconfirm
                    content="确定要下架吗?"
                    @ok="handleBatchSoldOut([record.id])"
                  >
                    <span>下架</span>
                  </a-popconfirm>
                </a-doption>

                <a-doption @click="$router.push({ path: '/goods/manage/list/history', query: { id: record.id } })">
                  浏览记录
                </a-doption>

                <a-doption>评价</a-doption>

                <a-doption v-permission="['shop.goods.manage.list.edit']">
                  <a-popconfirm
                    content="确定要复制吗?"
                    @ok="handleGoodsCopy(record.id)"
                  >
                    <span>复制</span>
                  </a-popconfirm>
                </a-doption>

                <a-doption v-permission="['shop.goods.manage.list.delete']">
                  <CommonDeleteBtn @delete="handleBatchDelete([record.id])">
                    <span class="text-danger">删除</span>
                  </CommonDeleteBtn>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <FormSearch :form="searchForm" @search="handleSearch" @reset="handleSearch">
        <a-form-item field="name" label="商品名称" show-colon>
          <a-input v-model="searchForm.name as string" placeholder="请输入" allow-clear />
        </a-form-item>

        <a-form-item field="sku" label="商品SKU" show-colon>
          <a-input v-model="searchForm.sku as string" placeholder="请输入" allow-clear />
        </a-form-item>

        <a-form-item field="type" label="商品类型" show-colon>
          <GoodsTypeSelector v-model="searchForm.type" />
        </a-form-item>

        <a-form-item field="price" label="商品价格" show-colon>
          <FormPriceInput v-model="searchForm.price" placeholder="请输入" allow-clear />
        </a-form-item>

        <template #more>
          <a-form-item field="stock" label="商品库存" show-colon>
            <FormNumberInput v-model="searchForm.stock" placeholder="请输入" allow-clear />
          </a-form-item>

          <a-form-item field="category" label="所属分类" show-colon>
            <GoodsCategorySelector v-model="searchForm.category" />
          </a-form-item>

          <a-form-item field="brand" label="所属品牌" show-colon>
            <GoodsBrandSelector v-model="searchForm.brand" />
          </a-form-item>

          <a-form-item field="tag" label="商品标签" show-colon>
            <GoodsTagsSelector v-model="searchForm.tag" />
          </a-form-item>
        </template>

        <template #footer>
          <a-button v-permission="['shop.goods.manage.list.export']">
            导出查询结果
          </a-button>
        </template>
      </FormSearch>
    </template>
  </CommonContainer>
</template>
