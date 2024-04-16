<script lang="ts" setup>
import { GOODS_ATTRIBUTE_TYPES } from '@/goods/constants'
import { deleteGoodsAttribute, fetchGoodsAttributeList, fetchGoodsAttributeTemplateDetail } from '@/goods/apis/attribute'
import { GoodsAttributeEditModal, GoodsAttributeTemplateEditModal } from '@/goods/components'

defineOptions({
  name: 'GoodsManageAttributesTemplatePage',
})

const columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    slotName: 'type',
    width: 200,
  },
  {
    title: '参数项',
    dataIndex: 'options',
    slotName: 'options',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    slotName: 'createdTime',
    width: 200,
  },
  {
    title: '操作',
    slotName: 'actions',
    width: 100,
  },
]

const detail = reactive({
  id: 0,
  name: '',
  desc: '',
  createdTime: 0,
})

const route = useRoute()
const templateId = route.query.id ? Number(route.query.id) : 0

const {
  loading: templateLoading,
  refreshData: refreshTemplateData,
} = fetchGoodsAttributeTemplateDetail(templateId)

refreshTemplateData().then((res) => {
  detail.id = res.id
  detail.name = res.name
  detail.desc = res.desc
  detail.createdTime = res.createdTime
})

const { loading, data, refreshData } = fetchGoodsAttributeList(templateId)

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteGoodsAttribute(id)
    .then(() => {
      message.success('删除成功')
    })
    .catch(() => {
      message.error('删除失败')
    })
}

function getAttributeTypeColor(type: string) {
  return GOODS_ATTRIBUTE_TYPES.find(item => item.value === type)?.color || 'gray'
}
</script>

<template>
  <CommonContainer flexible>
    <CommonCard :title="`模板: ${detail.name}`" :loading="templateLoading">
      <div flex="~ between v-center">
        <div flex="~ gap-8">
          <div>
            <a-typography-text type="secondary" bold>
              模板说明:
            </a-typography-text>
            <a-typography-text>{{ detail.desc }}</a-typography-text>
          </div>

          <div>
            <a-typography-text type="secondary" bold>
              创建于:
            </a-typography-text>
            <a-typography-text>{{ formatDateTime(detail.createdTime) }}</a-typography-text>
          </div>
        </div>

        <GoodsAttributeTemplateEditModal :id="detail.id">
          <a-button>
            编辑
          </a-button>
        </GoodsAttributeTemplateEditModal>
      </div>
    </CommonCard>

    <CommonCard :loading="loading">
      <a-space direction="vertical" fill>
        <GoodsAttributeEditModal :template-id="templateId" @success="refreshData">
          <a-button type="primary">
            添加参数
          </a-button>
        </GoodsAttributeEditModal>

        <a-table
          :columns="columns"
          :data="data"
          :bordered="false"
          :pagination="false"
          row-key="id"
          hoverable
          stripe
          show-empty-tree
        >
          <template #type="{ record }">
            <a-tag :color="getAttributeTypeColor(record.type)" size="small" bordered>
              {{ GOODS_ATTRIBUTE_TYPES.find(item => item.value === record.type)?.label }}
            </a-tag>
          </template>

          <template #options="{ record }">
            <a-space v-if="record.type !== 'input'">
              <a-tag
                v-for="(item, index) in record.options.split(',').map((it: string) => it.trim())"
                :key="index"
                size="small"
                bordered
              >
                {{ item }}
              </a-tag>
            </a-space>
            <span v-else>
              -
            </span>
          </template>

          <template #createdTime="{ record }">
            {{ formatDateTime(record.createdTime) }}
          </template>

          <template #actions="{ record }">
            <a-space>
              <GoodsAttributeEditModal :id="record.id" :template-id="templateId" @success="refreshData">
                <a-button type="text">
                  编辑
                </a-button>
              </GoodsAttributeEditModal>

              <CommonDeleteBtn @delete="handleDelete(record.id)" />
            </a-space>
          </template>
        </a-table>
      </a-space>
    </CommonCard>
  </CommonContainer>
</template>
