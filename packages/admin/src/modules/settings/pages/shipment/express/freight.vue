<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue'
import { doDeleteShipmentCompany, fetchShipmentCompanyList } from '@/settings/apis/shipment'
import ShipmentExpressEditModal from '@/settings/components/shipment/shipment-express-edit-modal.vue'

defineOptions({
  name: 'ShipmentExpressTemplatesPage',
})

const route = useRoute()
const router = useRouter()

const columns = [
  {
    title: '公司名称',
    dataIndex: 'name',
  },
  {
    title: '公司网站',
    dataIndex: 'url',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '操作',
    slotName: 'actions',
  },
]

const keyword = ref('')
const searchForm = reactive({
  keyword: '',
})
const { loading, data, refreshData } = fetchShipmentCompanyList()
const { loading: deleteLoading, refreshData: doDeleteCompany } = doDeleteShipmentCompany({})

watch(
  () => route.query,
  () => {
    searchForm.keyword = route.query.keyword !== undefined ? String(route.query.keyword) : searchForm.keyword
    keyword.value = searchForm.keyword

    refreshData({
      ...searchForm,
    })
  },
  {
    immediate: true,
  },
)

function onSearchKeyword(keyword: string) {
  router.replace({
    query: {
      ...route.query,
      ...searchForm,
      keyword,
    },
  })
}

function onDelete(id: number) {
  doDeleteCompany({ id })
    .then(() => {
      Notification.info({
        title: '删除成功',
        content: '已成功删除数据',
      })

      setTimeout(() => {
        refreshData({
          ...searchForm,
        })
      }, 100)
    })
}
</script>

<template>
  <CommonContainer>
    <CommonCard>
      <a-space size="medium" direction="vertical" fill>
        <div flex="~ v-center between">
          <a-space>
            <ShipmentExpressEditModal>
              <a-button type="primary">
                添加物流公司
              </a-button>
            </ShipmentExpressEditModal>
            <a-button>
              运费模板
            </a-button>
          </a-space>

          <div>
            <a-input-search
              v-model="keyword"
              placeholder="搜索公司名称"
              allow-clear
              @clear="onSearchKeyword('')"
              @search="onSearchKeyword"
            />
          </div>
        </div>

        <a-table
          :loading="loading"
          :columns="columns"
          :data="data || []"
          :bordered="false"
          :pagination="false"
          hoverable
          stripe
        >
          <template #actions="{ record }">
            <a-space>
              <ShipmentExpressEditModal :id="record.id">
                <a-button size="mini" type="text">
                  编辑
                </a-button>
              </ShipmentExpressEditModal>

              <CommonDeleteBtn :loading="deleteLoading" @ok="onDelete(record.id)" />
            </a-space>
          </template>
        </a-table>
      </a-space>
    </CommonCard>
  </CommonContainer>
</template>
