<script lang="ts" setup>
import { type IApiNestedAreaItem, fetchAllAreaList } from '@/settings/apis/area'
import AreasEditModal from '@/settings/components/areas/areas-edit-modal.vue'

defineOptions({
  name: 'AreasIndexPage',
})

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '简称',
    dataIndex: 'shortName',
  },
  {
    title: '邮政编码',
    dataIndex: 'code',
  },
  {
    title: '操作',
    slotName: 'actions',
  },
]

const { loading, data, refreshData } = fetchAllAreaList()
const nestedData: Ref<IApiNestedAreaItem[]> = ref([])
const expandedKeys = ref([])

refreshData()

watch(
  data,
  () => {
    nestedData.value = toNestedList(data.value)
  },
)
</script>

<template>
  <CommonContainer title="地区管理">
    <template #extra>
      <AreasEditModal>
        <a-button type="primary">
          添加地区
        </a-button>
      </AreasEditModal>
    </template>

    <CommonCard>
      <a-table
        v-model:expandedKeys="expandedKeys"
        :loading="loading"
        :columns="columns"
        :data="nestedData"
        :bordered="false"
        :pagination="false"
        row-key="id"
        hoverable
        stripe
        show-empty-tree
      >
        <template #actions="{ record }">
          <a-space>
            <template #split>
              <a-divider direction="vertical" />
            </template>

            <AreasEditModal :parent="record.id" :parent-name="record.name">
              <a-button size="mini" type="text">
                添加下级地区
              </a-button>
            </AreasEditModal>

            <AreasEditModal :id="record.id">
              <a-button size="mini" type="text">
                编辑
              </a-button>
            </AreasEditModal>

            <CommonDeleteBtn v-if="!record.children" />
          </a-space>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
