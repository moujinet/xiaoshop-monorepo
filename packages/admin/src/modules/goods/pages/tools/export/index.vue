<script lang="ts" setup>
import { GoodsExportRecordStatus } from '@xiaoshop/schema'
import type { TableColumnData } from '@arco-design/web-vue'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import {
  GoodsBrandSelector,
  GoodsCategorySelector,
  GoodsExportConditions,
  GoodsExportStatusTag,
  GoodsGroupSelector,
  GoodsSourceSelector,
  GoodsStatusSelector,
  GoodsTagSelector,
} from '@/goods/components'

import {
  createGoodsExport,
  deleteGoodsExport,
  fetchGoodsExportPages,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsToolsExportIndexPage',
  inheritAttrs: false,
})

const route = useRoute()
const router = useRouter()

const categoriesRef = ref()
const brandRef = ref()
const groupRef = ref()
const tagRef = ref()

const refs = {
  categories: categoriesRef,
  group: groupRef,
  brand: brandRef,
  tag: tagRef,
}

const page = ref(1)
const pagesize = ref(DEFAULT_PAGE_SIZE)

const conditions = reactive({
  status: '',
  source: '',
  categoryIds: [],
  groupId: 0,
  brandId: 0,
  tagId: 0,
})

const columns: TableColumnData[] = [
  { title: '条件', dataIndex: 'conditions', slotName: 'conditions' },
  { title: '数量', dataIndex: 'count', align: 'center', width: 80 },
  { title: '状态', dataIndex: 'status', slotName: 'status', width: 140 },
  { title: '时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 180 },
  { title: '操作', dataIndex: 'actions', slotName: 'actions', align: 'center', width: 120 },
]

const host = useSettings().getOption('upload.customDomain', '')

const {
  loading,
  data,
  refreshData,
} = fetchGoodsExportPages()

const message = useMessage({
  onClose: () => {
    refresh()
  },
})

watch(
  () => route.query,
  () => {
    page.value = route.query.page ? Number(route.query.page) : 1
    pagesize.value = route.query.pagesize ? Number(route.query.pagesize) : DEFAULT_PAGE_SIZE

    refresh()
  },
)

setTimeout(() => {
  refresh()
}, 300)

function refresh() {
  refreshData({
    page: page.value,
    pagesize: pagesize.value,
  })
}

function handlePageChange(current: number) {
  router.replace({ query: { ...route.query, page: current } })
}

function handlePageSizeChange(size: number) {
  router.replace({ query: { ...route.query, page: 1, pagesize: size } })
}

function handleExportClick() {
  AModal.confirm({
    title: '导出商品',
    content: '是否确认按照商品筛选条件导出商品数据?',
    bodyClass: 'text-center',
    okText: '开始导出',
    onOk: () => {
      createGoodsExport(removeEmpty({ ...conditions }, true))
        .then(() => {
          message.success('导出任务创建成功')
        })
    },
  })
}

function handleDelete(id: number) {
  deleteGoodsExport(id).then(() => {
    message.success('删除成功')
  })
}
</script>

<template>
  <CommonContainer flexible>
    <CommonCard title="筛选商品">
      <a-form :model="conditions" class="form-search__form" layout="inline" label-align="right">
        <a-form-item field="status" label="所属状态" show-colon>
          <GoodsStatusSelector v-model="conditions.status" />
        </a-form-item>

        <a-form-item field="source" label="商品来源" show-colon>
          <GoodsSourceSelector v-model="conditions.source" />
        </a-form-item>

        <a-form-item field="categoryIds" label="所属分类" show-colon>
          <GoodsCategorySelector ref="categoriesRef" v-model="conditions.categoryIds" multiple />
        </a-form-item>

        <a-form-item field="groupId" label="商品分组" show-colon>
          <GoodsGroupSelector ref="groupRef" v-model="conditions.groupId" />
        </a-form-item>

        <a-form-item field="tagId" label="商品标签" show-colon>
          <GoodsTagSelector ref="tagRef" v-model="conditions.tagId" />
        </a-form-item>

        <a-form-item field="brandId" label="所属品牌" show-colon>
          <GoodsBrandSelector ref="brandRef" v-model="conditions.brandId" />
        </a-form-item>
      </a-form>

      <div class="form-search__footer">
        <a-button type="primary" @click="handleExportClick">
          导出
        </a-button>
      </div>
    </CommonCard>

    <CommonCard title="导出记录">
      <a-table
        :loading="loading"
        :columns="columns"
        :data="data && data.result"
        :bordered="false"
        :pagination="{
          total: data && data.total,
          current: page,
          pageSize: pagesize,
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
        <template #conditions="{ record }">
          <GoodsExportConditions
            :conditions="record.conditions"
            :refs="refs"
          />
        </template>

        <template #status="{ record }">
          <GoodsExportStatusTag :value="record.status" dotted />

          <template v-if="record.status === GoodsExportRecordStatus.FAILED">
            <a-tooltip :content="record.result">
              <CommonIcon name="mingcute:more-1" color="gray" class="ml-2" active />
            </a-tooltip>
          </template>
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <template v-if="record.status === GoodsExportRecordStatus.SUCCESS">
            <CommonLink type="primary" target="_blank" :href="`${host}/${record.result}`">
              下载
            </CommonLink>
          </template>

          <CommonConfirm @ok="handleDelete(record.id)" />
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
