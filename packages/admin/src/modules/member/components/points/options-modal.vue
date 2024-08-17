<script lang="ts" setup>
import type { IPointsRuleKey } from '@xiaoshop/schema'

import {
  fetchPointsRule,
  updatePointsRuleOptions,
} from '@/member/apis'

defineOptions({
  name: 'MemberPointsRuleOptionsModal',
})

const props = defineProps({
  ruleKey: {
    type: String as PropType<IPointsRuleKey>,
    required: true,
  },
})

const emit = defineEmits(['success'])

const { loading, data, refreshData } = fetchPointsRule(props.ruleKey)
const title = computed(() => data.value ? `${data.value.name}设置` : '设置')

const { visible, handleModalOk } = useForm({
  loading,
  status: computed(() => true),
  onVisible: () => {
    refreshData()
  },
  onUpdate: () => {
    return updatePointsRuleOptions(
      props.ruleKey,
      data.value.options,
    )
  },
  onDone: () => {
    emit('success')
  },
})
</script>

<template>
  <CommonModal
    v-model:visible="visible"
    :loading="loading"
    :title="title"
    :on-before-ok="handleModalOk"
    :disable-ok="data && data.enable === 'N'"
    ok-text="保存"
  >
    <slot />

    <template #modal>
      <template v-if="!data">
        <a-spin />
      </template>
      <a-form v-else :model="data.options" :disabled="data.enable === 'N'" scroll-to-first-error>
        <a-form-item v-if="data.options.points" field="points" label="奖励积分" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="data.options.points" placeholder="请输入奖励积分">
              <template #suffix>
                点
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item v-if="data.options.perWeekRatio" field="perWeekRatio" label="连续周签倍数" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="data.options.perWeekRatio" placeholder="请输入周签倍数">
              <template #suffix>
                倍
              </template>
            </FormNumberInput>
          </div>

          <template #extra>
            连续签到 7 天, 获得积分奖励的倍数<br> 如: 1.5 倍, 每连续签到一周(7 天)奖励为默认签到积分的 1.5 倍
          </template>
        </a-form-item>

        <a-form-item v-if="data.options.perMonthRatio" field="perMonthRatio" label="连续月签倍数" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="data.options.perMonthRatio" placeholder="请输入月签倍数">
              <template #suffix>
                倍
              </template>
            </FormNumberInput>
          </div>

          <template #extra>
            连续签到 30 天, 获得积分奖励的倍数<br> 如: 3 倍, 每连续签到一个月(30 天)奖励为默认签到积分的 3 倍
          </template>
        </a-form-item>

        <a-form-item v-if="data.options.perOrderRatio" field="perOrderRatio" label="奖励金额比例" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="data.options.perOrderRatio" placeholder="请输入比例">
              <template #suffix>
                %
              </template>
            </FormNumberInput>
          </div>

          <template #extra>
            如: 比例为 100%, 则会员消费 100 元时, 便会奖励 100 点积分<br>
            「小数点后不计算积分, 不会四舍五入, 直接取整数值奖励积分」
          </template>
        </a-form-item>

        <a-form-item v-if="data.options.limit" field="limit" label="抵扣限额" extra="最高可抵扣的金额" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="data.options.limit" placeholder="请输入抵扣限额">
              <template #suffix>
                点
              </template>
            </FormNumberInput>
          </div>
        </a-form-item>

        <a-form-item v-if="data.options.ratio" field="ratio" label="积分抵扣比例" show-colon>
          <div class="form-item-xs">
            <FormNumberInput v-model="data.options.ratio" placeholder="请输入积分抵扣比例">
              <template #suffix>
                %
              </template>
            </FormNumberInput>
          </div>

          <template #extra>
            按指定比例抵扣金额<br> 如: 1000 点积分, 抵扣比例为 10%, 则抵扣 1000 * 0.1 = 100 元
          </template>
        </a-form-item>
      </a-form>
    </template>
  </CommonModal>
</template>
