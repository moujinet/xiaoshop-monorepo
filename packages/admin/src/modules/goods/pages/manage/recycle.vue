<script lang="ts" setup>
import { Modal, type TableColumnData } from '@arco-design/web-vue'

import { GOODS_TYPES } from '@/goods/constants'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import { AssetsBrowserImage } from '@/assets/components'
import { GoodsCategorySelector, GoodsTypeSelector } from '@/goods/components'

import {
  cleanupDeletedGoods,
  fetchGoodsRecyclePages,
  shiftDeleteGoods,
  undeletedGoods,
} from '@/goods/apis/goods'

defineOptions({
  name: 'GoodsManageRecyclePage',
})

const route = useRoute()
const router = useRouter()

const searchForm = reactive({
  name: '',
  sku: '',
  type: 0,
  category: 0,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
})
const computedSearchForm = computed(() => ({ ...removeEmpty(searchForm, true) }))

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
    title: '删除时间',
    dataIndex: 'createdTime',
    slotName: 'createdTime',
    width: 180,
  },
  {
    title: '',
    slotName: 'actions',
    width: 160,
    fixed: 'right',
  },
]

const message = useMessage({
  onClose: () => {
    refresh()
  },
})

const { loading, data, refreshData } = fetchGoodsRecyclePages()

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

    refreshData(computedSearchForm.value)
  },
  { immediate: true },
)

function refresh() {
  handleSearch()

  searchForm.page === 1 && refreshData({ ...computedSearchForm.value })
}

function handleSearch() {
  router.replace({ query: { ...computedSearchForm.value, page: 1 } })
}

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(size: number) {
  router.replace({ query: { ...route.query, page: 1, pageSize: size } })
}

function handleCleanupDeleted() {
  Modal.confirm({
    title: '确定要清空回收站吗?',
    content: '清空回收站后的商品不可恢复, 请谨慎操作!',
    onOk: () => {
      cleanupDeletedGoods().then(() => {
        message.success('回收站已全部清空')
      })
    },
  })
}

function handleUndeleted(id: number) {
  undeletedGoods(id).then(() => {
    message.success('恢复成功')
  })
}

function handleShiftDelete(id: number) {
  shiftDeleteGoods(id).then(() => {
    message.success('彻底删除成功')
  })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <a-button type="primary" @click="handleCleanupDeleted()">
        清空回收站
      </a-button>
    </template>

    <FormSearch :form="searchForm" @search="handleSearch" @reset="handleSearch">
      <a-form-item field="name" label="商品名称" show-colon>
        <a-input v-model="searchForm.name as string" placeholder="请输入" allow-clear />
      </a-form-item>

      <a-form-item field="sku" label="商品SKU" show-colon>
        <a-input v-model="searchForm.sku as string" placeholder="请输入" allow-clear />
      </a-form-item>

      <a-form-item field="category" label="所属分类" show-colon>
        <GoodsCategorySelector v-model="searchForm.category" />
      </a-form-item>

      <a-form-item field="type" label="商品类型" show-colon>
        <GoodsTypeSelector v-model="searchForm.type" />
      </a-form-item>
    </FormSearch>

    <CommonCard>
      <a-table
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :bordered="false"
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

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <div class="text-right">
            <a-button
              v-permission="['shop.goods.manage.recycle.undeleted']"
              type="text"
              @click="handleUndeleted(record.id)"
            >
              恢复
            </a-button>

            <a-dropdown :hide-on-select="false">
              <a-button type="text">
                更多
              </a-button>

              <template #content>
                <a-doption @click="$router.push({ path: '/goods/manage/list/history', query: { id: record.id } })">
                  浏览记录
                </a-doption>

                <a-doption>评价</a-doption>

                <a-doption v-permission="['shop.goods.manage.recycle.delete']">
                  <CommonDeleteBtn @delete="handleShiftDelete(record.id)">
                    <span class="text-danger">彻底删除</span>
                  </CommonDeleteBtn>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
