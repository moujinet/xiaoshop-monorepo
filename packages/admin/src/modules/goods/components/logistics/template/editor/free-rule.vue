<script lang="ts" setup>
import type { ILogisticsFreightTemplateFreeRule } from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsLogisticsTemplateFreeRuleEditor',
})

const modelValue = defineModel<ILogisticsFreightTemplateFreeRule[]>('modelValue', {
  type: Array as PropType<ILogisticsFreightTemplateFreeRule[]>,
  default: () => [],
})

const { getNames } = useAreas()
const selectedAreas = computed<string[]>(() => modelValue.value.flatMap(item => item.areas))

const nationwide = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65']
const remoteAreas = ['15', '54', '63', '65']

const shortcuts = ref([
  { label: '全国', areas: nationwide },
  { label: '偏远地区', areas: remoteAreas },
  { label: '其他(除偏远地区)', areas: nationwide.filter(code => !remoteAreas.includes(code)) },
])

function handleAppend(areas: string[]) {
  if (areas.length > 0) {
    modelValue.value.push({
      areas,
      overCount: 0,
      overAmount: 0,
    })
  }
}
</script>

<template>
  <div class="w-full">
    <div class="free-ship-rule-editor">
      <div class="header is-left">
        包邮地区
      </div>
      <div class="header">
        包邮件数
        <a-tooltip content="包邮地区, 购买超过此件数, 包邮">
          <CommonIcon name="mingcute:question" class="text-primary" />
        </a-tooltip>
      </div>
      <div class="header">
        包邮金额
        <a-tooltip content="包邮地区, 购买超过此金额, 包邮">
          <CommonIcon name="mingcute:question" class="text-primary" />
        </a-tooltip>
      </div>

      <template v-for="(_, index) in modelValue" :key="index">
        <div class="col col-areas">
          <div class="flex-(~ auto gap-2 wrap)">
            <a-tag v-for="area in modelValue[index].areas" :key="area">
              {{ getNames(area) }}
            </a-tag>
          </div>

          <CommonConfirm @ok="modelValue.splice(index, 1)">
            <a-button type="text" status="danger" size="small">
              <template #icon>
                <CommonIcon name="mingcute:delete-2" />
              </template>
            </a-button>
          </CommonConfirm>
        </div>

        <div class="col">
          <FormNumberInput v-model="modelValue[index].overCount">
            <template #suffix>
              件
            </template>
          </FormNumberInput>
        </div>

        <div class="col">
          <FormPriceInput v-model="modelValue[index].overAmount" />
        </div>
      </template>

      <div class="col-full">
        <FormAreaTrigger :banded="selectedAreas" @select="handleAppend">
          <a-button type="text">
            指定配送地区
          </a-button>
        </FormAreaTrigger>
      </div>
    </div>

    <div class="pt-2 text-$color-text-3">
      <div class="flex-(~ v-center gap-2)">
        <span>快捷操作:</span>

        <template v-for="({ label, areas }, index) in shortcuts" :key="index">
          <CommonLink type="primary" @click="handleAppend(areas)">
            {{ label }}
          </CommonLink>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.free-ship-rule-editor {
  @apply: w-full p-1 b-(1 solid $color-border-1) rounded grid;

  grid-template-columns: 550px repeat(2, 1fr);

  & .header {
    @apply: p-2 text-($color-text-2 center) bg-$color-fill-1 b-b-(1 solid $color-border-2);

    &.is-left {
      text-align: left;
    }
  }

  & .col {
    @apply: p-2 b-b-(1 solid $color-border-1) flex-(~ v-center);

    &.col-areas {
      @apply: gap-2;
    }
  }

  & .col-full {
    @apply: col-span-3 py-1 px-2;
  }
}
</style>
