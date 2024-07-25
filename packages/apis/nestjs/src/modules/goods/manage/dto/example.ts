import {
  EnabledEnum,
  GoodsAttributeOptionTypeEnum,
  GoodsBuyBtnTypeEnum,
  GoodsLogisticsBackFreightByEnum,
  GoodsLogisticsFreightChargeModeEnum,
  GoodsPublishModeEnum,
  GoodsRatingGradeEnum,
  GoodsSourceEnum,
  GoodsStatusEnum,
  GoodsStockDeductModeEnum,
  GoodsTypeEnum,
  LogisticsDeliveryModeEnum,
} from '@xiaoshop/schema'

export const example = {
  name: '商品名称',
  shareDesc: '分享描述',
  slogan: '商品卖点',
  skuCode: 'SKU 编码',
  tagId: 1,
  tag: {
    id: 1,
    name: '商品标签',
  },
  groupId: 1,
  group: {
    id: 1,
    name: '商品分组',
  },
  brandId: 1,
  brand: {
    id: 1,
    name: '商品品牌',
  },
  video: 'https://www.example.com/video.mp4',
  images: ['https://www.example.com/image.png'],
  categories: [1, 2, 3],
  categoriesDict: [
    {
      id: 1,
      name: '商品分类 1',
    },
    {
      id: 2,
      name: '商品分类 2',
    },
    {
      id: 3,
      name: '商品分类 3',
    },
  ],
  protections: [1, 2, 3],
  protectionsDict: [
    {
      id: 1,
      name: '服务保障 1',
      icon: 'https://www.example.com/image.png',
    },
    {
      id: 2,
      name: '服务保障 2',
      icon: 'https://www.example.com/image.png',
    },
    {
      id: 3,
      name: '服务保障 3',
      icon: 'https://www.example.com/image.png',
    },
  ],
  additions: [1, 2, 3],
  additionsDict: [
    {
      id: 1,
      name: '附加服务 1',
      price: 10,
      icon: 'https://www.example.com/image.png',
    },
    {
      id: 2,
      name: '附加服务 2',
      price: 10,
      icon: 'https://www.example.com/image.png',
    },
    {
      id: 3,
      name: '附加服务 3',
      price: 10,
      icon: 'https://www.example.com/image.png',
    },
  ],
  price: 99,
  originalPrice: 168,
  costPrice: 46,
  stock: 1000,
  alertStock: 50,
  weight: 0.25,
  volume: 0.037,
  unit: '件',
  purchaseMaxQty: 0,
  purchaseMinQty: 1,
  stockDeductMode: GoodsStockDeductModeEnum.ORDER,
  enableVipDiscount: EnabledEnum.NO,
  enablePurchaseLimits: EnabledEnum.NO,
  attributeTemplateId: 1,
  attributes: [
    {
      type: GoodsAttributeOptionTypeEnum.RADIO,
      name: '产地',
      options: ['中国', '日本'],
      values: ['中国'],
    },
  ],
  detail: '详情页 HTML 内容',
  deliveryModes: [LogisticsDeliveryModeEnum.EXPRESS],
  freightChargeMode: GoodsLogisticsFreightChargeModeEnum.TEMPLATE,
  freight: 0,
  freightTemplateId: 1,
  backFreightBy: GoodsLogisticsBackFreightByEnum.BUYER,
  sort: 1,
  type: GoodsTypeEnum.ENTITY,
  status: GoodsStatusEnum.IN_STOCK,
  source: GoodsSourceEnum.MANUAL,
  publishMode: GoodsPublishModeEnum.DIRECT,
  autoInStockAt: new Date(),
  buyBtnNameType: GoodsBuyBtnTypeEnum.DEFAULT,
  buyBtnName: '',
  rating: {
    id: 1,
    overallGrade: GoodsRatingGradeEnum.HIGH,
    overallGoodsScore: 5,
    overallServiceScore: 5,
    overallLogisticsScore: 5,
  },
}