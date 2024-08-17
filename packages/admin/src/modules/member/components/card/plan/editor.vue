<script lang="ts" setup>
import {
  type IMemberCardPlan,
  MEMBER_CARD_PLAN_TYPES,
  MemberCardPlanType,
} from '@xiaoshop/schema'

defineOptions({
  name: 'MemberCardPlanEditor',
})

const plans = defineModel('modelValue', {
  type: Array as PropType<Partial<IMemberCardPlan>[]>,
  default: () => [],
})

function handleAppend() {
  plans.value.push({
    type: MemberCardPlanType.DAYS,
    duration: 0,
    price: 0,
  })
}
</script>

<template>
  <div class="member-card-plan-editor common-grid">
    <div class="common-grid__header">
      类型
    </div>
    <div class="common-grid__header">
      有效期
    </div>
    <div class="common-grid__header">
      价格
    </div>
    <div class="common-grid__header">
      操作
    </div>

    <div v-if="plans.length === 0" class="common-grid__col is-full">
      <CommonEmpty />
    </div>

    <template v-else>
      <template v-for="(plan, index) in plans" :key="plan.id">
        <div class="common-grid__col">
          <a-select v-model="plans[index].type">
            <a-option v-for="opt in MEMBER_CARD_PLAN_TYPES" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-option>
          </a-select>
        </div>

        <div class="common-grid__col">
          <FormNumberInput v-model="plans[index].duration">
            <template #suffix>
              {{ MEMBER_CARD_PLAN_TYPES.find(opt => opt.value === plans[index].type)?.unit || '' }}
            </template>
          </FormNumberInput>
        </div>

        <div class="common-grid__col">
          <FormNumberInput v-model="plans[index].price" show-zero>
            <template #suffix>
              元
            </template>
          </FormNumberInput>
        </div>

        <div class="common-grid__col text-center">
          <CommonConfirm @ok="plans.splice(index, 1)" />
        </div>
      </template>
    </template>

    <div class="common-grid__col is-full" :class="{ 'justify-start!': plans.length > 0 }">
      <a-button type="outline" @click="handleAppend">
        添加有效期
      </a-button>
    </div>
  </div>
</template>

<style lang="less">
.member-card-plan-editor {
  grid-template-columns: repeat(3, 1fr) 80px;

  .is-full {
    justify-content: center;
    grid-column: span 4 / span 4;
  }

  .common-grid__col {
    padding: 6px 3px;
    border: 0;
  }
}
</style>
