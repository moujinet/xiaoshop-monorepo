<script lang="ts" setup>
import {
  Enabled,
  MEMBER_CARD_PLAN_TYPES,
} from '@xiaoshop/schema'
import type { TableColumnData } from '@arco-design/web-vue'

import {
  MemberCardBadge,
  MemberCardBenefits,
  MemberCardModal,
} from '@/member/components'

import { fetchMemberCustomCardList } from '@/member/apis'

defineOptions({
  name: 'MemberCardCustomIndexPage',
})

const columns: TableColumnData[] = [
  { title: '会员卡', dataIndex: 'name', slotName: 'name', width: 200 },
  { title: '会员权益', dataIndex: 'benefits', slotName: 'benefits' },
  { title: '有效期', dataIndex: 'plans', slotName: 'plans' },
  { title: '会员数', dataIndex: 'total', slotName: 'total', align: 'center', width: 80 },
  { title: '创建时间', dataIndex: 'createdTime', slotName: 'createdTime', width: 180 },
  { title: '', slotName: 'actions', width: 60, align: 'right' },
]

const { loading, data, refreshData } = fetchMemberCustomCardList()

refreshData()
</script>

<template>
  <CommonContainer>
    <template #extra>
      <MemberCardModal @success="refreshData">
        <a-button type="primary">
          创建会员卡
        </a-button>
      </MemberCardModal>
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
        <template #name="{ record }">
          <MemberCardBadge v-if="record.id !== 0" :card="record" />
        </template>

        <template #plans="{ record }">
          <div v-for="plan in record.plans" :key="plan.id">
            <div class="flex-(~ v-center) gap-2">
              <div class="flex-(~ v-center between) w-25">
                <div>
                  <CommonIcon name="mingcute:time" class="text-orange-2" active />
                  <span class="mx-2">
                    {{ MEMBER_CARD_PLAN_TYPES.find(opt => opt.value === plan.type)?.unit || '' }}卡
                  </span>
                </div>
                <CommonLabel
                  type="number"
                  :value="plan.duration"
                  :suffix="MEMBER_CARD_PLAN_TYPES.find(opt => opt.value === plan.type)?.unit || ''"
                />
              </div>
              <div class="w-18 text-right">
                <CommonLabel :value="plan.price" type="price" suffix="元" />
              </div>
            </div>
          </div>
        </template>

        <template #benefits="{ record }">
          <template v-if="record.isEnabled === Enabled.YES">
            <MemberCardBenefits :card="record" />
          </template>
        </template>

        <template #total="{ record }">
          {{ record.total }}
        </template>

        <template #createdTime="{ record }">
          {{ formatDateTime(record.createdTime) }}
        </template>

        <template #actions="{ record }">
          <MemberCardModal :id="record.id" @success="refreshData">
            <a-button type="text">
              编辑
            </a-button>
          </MemberCardModal>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
