import Mock from 'mockjs'
import type { IGoods, IGoodsPageListItem } from '@/goods/types'
import { GOODS_STATUS_ALARM } from '@/goods/constants'

const data: IGoods[] = []

for (let i = 0; i < 100; i++) {
  data.push({
    id: i + 1,
    type: 'goods',
    status: Mock.Random.pick(['in-stock', 'sold-out', 'draft', 'alarm']),
    name: Mock.Random.ctitle(10, 30),
    images: [
      {
        id: 1,
        type: 'image',
        path: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      },
    ],
    categories: [
      {
        id: 2,
        name: '吸顶灯',
      },
      {
        id: 3,
        name: '吊灯',
      },
    ],
    shareDesc: Mock.Random.cparagraph(),
    slogan: Mock.Random.cparagraph(),
    tag: { id: 1, name: '新' },
    group: { id: 1, name: '特价商品' },
    brand: { id: 1, name: '品牌1' },
    services: [
      { id: 1, name: '上门安装', price: 30.00 },
      { id: 2, name: '折旧换新', price: 50.00 },
    ],
    guarantees: [
      { id: 1, name: '7 天无理由' },
    ],
    attributeTemplateId: 1,
    attributes: [
      { id: 1, name: '材质', type: 'checkbox', options: '实木,真皮,不锈钢,铝材,铝合金', value: '真皮,不锈钢,铝材,' },
      { id: 2, name: '风格', type: 'radio', options: '新中,美式,欧式,中式,日式,田园', value: '中式' },
      { id: 3, name: '产地', type: 'radio', options: '广东佛山,江西赣州', value: '江西赣州' },
    ],
    skuSpecs: [
      {
        id: 1,
        name: '颜色',
        values: [
          {
            id: 1,
            name: '红色',
            image: {
              id: 1,
              type: 'image',
              path: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            },
          },
        ],
        enableImage: false,
      },
    ],
    skus: [
      {
        id: 1,
        specs: [
          {
            id: 1,
            name: '颜色',
          },
        ],
        name: '红色',
        skuId: Mock.Random.id(),
        price: Mock.Random.integer(100, 500),
        originalPrice: Mock.Random.integer(500, 1500),
        costPrice: Mock.Random.integer(10, 100),
        stock: Mock.Random.integer(150, 1500),
        alarmStock: Mock.Random.integer(150, 1500),
        weight: Mock.Random.integer(500, 1500),
        volume: Mock.Random.integer(500, 1500),
      },
    ],
    skuId: Mock.Random.id(),
    price: Mock.Random.integer(100, 500),
    originalPrice: Mock.Random.integer(500, 1500),
    costPrice: Mock.Random.integer(10, 100),
    stock: Mock.Random.integer(150, 1500),
    alarmStock: Mock.Random.integer(150, 1500),
    weight: Mock.Random.integer(500, 1500),
    volume: Mock.Random.integer(500, 1500),
    unit: '件',
    enableHideStock: Mock.Random.boolean(),
    enablePurchaseLimit: Mock.Random.boolean(),
    purchaseLimit: Mock.Random.integer(1, 5),
    purchaseMinQty: 1,
    stockDeductType: 'order',
    enableVipDiscount: Mock.Random.boolean(),
    deliveryTypes: ['express'],
    deliveryCostsType: 'unified',
    deliveryCosts: Mock.Random.integer(500, 1500),
    deliveryCostsTemplateId: 0,
    returnCostsType: 'buyer',
    publishType: 'direct',
    publishTime: 0,
    buyButtonNameType: 'default',
    buyButtonName: '',
    detail: Mock.Random.cparagraph(100, 200),
    sort: Mock.Random.integer(1, 100),
    createdTime: Date.now(),
  })
}

export default defineMocks({
  '/api/goods/pages': ({ query }) => {
    return responsePaginationMock<IGoodsPageListItem>(
      data
        .filter((item) => { // status
          if (query.status && query.status !== '')
            return item.status === query.status
          return true
        })
        .sort((a, b) => a.sort - b.sort)
        .map((item) => { // transform data
          return pick(item, [
            'id',
            'type',
            'status',
            'name',
            'images',
            'skuId',
            'price',
            'originalPrice',
            'stock',
            'unit',
            'tag',
            'services',
            'guarantees',
            'sort',
            'createdTime',
          ])
        }),
      query,
    )
  },
  '/api/goods/sku/list': ({ query }) => {
    return responseMock(
      data.find(item => item.id === Number(query.id))?.skus || [],
    )
  },
  '/api/goods/alarms/count': () => {
    return responseMock(data.filter(item => item.status === GOODS_STATUS_ALARM).length)
  },
  '/api/goods/sort/update': () => {
    return responseMock()
  },
  '/api/goods/status/update': () => {
    return responseMock()
  },
  '/api/goods/create': () => {
    return responseMock()
  },
  '/api/goods/update': () => {
    return responseMock()
  },
  '/api/goods/delete': () => {
    return responseMock()
  },
})
