<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { Enabled } from '@xiaoshop/schema'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import { fetchMemberAddressPages } from '@/member/apis'

defineOptions({
  name: 'MemberAddressPanel',
  inheritAttrs: false,
})

const props = defineProps<{
  id: number
  visible?: boolean
}>()

const columns: TableColumnData[] = [
  { title: '收货人', dataIndex: 'contractName', width: 150 },
  { title: '收货地址', dataIndex: 'address', slotName: 'address' },
  { title: '是否默认', dataIndex: 'isDefault', slotName: 'isDefault', align: 'center', width: 100 },
  { title: '更新时间', dataIndex: 'updatedTime', slotName: 'updatedTime', width: 180 },
]

const query = reactive({
  memberId: 0,
  page: 1,
  pagesize: DEFAULT_PAGE_SIZE,
})

const { loading, data, refreshData } = fetchMemberAddressPages()

const { toName } = useLocation()

watch(
  () => props.visible,
  (visible) => {
    if (visible && props.id) {
      query.memberId = props.id

      refreshData(query)
    }
  },
  { immediate: true },
)
</script>

<template>
  <a-table
    :loading="loading"
    :columns="columns"
    :data="data && data.result"
    :bordered="false"
    :pagination="{
      total: data && data.total,
      current: query.page,
      pageSize: query.pagesize,
      showPageSize: true,
      showTotal: true,
      hideOnSinglePage: true,
    }"
    row-key="id"
    size="large"
    hoverable
  >
    <template #address="{ record }">
      {{ toName(record.location) + record.address }}
    </template>

    <template #isDefault="{ record }">
      <CommonIcon
        v-if="record.isDefault === Enabled.YES"
        name="mingcute:check"
        color="green"
      />
      <template v-else>
        -
      </template>
    </template>

    <template #updatedTime="{ record }">
      {{ formatDateTime(record.updatedTime) }}
    </template>
  </a-table>
</template>
