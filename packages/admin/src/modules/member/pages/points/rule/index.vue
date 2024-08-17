<script lang="ts" setup>
import {
  Enabled,
  type IEnabled,
  type IMemberPointsRuleKey,
} from '@xiaoshop/schema'

import { MemberPointsRuleOptionsModal } from '@/member/components'

import {
  fetchPointsRuleList,
  updatePointsRuleStatus,
} from '@/member/apis'

defineOptions({
  name: 'MemberPointsRuleIndexPage',
})

const loading = ref(false)
const { data, refreshData } = fetchPointsRuleList()

function refresh() {
  refreshData()
}

function handleSwitchCard(
  key: IMemberPointsRuleKey,
  enable: IEnabled,
) {
  loading.value = true

  updatePointsRuleStatus(key, enable)
    .then(() => {
      useMessage({
        onClose: () => {
          refresh()
        },
      }).success('操作成功')
    })
    .finally(() => {
      loading.value = false
    })
}

refresh()
</script>

<template>
  <CommonContainer>
    <CommonGrid>
      <template v-for="rule in data" :key="rule.id">
        <CommonSwitchCard
          :loading="loading"
          :default-value="rule.enable"
          :enable-value="Enabled.YES"
          :disable-value="Enabled.NO"
          :title="rule.name"
          :icon="rule.icon"
          :desc="rule.desc"
          @change="handleSwitchCard(rule.key, $event)"
        >
          <MemberPointsRuleOptionsModal :rule-key="rule.key">
            <a-button size="small" type="text">
              设置
            </a-button>
          </MemberPointsRuleOptionsModal>
        </CommonSwitchCard>
      </template>
    </CommonGrid>
  </CommonContainer>
</template>
