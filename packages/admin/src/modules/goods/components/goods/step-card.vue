<script lang="ts" setup>
import type {
  IGoodsFormStep,
} from '@/goods/types'

defineOptions({
  name: 'GoodsStepCard',
})

const props = defineProps<{
  steps: IGoodsFormStep[]
  changeable?: boolean
}>()

const affixed = ref(false)
const route = useRoute()
const router = useRouter()

const step = defineModel<number>('step', {
  type: Number,
  default: 0,
})

watch(
  step,
  () => {
    router.replace({
      query: {
        ...route.query,
        step: dict(props.steps, 'step', step.value || 0)?.key,
      },
    })
  },
  { immediate: true },
)

function handleStepClick(num: number) {
  if (!props.changeable)
    return

  step.value = num
}
</script>

<template>
  <a-card class="goods-step-card no-border" :bordered="false">
    <template #cover>
      <a-affix :offset-top="131" @change="(val) => (affixed = val)">
        <div
          class="p-4 bg-$color-bg-2 select-none rounded-t"
          :class="{ 'shadow-lg': affixed }"
        >
          <a-steps v-model:current="step" type="arrow" small :changeable="changeable" @change="(val) => handleStepClick(val)">
            <a-step v-for="s in steps" :key="s.step">
              {{ `${s.step}. ${s.name}` }}
            </a-step>
          </a-steps>
        </div>
      </a-affix>
    </template>

    <slot />

    <a-affix :offset-bottom="0">
      <div class="bg-$color-bg-2 flex-(~ v-center between) b-t-(~ solid $color-border-1) py-4">
        <div class="flex-(~ gap-4)">
          <slot name="extra" />
        </div>

        <slot name="actions" />
      </div>
    </a-affix>
  </a-card>
</template>

<style lang="less" scoped>
.goods-step-card {
  border-radius: 3px;

  &.no-border {
    :deep(.arco-card-header) {
      border: none;
      padding-bottom: 0;
    }
  }
}
</style>
