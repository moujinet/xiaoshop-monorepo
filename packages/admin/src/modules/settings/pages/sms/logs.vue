<script lang="ts" setup>
import { fetchSmsLogList } from '@/settings/apis/sms'
import { DEFAULT_PAGE_SIZE } from '~/constants/defaults'
import SmsLogDetailModal from '@/settings/components/sms/sms-log-detail-modal.vue'
import SmsLogStatusBadge from '@/settings/components/sms/sms-log-status-badge.vue'

defineOptions({
  name: 'SmsLogsPage',
})

const { getOption } = useSettings()
const enableAliyunSms: boolean = getOption('sms.enableAliyunSms', false)

const route = useRoute()
const router = useRouter()
const keyword = ref('')
const searchForm = reactive({
  keyword: '',
  status: '',
  page: 1,
})

const statusMap = [{
  value: '0',
  label: '全部',
}, {
  value: '1',
  label: '待发送',
}, {
  value: '2',
  label: '发送成功',
}, {
  value: '3',
  label: '发送失败',
}]

const columns = [
  {
    title: '短信标题',
    dataIndex: 'title',
  },
  {
    title: '接收人',
    dataIndex: 'phone',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
  {
    title: '发送时间',
    dataIndex: 'sendedTime',
  },
  {
    title: '发送状态',
    dataIndex: 'status',
    slotName: 'status',
  },
  {
    title: '操作',
    slotName: 'actions',
  },
]

const { loading, data, refreshData } = fetchSmsLogList(searchForm)

watch(
  () => route.query,
  () => {
    searchForm.keyword = route.query.keyword !== undefined ? String(route.query.keyword) : searchForm.keyword
    searchForm.status = route.query.status ? String(route.query.status) : searchForm.status
    searchForm.page = route.query.page ? Number(route.query.page) : searchForm.page
    keyword.value = searchForm.keyword

    if (enableAliyunSms) {
      refreshData({
        ...searchForm,
      })
    }
  },
  {
    immediate: true,
  },
)

function goto(
  page: number = 1,
  params: Record<string, unknown> = {},
) {
  router.replace({
    query: {
      ...route.query,
      ...searchForm,
      ...params,
      page,
    },
  })
}

function onSearchKeyword(keyword: string) {
  goto(1, { keyword })
}

function onSearchStatus(status: unknown) {
  goto(1, { status })
}
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-space v-if="enableAliyunSms" direction="vertical" fill>
        <a-form layout="inline" :model="searchForm">
          <a-form-item field="status" hide-label>
            <a-select v-model="searchForm.status" placeholder="全部状态" allow-clear @change="onSearchStatus">
              <a-option v-for="item of statusMap" :key="item.value" :value="item.value" :label="item.label" />
            </a-select>
          </a-form-item>

          <a-form-item field="name" hide-label>
            <a-input-search
              v-model="keyword"
              placeholder="请输入短信标题"
              allow-clear
              @clear="onSearchKeyword('')"
              @search="onSearchKeyword"
            />
          </a-form-item>
        </a-form>

        <a-table
          :loading="loading"
          :columns="columns"
          :data="data && data.result"
          :bordered="false"
          :pagination="{
            total: data && data.total,
            current: searchForm.page,
            pageSize: DEFAULT_PAGE_SIZE,
          }"
          hoverable
          stripe
          @page-change="goto"
        >
          <template #status="{ record }">
            <SmsLogStatusBadge :status="record.status" />
          </template>

          <template #actions="{ record }">
            <SmsLogDetailModal :id="record.id" />
          </template>
        </a-table>
      </a-space>

      <a-alert v-else title="提示信息">
        请在短信配置中开启阿里云短信, 完善配置后才能使用。
        <template #action>
          <a-link theme="primary" hover="color" size="small" href="/settings/sms/settings">
            开始配置
          </a-link>
        </template>
      </a-alert>
    </CommonCard>
  </CommonContainer>
</template>
