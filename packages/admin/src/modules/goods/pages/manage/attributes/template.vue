<script lang="ts" setup>
import type { TableColumnData } from '@arco-design/web-vue'

import {
  GOODS_ATTRIBUTE_OPTION_TYPES,
  type IGoodsAttributeTemplate,
  type IGoodsAttributeTemplateOption,
} from '@xiaoshop/schema'

import { GoodsAttributeTemplateOptionsModal } from '@/goods/components'

import {
  fetchGoodsAttributeTemplateDetail,
  updateGoodsAttributeTemplate,
} from '@/goods/apis'

defineOptions({
  name: 'GoodsManageAttributesTemplatePage',
})

const route = useRoute()
const formRef = ref()
const templateId = route.query.id ? Number(route.query.id) : 0

const columns: TableColumnData[] = [
  { title: '参数名称', dataIndex: 'name', width: 160 },
  { title: '参数类型', dataIndex: 'type', slotName: 'type', width: 90, align: 'center' },
  { title: '参数项/默认值', dataIndex: 'options', slotName: 'options' },
  { title: '操作', slotName: 'actions', width: 100, align: 'center' },
]

const rules: IFormRules = {
  name: [
    {
      required: true,
      message: '请输入参数模板名称',
    },
  ],
  options: [
    {
      required: true,
      message: '请输入参数模板参数',
    },
  ],
}

const detail = reactive<IFormData<IGoodsAttributeTemplate>>({
  name: '',
  desc: '',
  options: [],
})

const {
  loading,
  refreshData,
} = fetchGoodsAttributeTemplateDetail(templateId)

function refresh() {
  refreshData().then((res) => {
    detail.name = res.name
    detail.desc = res.desc
    detail.options = res.options || []
  })
}

function getAttributeTypeLabel(type: string) {
  return GOODS_ATTRIBUTE_OPTION_TYPES.find(item => item.value === type)?.label
}

function getAttributeTypeColor(type: string) {
  return GOODS_ATTRIBUTE_OPTION_TYPES.find(item => item.value === type)?.color || 'gray'
}

function handleCreateAttribute(attribute: IGoodsAttributeTemplateOption) {
  if (detail.options.some(item => item.name === attribute.name)) {
    return useMessage().error('参数名称已存在')
  }

  detail.options.push({
    name: attribute.name,
    type: attribute.type,
    options: [...attribute.options],
    defaultValue: [...attribute.defaultValue],
  })
}

function handleUpdateAttribute(attribute: IGoodsAttributeTemplateOption, index: number) {
  if (detail.options.some((item, idx) => idx !== index && item.name === attribute.name)) {
    return useMessage().error('参数名称已存在')
  }

  detail.options[index] = {
    name: attribute.name,
    type: attribute.type,
    options: [...attribute.options],
    defaultValue: [...attribute.defaultValue],
  }
}

function handleSubmit() {
  const message = useMessage({
    onClose: () => {
      refresh()
    },
  })

  updateGoodsAttributeTemplate(templateId, detail)
    .then(() => {
      message.success('更新成功')
    })
    .catch(() => {
      message.error('更新失败')
    })
}

refresh()
</script>

<template>
  <CommonContainer flexible>
    <CommonCard title="模板详情" :loading="loading">
      <a-form
        ref="formRef"
        :model="detail"
        :rules="rules"
        :label-col-props="{ span: 3 }"
        :wrapper-col-props="{ span: 21 }"
        scroll-to-first-error
        @submit="handleSubmit"
      >
        <a-form-item field="name" label="模板名称" show-colon>
          <div class="form-item">
            <a-input v-model="detail.name" placeholder="请输入模板名称" />
          </div>
        </a-form-item>

        <a-form-item field="desc" label="模板说明" show-colon>
          <div class="form-item">
            <a-textarea v-model="detail.desc" placeholder="请输入模板说明" />
          </div>
        </a-form-item>

        <a-form-item field="options" label="模板参数" show-colon>
          <div class="form-item-full">
            <a-space direction="vertical" fill>
              <GoodsAttributeTemplateOptionsModal @success="handleCreateAttribute">
                <a-button type="outline" size="small">
                  添加参数
                </a-button>
              </GoodsAttributeTemplateOptionsModal>

              <a-table
                :columns="columns"
                :data="detail.options"
                :bordered="false"
                :pagination="false"
                hoverable
              >
                <template #type="{ record }">
                  <a-tag :color="getAttributeTypeColor(record.type)">
                    {{ getAttributeTypeLabel(record.type) }}
                  </a-tag>
                </template>

                <template #options="{ record }">
                  <a-space v-if="record.type !== 'input'">
                    <a-tag
                      v-for="(item, index) in record.options"
                      :key="index"
                      :color="record.defaultValue.includes(item) ? getAttributeTypeColor(record.type) : 'gray'"
                      :bordered="record.defaultValue.includes(item)"
                    >
                      {{ item }}
                    </a-tag>
                  </a-space>
                  <span v-else>
                    {{ record.defaultValue && record.defaultValue.join(',') || '' }}
                  </span>
                </template>

                <template #actions="{ record }">
                  <a-space>
                    <GoodsAttributeTemplateOptionsModal
                      :option="record as IGoodsAttributeTemplateOption"
                      :index="detail.options.indexOf(record)"
                      @success="handleUpdateAttribute"
                    >
                      <a-button type="text">
                        编辑
                      </a-button>
                    </GoodsAttributeTemplateOptionsModal>

                    <CommonConfirm @ok="() => detail.options.splice(detail.options.indexOf(record), 1)" />
                  </a-space>
                </template>
              </a-table>

              <div>
                <CommonIcon name="mingcute:information" color="gray" active />
                提示: 编辑模板参数后，请记得保存。
              </div>
            </a-space>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </CommonCard>
  </CommonContainer>
</template>
