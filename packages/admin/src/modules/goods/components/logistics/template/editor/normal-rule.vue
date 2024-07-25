<script lang="ts" setup>
import {
  type ILogisticsFreightTemplateCalcMode,
  type ILogisticsFreightTemplateNormalRule,
  LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES,
} from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsLogisticsTemplateNormalRuleEditor',
})

const props = defineProps<{
  mode: ILogisticsFreightTemplateCalcMode
}>()

const modelValue = defineModel<ILogisticsFreightTemplateNormalRule[]>('modelValue', {
  type: Array as PropType<ILogisticsFreightTemplateNormalRule[]>,
  default: () => [],
})

const { getNames } = useAreas()

const name = computed(() => LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES.find(mode => mode.value === props.mode)?.name || '')
const unit = computed(() => LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES.find(mode => mode.value === props.mode)?.unit || '')
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
      first: 0,
      firstPrice: 0,
      continue: 0,
      continuePrice: 0,
    })
  }
}
</script>

<template>
  <div class="w-full">
    <div class="normal-rule-editor">
      <div class="header is-left">
        可配送地区
      </div>
      <div class="header">
        首{{ name }}
      </div>
      <div class="header">
        运费
      </div>
      <div class="header">
        续{{ name }}
      </div>
      <div class="header">
        续费
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
          <FormNumberInput v-model="modelValue[index].first">
            <template #suffix>
              <span v-html="unit" />
            </template>
          </FormNumberInput>
        </div>

        <div class="col">
          <FormPriceInput v-model="modelValue[index].firstPrice" />
        </div>

        <div class="col">
          <FormNumberInput v-model="modelValue[index].continue">
            <template #suffix>
              <span v-html="unit" />
            </template>
          </FormNumberInput>
        </div>

        <div class="col">
          <FormPriceInput v-model="modelValue[index].continuePrice" />
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
.normal-rule-editor {
  @apply: w-full p-1 b-(1 solid $color-border-1) rounded grid;

  grid-template-columns: 360px repeat(4, 1fr);

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
    @apply: col-span-5 py-1 px-2;
  }
}
</style>
