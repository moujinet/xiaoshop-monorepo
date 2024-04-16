<script lang="ts" setup>
import SmsLogStatusBadge from './sms-log-status-badge.vue'
import { fetchSmsLogDetail } from '@/settings/apis/sms'

defineOptions({
  name: 'SmsLogDetailModal',
})

const props = defineProps<{
  id: number
}>()

const { loading, refreshData } = fetchSmsLogDetail(props.id)
const visible = ref(false)
const detail = reactive({
  title: '',
  content: '',
  phone: '',
  status: 1,
  result: '',
  createdTime: '',
  sendedTime: '',
})

watch(
  () => visible.value,
  (val) => {
    if (val) {
      refreshData({
        id: props.id,
      }).then((res) => {
        detail.title = res.title
        detail.content = res.content
        detail.phone = res.phone
        detail.status = res.status
        detail.result = res.result
        detail.createdTime = res.createdTime
        detail.sendedTime = res.sendedTime
      })
    }
  },
)
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    title="发送记录"
    ok-text="关闭"
    hide-cancel
  >
    <a-button size="mini" type="text">
      详情
    </a-button>

    <template #modal>
      <a-descriptions layout="inline-vertical" bordered>
        <a-descriptions-item :span="2" label="短信标题">
          {{ detail.title }}
        </a-descriptions-item>
        <a-descriptions-item label="发送状态">
          <SmsLogStatusBadge :status="detail.status" />
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="接收人">
          {{ detail.phone }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="创建时间">
          {{ detail.createdTime }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="发送时间">
          {{ detail.sendedTime }}
        </a-descriptions-item>
        <a-descriptions-item :span="2" label="发送结果">
          {{ detail.result }}
        </a-descriptions-item>
        <a-descriptions-item label="短信内容">
          {{ detail.content }}
        </a-descriptions-item>
      </a-descriptions>
    </template>
  </CommonModal>
</template>
