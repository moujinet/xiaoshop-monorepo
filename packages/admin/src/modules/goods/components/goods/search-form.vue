<script lang="ts" setup>
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'

import {
  GoodsBrandSelector,
  GoodsCategorySelector,
  GoodsGroupSelector,
  GoodsSourceSelector,
  GoodsTagSelector,
} from '@/goods/components'

defineOptions({
  name: 'GoodsSearchForm',
})

const keywordTypes = [
  { label: '商品名称', value: 'name' },
  { label: 'SKU 编码', value: 'sku' },
]

const search = defineModel('search', {
  type: Object,
  default: () => ({
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
  }),
})
</script>

<template>
  <FormSearch :form="search">
    <a-form-item field="keyword" label="商品搜索" show-colon>
      <a-input-group class="flex-auto">
        <a-select v-model="search.keywordType" class="w-110px!">
          <a-option v-for="t in keywordTypes" :key="t.value" :value="t.value" :label="t.label" />
        </a-select>

        <a-input v-model="search.keyword" class="flex-1" placeholder="请输入" allow-clear />
      </a-input-group>
    </a-form-item>

    <a-form-item field="categoryId" label="所属分类" show-colon>
      <GoodsCategorySelector v-model="search.categoryId" />
    </a-form-item>

    <a-form-item field="groupId" label="商品分组" show-colon>
      <GoodsGroupSelector v-model="search.groupId" />
    </a-form-item>

    <template #more>
      <a-form-item field="brandId" label="所属品牌" show-colon>
        <GoodsBrandSelector v-model="search.brandId" />
      </a-form-item>

      <a-form-item field="tagId" label="商品标签" show-colon>
        <GoodsTagSelector v-model="search.tagId" />
      </a-form-item>

      <a-form-item field="source" label="商品来源" show-colon>
        <GoodsSourceSelector v-model="search.source" />
      </a-form-item>

      <a-form-item field="price" label="商品价格" show-colon>
        <a-input-group>
          <FormPriceInput v-model="search.price[0]" placeholder="起始价格" allow-clear />
          <FormPriceInput v-model="search.price[1]" placeholder="结束价格" allow-clear />
        </a-input-group>
      </a-form-item>

      <a-form-item field="stock" label="商品库存" show-colon>
        <a-input-group>
          <FormNumberInput v-model="search.stock[0]" placeholder="起始库存" allow-clear>
            <template #suffix>
              <span>件</span>
            </template>
          </FormNumberInput>

          <FormNumberInput v-model="search.stock[1]" placeholder="结束库存" allow-clear>
            <template #suffix>
              <span>件</span>
            </template>
          </FormNumberInput>
        </a-input-group>
      </a-form-item>

      <a-form-item field="sales" label="商品销量" show-colon>
        <a-input-group>
          <FormNumberInput v-model="search.sales[0]" placeholder="起始销量" allow-clear>
            <template #suffix>
              <span>件</span>
            </template>
          </FormNumberInput>

          <FormNumberInput v-model="search.sales[1]" placeholder="结束销量" allow-clear>
            <template #suffix>
              <span>件</span>
            </template>
          </FormNumberInput>
        </a-input-group>
      </a-form-item>

      <a-form-item field="inStockTime" label="上架时间" show-colon>
        <a-range-picker v-model="search.inStockTime" />
      </a-form-item>

      <a-form-item field="soldOutTime" label="下架时间" show-colon>
        <a-range-picker v-model="search.soldOutTime" />
      </a-form-item>

      <a-form-item field="createdTime" label="发布时间" show-colon>
        <a-range-picker v-model="search.createdTime" />
      </a-form-item>
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </FormSearch>
</template>
