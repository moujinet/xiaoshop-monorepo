<script lang="ts" setup>
defineOptions({
  name: 'GoodsFormSteps',
})

defineProps<{
  top?: number
}>()

const modelValue = defineModel('modelValue', {
  type: Number,
  default: 1,
  required: true,
})
</script>

<template>
  <a-affix :offset-top="top || 131">
    <div p4 bg-white select-none>
      <a-steps type="arrow" :current="modelValue" small @change="(val) => modelValue = val">
        <a-step>
          1. 编辑基本信息
        </a-step>
        <a-step>
          2. 编辑价格库存
        </a-step>
        <a-step>
          3. 编辑商品详情
        </a-step>
        <a-step>
          4. 发布商品
        </a-step>
      </a-steps>
    </div>
  </a-affix>
</template>
