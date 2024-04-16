<script lang="ts" setup>
defineOptions({
  name: 'GoodsManageListHistoryPage',
})

const columns = [
  {
    title: '商品',
    dataIndex: 'sku',
    slotName: 'sku',
  },
  {
    title: '会员',
    dataIndex: 'member',
    slotName: 'member',
  },
  {
    title: '浏览时间',
    dataIndex: 'createdTime',
  },
]

const data = [
  {
    id: 1,
    sku: {
      id: 1,
      name: 'Apple Watch SE 智能手表 GPS款 40毫米米金色铝金属表壳 星光色运动型表带MKQ03CH/A',
      cover: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    member: {
      id: 1,
      name: '小朔',
      avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    createdTime: '2022-12-12 12:12:12',
  },
]
</script>

<template>
  <CommonContainer flexible>
    <CommonCard>
      <a-table
        :columns="columns"
        :data="data"
        :bordered="false"
        row-key="id"
        hoverable
        stripe
        show-empty-tree
      >
        <template #sku="{ record }">
          <div flex="~ gap-4">
            <a-image
              width="40"
              :src="record.sku.cover"
            />

            <a-typography-text bold :ellipsis="{ showTooltip: true }">
              {{ record.sku.name }}
            </a-typography-text>
          </div>
        </template>

        <template #member="{ record }">
          <a-avatar>
            <img :src="record.member.avatar">
          </a-avatar>
          <a-typography-text ml-2>
            {{ record.member.name }}
          </a-typography-text>
        </template>
      </a-table>
    </CommonCard>
  </CommonContainer>
</template>
