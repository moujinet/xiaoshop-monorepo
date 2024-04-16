<script lang="ts" setup>
defineOptions({
  name: 'GoodsFormSubmit',
})

withDefaults(defineProps<{
  step: number
}>(), {
  step: 1,
})

defineEmits(['prev', 'next', 'publish', 'saveDraft'])
</script>

<template>
  <a-affix v-if="step !== 4" :offset-bottom="0">
    <div bg-white flex="~ v-center between" border-t="~ solid $color-border-1" py="4">
      <a-button-group v-if="step <= 3" type="outline">
        <a-button v-if="step > 1" @click="$emit('prev')">
          <CommonIcon name="ph:arrow-circle-left" :inline="false" text-size-5 mr-1 />
          上一步
        </a-button>

        <a-button v-if="step < 3" type="outline" @click="$emit('next')">
          下一步
          <CommonIcon name="ph:caret-circle-right" text-size-5 ml-1 />
        </a-button>
      </a-button-group>

      <a-space>
        <a-button @click="$emit('saveDraft')">
          保存草稿
        </a-button>

        <a-button type="primary" @click="$emit('publish')">
          发布商品
        </a-button>
      </a-space>
    </div>
  </a-affix>
</template>
