<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import {
  GoodsBrandSelector,
  GoodsCategorySelector,
  GoodsStockEditModal,
  GoodsTagsSelector,
  GoodsTypeSelector,
} from '@/goods/components'

import {
  GOODS_STATUSES,
  GOODS_STATUS_DRAFT,
  GOODS_STATUS_IN_STOCK,
  GOODS_STATUS_SOLD_OUT,
  GOODS_TYPES,
} from '@/goods/constants'

defineOptions({
  name: 'GoodsManageListIndexPage',
})

const searchForm = reactive({
  test: '',
})

const columns = [
  {
    title: '商品信息',
    dataIndex: 'name',
    slotName: 'name',
    width: 400,
  },
  {
    title: '商品类型',
    dataIndex: 'type',
    slotName: 'type',
  },
  {
    title: '价格',
    dataIndex: 'price',
    slotName: 'price',
  },
  {
    title: '库存',
    dataIndex: 'pcs',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    titleSlotName: 'statusTitle',
  },
  {
    title: '',
    slotName: 'actions',
    width: 200,
  },
]

const data = [
  { id: 1, name: 'Apple Watch SE 智能手表 GPS款 40毫米米金色铝金属表壳 星光色运动型表带MKQ03CH/A', cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp', tag: '新', type: 'goods', price: 10.00, pcs: 10, sort: 1, createdTime: '2022-01-01', status: 'in-stock' },
  { id: 2, name: 'Apple Watch SE 智能手表 GPS款 40毫米米金色铝金属表壳 星光色运动型表带MKQ03CH/A', cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp', tag: '热', type: 'virtual', price: 10.00, pcs: 10, sort: 1, createdTime: '2022-01-01', status: 'sold-out' },
  { id: 3, name: 'Apple Watch SE 智能手表 GPS款 40毫米米金色铝金属表壳 星光色运动型表带MKQ03CH/A', cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp', tag: '荐', type: 'card', price: 10.00, pcs: 10, sort: 1, createdTime: '2022-01-01', status: 'draft' },
]

const status = ref('all')
const selectedKeys = ref<number[]>([])

/**
 * 批量删除
 */
function handleBatchDelete() {
  Message.success({
    content: '删除成功',
  })
}

/**
 * 批量上架
 */
function handleBatchInStock() {
  Message.success({
    content: '上架成功',
  })
}

/**
 * 批量下架
 */
function handleBatchSoldOut() {
  Message.success({
    content: '下架成功',
  })
}

/**
 * 批量设置
 */
function handleBatchSetup() {
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

    <a-alert title="售馨预警" type="warning" closable>
      您有 2 个商品即将售馨, 请您及时<a-link @click="status = 'alert'">
        处理
      </a-link>, 以免造成不必要的损失。
    </a-alert>

    <CommonCard>
      <a-tabs v-model:active-key="status" type="card" size="large" hide-content mb-4>
        <a-tab-pane key="all" title="全部" />
        <a-tab-pane :key="GOODS_STATUS_IN_STOCK" title="在售" />
        <a-tab-pane :key="GOODS_STATUS_SOLD_OUT" title="仓库" />
        <a-tab-pane key="alert">
          <template #title>
            <a-badge :count="2" :offset="[6, -3]" dot>
              预警
            </a-badge>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="GOODS_STATUS_DRAFT" title="草稿" />
      </a-tabs>

      <a-space mb-4>
        <CommonDeleteBtn @ok="handleBatchDelete">
          <a-button
            :disabled="selectedKeys.length === 0 && $permission(['shop.goods.manage.list.delete'])"
            size="small"
          >
            删除
          </a-button>
        </CommonDeleteBtn>

        <a-button
          v-if="status === GOODS_STATUS_SOLD_OUT || status === GOODS_STATUS_DRAFT"
          :disabled="selectedKeys.length === 0"
          size="small"
          @click="handleBatchInStock"
        >
          上架
        </a-button>

        <a-button
          v-if="status === GOODS_STATUS_IN_STOCK"
          :disabled="selectedKeys.length === 0"
          size="small"
          @click="handleBatchSoldOut"
        >
          下架
        </a-button>

        <a-button
          :disabled="selectedKeys.length === 0"
          size="small"
          @click="handleBatchSetup"
        >
          设置
        </a-button>
      </a-space>

      <a-table
        v-model:selected-keys="selectedKeys"
        :columns="columns"
        :data="data"
        :bordered="false"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false,
        }"
        row-key="id"
        hoverable
        stripe
        show-empty-tree
      >
        <template #statusTitle>
          状态
          <a-tooltip content="提示: 在售状态下的商品无法编辑, 需要先将商品下架, 再进行编辑" mini>
            <CommonIcon name="ph:question-fill" c-primary />
          </a-tooltip>
        </template>

        <template #name="{ record }">
          <div flex="~ gap-4">
            <a-image
              width="60"
              :src="record.cover"
            />
            <div flex="~ 1 col">
              <a-typography-text bold :ellipsis="{ showTooltip: true }">
                {{ record.name }}
              </a-typography-text>
              <a-space>
                <a-tag size="small" color="orangered">
                  {{ record.tag }}
                </a-tag>
              </a-space>
            </div>
          </div>
        </template>

        <template #type="{ record }">
          {{ GOODS_TYPES.find(item => item.value === record.type)?.label }}
        </template>

        <template #price="{ record }">
          {{ record.price.toFixed(2) }} 元
        </template>

        <template #status="{ record }">
          <a-tag
            :color="record.status === 'in-stock' ? 'blue' : record.status === 'sold-out' ? 'red' : 'gray'"
            size="small"
          >
            {{ GOODS_STATUSES.find(item => item.value === record.status)?.label }}
          </a-tag>
        </template>

        <template #actions="{ record }">
          <div align="right">
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
                  上架
                </a-doption>
                <a-doption
                  v-if="record.status === GOODS_STATUS_IN_STOCK"
                  v-permission="['shop.goods.manage.list.sold-out']"
                >
                  下架
                </a-doption>
                <a-doption @click="$router.push({ path: '/goods/manage/list/history', query: { id: record.id } })">
                  浏览记录
                </a-doption>
                <a-doption>评价</a-doption>
                <a-doption
                  v-permission="['shop.goods.manage.list.edit']"
                >
                  复制
                </a-doption>
                <a-doption v-permission="['shop.goods.manage.list.delete']">
                  <CommonDeleteBtn>
                    <div>删除</div>
                  </CommonDeleteBtn>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </template>
      </a-table>
    </CommonCard>

    <template #header>
      <FormSearch :form="searchForm">
        <a-form-item
          field="name"
          label="商品名称"
          show-colon
        >
          <a-input v-model="searchForm.test" placeholder="请输入" />
        </a-form-item>

        <a-form-item
          field="sku"
          label="商品SKU"
          show-colon
        >
          <a-input v-model="searchForm.test" placeholder="请输入" />
        </a-form-item>

        <a-form-item
          field="verificationCodeExpires"
          label="商品类型"
          show-colon
        >
          <GoodsTypeSelector />
        </a-form-item>

        <a-form-item
          field="verificationCodeExpires"
          label="商品价格"
          show-colon
        >
          <a-input v-model="searchForm.test" placeholder="请输入" />
        </a-form-item>

        <template #more>
          <a-form-item
            field="verificationCodeExpires"
            label="商品库存"
            show-colon
          >
            <a-input v-model="searchForm.test" placeholder="请输入" />
          </a-form-item>

          <a-form-item
            field="verificationCodeExpires"
            label="所属分类"
            show-colon
          >
            <GoodsCategorySelector />
          </a-form-item>

          <a-form-item
            field="verificationCodeExpires"
            label="所属品牌"
            show-colon
          >
            <GoodsBrandSelector />
          </a-form-item>

          <a-form-item
            field="verificationCodeExpires"
            label="商品标签"
            show-colon
          >
            <GoodsTagsSelector />
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
