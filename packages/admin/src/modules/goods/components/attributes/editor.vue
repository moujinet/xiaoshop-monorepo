<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import { GoodsAttributeOptionType, type IGoodsAttribute } from '@xiaoshop/schema'
import { GoodsAttributeTemplateSelector } from '@/goods/components'
import { fetchGoodsAttributeTemplateDetail } from '@/goods/apis'

defineOptions({
  name: 'GoodsAttributesEditor',
})

const props = withDefaults(defineProps<{
  defaultTemplateId?: number
}>(), {
  defaultTemplateId: 0,
})

const templateId = defineModel('templateId', { type: Number, default: 0 })
const attributes = defineModel('attributes', { type: Array as PropType<IGoodsAttribute[]>, default: () => [] })

const columns: TableColumnData[] = [
  { title: '参数名称', dataIndex: 'name', slotName: 'name', width: 120 },
  { title: '参数项', dataIndex: 'options', slotName: 'options' },
  { title: '操作', slotName: 'actions', width: 60, align: 'center' },
]

const {
  loading,
  refreshData: loadAttributeTemplate,
} = fetchGoodsAttributeTemplateDetail(templateId.value)

watch(
  templateId,
  async (newId, oldId) => {
    if (
      newId === oldId
      || (newId === props.defaultTemplateId && attributes.value.length > 0)
    ) {
      return
    }

    attributes.value = []

    if (!newId)
      return

    const template = await loadAttributeTemplate({ id: newId })

    template.options.forEach((attr) => {
      attributes.value.push({
        type: attr.type,
        name: attr.name,
        options: attr.options,
        values: attr.defaultValue,
      })
    })
  },
)

function handleAddAttribute() {
  attributes.value.push({
    type: GoodsAttributeOptionType.INPUT,
    name: '',
    options: [],
    values: [],
  })
}
</script>

<template>
  <FormGroup title="商品参数">
    <a-form-item label="可选模板" show-colon>
      <div class="form-item-sm">
        <GoodsAttributeTemplateSelector v-model="templateId" @clear="templateId = 0" />
      </div>
    </a-form-item>

    <a-form-item label="商品参数" show-colon>
      <div class="form-item">
        <a-table
          :loading="loading"
          :columns="columns"
          :data="attributes"
          :pagination="false"
          :hoverable="false"
          row-key="id"
          class="w-full"
        >
          <template #name="{ record }">
            <a-input v-model="record.name" />
          </template>

          <template #options="{ record }">
            <a-radio-group v-if="record.type === GoodsAttributeOptionType.RADIO" v-model="record.values[0]">
              <a-radio v-for="item in record.options" :key="item" :value="item">
                {{ item }}
              </a-radio>
            </a-radio-group>

            <a-checkbox-group v-if="record.type === GoodsAttributeOptionType.CHECKBOX" v-model="record.values">
              <a-checkbox v-for="item in record.options" :key="item" :value="item">
                {{ item }}
              </a-checkbox>
            </a-checkbox-group>

            <a-input v-if="record.type === GoodsAttributeOptionType.INPUT" v-model="record.values[0]" />
          </template>

          <template #actions="{ record }">
            <CommonConfirm @ok="attributes.splice(attributes.indexOf(record), 1)" />
          </template>
        </a-table>

        <a-button class="mt-2" @click="handleAddAttribute">
          添加商品参数
        </a-button>
      </div>
    </a-form-item>
  </FormGroup>
</template>
