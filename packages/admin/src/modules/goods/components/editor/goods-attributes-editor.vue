<script lang="ts" setup>
import type { IGoodsAttribute } from '@/goods/types'
import { fetchGoodsAttributeList } from '@/goods/apis/attribute'
import { GoodsAttributeTemplateSelector } from '@/goods/components'
import {
  GOODS_ATTRIBUTE_TYPE_CHECKBOX,
  GOODS_ATTRIBUTE_TYPE_INPUT,
  GOODS_ATTRIBUTE_TYPE_RADIO,
} from '@/goods/constants'

defineOptions({
  name: 'GoodsAttributesEditor',
})

const templateId = defineModel('templateId', { type: Number, default: 0 })
const attributes = defineModel('attributes', { type: Array as PropType<IGoodsAttribute[]>, default: () => [] })

const columns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    slotName: 'name',
    width: 150,
  },
  {
    title: '参数项',
    dataIndex: 'options',
    slotName: 'options',
  },
  {
    title: '操作',
    slotName: 'actions',
    width: 80,
  },
]

const { loading, refreshData: loadAttributes } = fetchGoodsAttributeList(templateId.value)

watch(
  templateId,
  async (newId) => {
    attributes.value = []

    if (!newId)
      return

    const newAttrs = await loadAttributes({ templateId: newId })

    newAttrs.forEach((attr) => {
      attributes.value.push({
        type: attr.type,
        name: attr.name,
        options: attr.options,
        value: '',
      })
    })
  },
)

function handleAddAttribute() {
  attributes.value.push({
    type: GOODS_ATTRIBUTE_TYPE_INPUT,
    name: '',
    options: '',
    value: '',
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
      <div class="form-item-lg">
        <a-table
          :loading="loading"
          :columns="columns"
          :data="attributes"
          :pagination="false"
          :hoverable="false"
          row-key="id"
          w-full
        >
          <template #name="{ record }">
            <a-input v-model="record.name" />
          </template>

          <template #options="{ record }">
            <a-radio-group v-if="record.type === GOODS_ATTRIBUTE_TYPE_RADIO" v-model="record.value">
              <a-radio v-for="item in record.options.split(',').map((it: string) => it.trim())" :key="item" :value="item">
                {{ item }}
              </a-radio>
            </a-radio-group>

            <a-checkbox-group v-if="record.type === GOODS_ATTRIBUTE_TYPE_CHECKBOX" v-model="record.value">
              <a-checkbox v-for="item in record.options.split(',').map((it: string) => it.trim())" :key="item" :value="item">
                {{ item }}
              </a-checkbox>
            </a-checkbox-group>

            <a-input v-if="record.type === GOODS_ATTRIBUTE_TYPE_INPUT" v-model="record.value" />
          </template>

          <template #actions="{ record }">
            <CommonDeleteBtn @ok="attributes.splice(attributes.indexOf(record), 1)" />
          </template>
        </a-table>

        <a-button mt-2 @click="handleAddAttribute">
          添加商品参数
        </a-button>
      </div>
    </a-form-item>
  </FormGroup>
</template>
