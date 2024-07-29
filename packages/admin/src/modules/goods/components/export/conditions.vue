<script lang="ts" setup>
import {
  GOODS_SOURCES,
  GOODS_STATUSES,
  type IGoodsExportConditions,
} from '@xiaoshop/schema'

defineOptions({
  name: 'GoodsExportConditions',
  inheritAttrs: false,
})

const props = defineProps<{
  conditions: Partial<IGoodsExportConditions>
  refs: {
    categories: Ref<any>
    group: Ref<any>
    brand: Ref<any>
    tag: Ref<any>
  }
}>()

const isEmptyConditions = computed(() => {
  return Object.keys(props.conditions).length === 0
})
</script>

<template>
  <div class="flex-(~ v-center wrap gap-2)">
    <a-tag v-if="conditions.status" bordered>
      状态:
      {{ GOODS_STATUSES.find(item => item.value === conditions.status)?.label }}
    </a-tag>
    <a-tag v-if="conditions.source" bordered>
      来源:
      {{ GOODS_SOURCES.find(item => item.value === conditions.source)?.label }}
    </a-tag>
    <a-tag v-if="conditions.categoryIds" bordered>
      分类:
      {{ conditions.categoryIds.map(id => refs.categories.value?.getLabel(id)).join(',') }}
    </a-tag>
    <a-tag v-if="conditions.groupId" bordered>
      分组:
      {{ refs.group.value?.getLabel(conditions.groupId) }}
    </a-tag>
    <a-tag v-if="conditions.brandId" bordered>
      品牌:
      {{ refs.brand.value?.getLabel(conditions.brandId) }}
    </a-tag>
    <a-tag v-if="conditions.tagId" bordered>
      标签:
      {{ refs.tag.value?.getLabel(conditions.tagId) }}
    </a-tag>

    <a-tag v-if="isEmptyConditions" bordered>
      全部商品
    </a-tag>
  </div>
</template>
