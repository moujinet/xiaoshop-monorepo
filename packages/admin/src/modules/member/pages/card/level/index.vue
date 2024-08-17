<script lang="ts" setup>
import { Enabled, type IMemberCardLevelListItem } from '@xiaoshop/schema'
import type { TableColumnData } from '@arco-design/web-vue'
import {
  MemberCardBadge,
  MemberCardBenefits,
  MemberCardModal,
} from '@/member/components'
import {
  fetchMemberLevelList,
  updateMemberCardStatus,
} from '@/member/apis'

defineOptions({
  name: 'MemberCardLevelIndexPage',
})

const columns: TableColumnData[] = [
  { title: '会员等级', dataIndex: 'key', slotName: 'key', width: 100 },
  { title: '等级名称', dataIndex: 'name', slotName: 'name', width: 150 },
  { title: '成长值', dataIndex: 'needExp', slotName: 'needExp', width: 150, align: 'center' },
  { title: '等级权益', dataIndex: 'benefits', slotName: 'benefits' },
  { title: '会员数', dataIndex: 'total', slotName: 'total', align: 'center' },
  { title: '', slotName: 'actions', width: 100, align: 'right' },
]

const enabled = ref<IMemberCardLevelListItem[]>([])
const disabled = ref<IMemberCardLevelListItem[]>([])
const { loading, refreshData } = fetchMemberLevelList()

const message = useMessage({
  onClose: () => {
    refresh()
  },
})

refresh()

function refresh() {
  refreshData()
    .then((res) => {
      disabled.value = res.filter(lv => lv.isEnabled === Enabled.NO)
      enabled.value = res.filter(lv => lv.isEnabled === Enabled.YES)

      if (disabled.value.length > 0)
        enabled.value.push(disabled.value[0])
    })
}

function isShowEnable(record: IMemberCardLevelListItem, rowIndex: number) {
  return record.isEnabled === Enabled.NO && rowIndex <= enabled.value.length
}

function isShowDisable(record: IMemberCardLevelListItem, rowIndex: number) {
  return record.isEnabled === Enabled.YES
    && (
      (disabled.value.length > 0 && rowIndex === enabled.value.length - 2)
      || (disabled.value.length === 0 && rowIndex === enabled.value.length - 1)
    )
}

function handleEnable(id: number) {
  updateMemberCardStatus(id, Enabled.YES)
    .then(() => {
      message.success('启用成功')
    })
}

function handleDisable(id: number) {
  updateMemberCardStatus(id, Enabled.NO)
    .then(() => {
      message.success('停用成功')
    })
}
</script>

<template>
  <CommonContainer>
    <CommonCard :loading="loading">
      <a-table
        :columns="columns"
        :data="enabled"
        :bordered="false"
        :pagination="false"
        row-key="id"
        hoverable
      >
        <template #key="{ record }">
          <div class="flex-(~ v-center) gap-1">
            <a-tooltip v-if="record.desc !== ''" :content="record.desc" mini>
              <CommonIcon name="mingcute:information" class="text-(16px $color-text-4)" :inline="false" />
            </a-tooltip>

            <span class="uppercase" :class="{ 'text-$color-text-4': record.isEnabled === Enabled.YES }">
              {{ record.key }}
            </span>
          </div>
        </template>

        <template #name="{ record }">
          <MemberCardBadge v-if="record.id !== 0" :card="record" />
        </template>

        <template #needExp="{ record }">
          <span :class="{ 'text-$color-text-4': record.isEnabled === Enabled.NO }">
            {{ record.isEnabled === Enabled.YES ? formatNumber(record.needExp) : '-' }}
          </span>
        </template>

        <template #benefits="{ record }">
          <template v-if="record.isEnabled === Enabled.YES">
            <MemberCardBenefits :card="record" />
          </template>
        </template>

        <template #total="{ record }">
          <span :class="{ 'text-$color-text-4': record.isEnabled === Enabled.NO }">
            {{ record.isEnabled === Enabled.YES ? record.total : '-' }}
          </span>
        </template>

        <template #actions="{ record, rowIndex }">
          <a-space>
            <a-button
              v-if="isShowEnable(record, rowIndex)"
              size="small"
              type="outline"
              @click="handleEnable(record.id)"
            >
              启用
            </a-button>

            <a-popconfirm
              v-if="isShowDisable(record, rowIndex)"
              content="确定要停用吗?"
              @ok="handleDisable(record.id)"
            >
              <a-button type="text" status="danger">
                停用
              </a-button>
            </a-popconfirm>

            <MemberCardModal
              v-if="record.isEnabled === Enabled.YES"
              :id="record.id"
              @success="refresh"
            >
              <a-button type="text">
                设置
              </a-button>
            </MemberCardModal>
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
