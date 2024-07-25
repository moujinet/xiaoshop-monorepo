<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { EnabledEnum, LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES } from '@xiaoshop/schema'
import { GoodsLogisticsTemplateModal } from '@/goods/components'
import {
  deleteFreightTemplate,
  fetchFreightTemplateList,
} from '@/goods/apis'

defineOptions({
  name: 'OrderSettingsShipmentTemplatePage',
})

const columns: TableColumnData[] = [
  { title: '模板名称', dataIndex: 'name' },
  { title: '计算方式', dataIndex: 'calcMode', slotName: 'calcMode' },
  { title: '包邮', dataIndex: 'enableFreeRules', slotName: 'enableFreeRules' },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime' },
  { title: '操作', slotName: 'actions', width: 100, align: 'center' },
]

const { loading, data, refreshData } = fetchFreightTemplateList()

refreshData()

function handleDelete(id: number) {
  const message = useMessage({
    onClose: () => {
      refreshData()
    },
  })

  deleteFreightTemplate(id)
    .then(() => {
      message.success('删除成功')
    })
}
</script>

<template>
  <CommonContainer flexible>
    <template #extra>
      <GoodsLogisticsTemplateModal @success="refreshData">
        <a-button type="primary">
          创建运费模板
        </a-button>
      </GoodsLogisticsTemplateModal>
    </template>

    <CommonCard :loading="loading">
      <a-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :pagination="false"
        row-key="id"
        hoverable
        stripe
      >
        <template #calcMode="{ record }">
          <a-tag>
            {{ LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES.find(item => item.value === record.calcMode)?.label }}
          </a-tag>
        </template>

        <template #enableFreeRules="{ record }">
          <a-tag :color="record.enableFreeRules === EnabledEnum.YES ? 'green' : 'red'">
            {{ record.enableFreeRules === EnabledEnum.YES ? '是' : '否' }}
          </a-tag>
        </template>

        <template #updatedTime="{ record }">
          {{ formatDateTime(record.updatedTime) }}
        </template>

        <template #actions="{ record }">
          <a-space>
            <GoodsLogisticsTemplateModal :id="record.id" @success="refreshData">
              <a-button type="text">
                编辑
              </a-button>
            </GoodsLogisticsTemplateModal>

            <CommonConfirm @ok="handleDelete(record.id)" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
