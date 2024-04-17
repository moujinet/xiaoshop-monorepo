import type { IAssetSnapshot } from '@/assets/types'

import type {
  IGoodsAttribute,
  IGoodsAttributeTemplate,
  IGoodsBrandDict,
  IGoodsCategoryDict,
  IGoodsGroupDict,
  IGoodsGuaranteeDict,
  IGoodsServiceDict,
  IGoodsSku,
  IGoodsSkuSpecs,
  IGoodsTagDict,
} from '@/goods/types'

import type {
  IGoodsBuyButtonType,
  IGoodsDeliveryCostsType,
  IGoodsDeliveryType,
  IGoodsPublishType,
  IGoodsReturnCostsType,
  IGoodsStatus,
  IGoodsStockDeductType,
  IGoodsType,
} from '@/goods/constants'

export interface IGoods {
  /**
   * 商品 ID
   */
  id: number
  /**
   * 商品类型
   */
  type: IGoodsType
  /**
   * 商品状态
   */
  status: IGoodsStatus
  /**
   * 商品图片
   */
  images: IAssetSnapshot[]
  /**
   * 商品视频
   */
  video?: IAssetSnapshot
  /**
   * 商品分类
   */
  categories: IGoodsCategoryDict[]
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品分享描述
   */
  shareDesc: string
  /**
   * 商品宣传语
   */
  slogan: string
  /**
   * 商品标签
   */
  tag: IGoodsTagDict
  /**
   * 商品分组
   */
  group: IGoodsGroupDict
  /**
   * 商品品牌
   */
  brand: IGoodsBrandDict
  /**
   * 商品附加服务
   */
  services: IGoodsServiceDict[]
  /**
   * 商品保障
   */
  guarantees: IGoodsGuaranteeDict[]
  /**
   * 商品参数模板
   */
  attributeTemplateId: IGoodsAttributeTemplate['id']
  /**
   * 商品参数
   */
  attributes: IGoodsAttribute[]
  /**
   * 商品 SKU 规格定义
   */
  skuSpecs: IGoodsSkuSpecs[]
  /**
   * 商品 SKU
   */
  skus: IGoodsSku[]
  /**
   * 商品编码
   */
  skuId: string
  /**
   * 商品价格
   */
  price: number
  /**
   * 商品原价（划线价）
   */
  originalPrice: number
  /**
   * 商品成本价
   */
  costPrice: number
  /**
   * 商品库存
   */
  stock: number
  /**
   * 商品预警库存
   */
  alarmStock: number
  /**
   * 商品重量 kg
   */
  weight: number
  /**
   * 商品体积 m3
   */
  volume: number
  /**
   * 是否隐藏库存
   */
  enableHideStock: boolean
  /**
   * 商品单位
   */
  unit: string
  /**
   * 是否开启限购
   */
  enablePurchaseLimit: boolean
  /**
   * 限购数量
   */
  purchaseLimit: number
  /**
   * 起售数量
   */
  purchaseMinQty: number
  /**
   * 库存扣减方式
   */
  stockDeductType: IGoodsStockDeductType
  /**
   * 是否开启会员折扣
   */
  enableVipDiscount: boolean
  /**
   * 商品配送方式
   */
  deliveryTypes: IGoodsDeliveryType[]
  /**
   * 商品物流费用方式
   */
  deliveryCostsType: IGoodsDeliveryCostsType
  /**
   * 商品物流费用（统一费用）
   */
  deliveryCosts: number
  /**
   * 商品物流费用（运费模板）
   */
  deliveryCostsTemplateId: number // TODO
  /**
   * 商品退货运费承担方
   */
  returnCostsType: IGoodsReturnCostsType
  /**
   * 商品上架方式
   */
  publishType: IGoodsPublishType
  /**
   * 商品上架时间
   */
  publishTime: number
  /**
   * 商品购买按钮类型
   */
  buyButtonNameType: IGoodsBuyButtonType
  /**
   * 商品购买按钮名称
   */
  buyButtonName: string
  /**
   * 商品详情
   */
  detail: string
  /**
   * 商品排序
   */
  sort: number
  /**
   * 商品创建时间
   */
  createdTime: number
}

export type IGoodsFormData = Omit<
  IGoods,
  'id' | 'categories' | 'tag' | 'group' | 'brand' | 'services' | 'guarantees' | 'sort' | 'createdTime'
> & {
  /**
   * 商品分类
   */
  categories: number[]
  /**
   * 商品标签
   */
  tagId: number
  /**
   * 商品分组
   */
  groupId: number
  /**
   * 商品品牌
   */
  brandId: number
  /**
   * 商品服务
   */
  services: number[]
  /**
   * 商品保障
   */
  guarantees: number[]
  /**
   * 商品编码
   */
  skuId: string
  /**
   * 商品价格
   */
  price: number
  /**
   * 商品原价（划线价）
   */
  originalPrice: number
  /**
   * 商品成本价
   */
  costPrice: number
  /**
   * 商品库存
   */
  stock: number
  /**
   * 商品预警库存
   */
  alarmStock: number
  /**
   * 商品重量 KG
   */
  weight: number
  /**
   * 商品体积 M3
   */
  volume: number
}

export type IGoodsPageListItem = Pick<
  IGoods,
  'id' | 'type' | 'status' | 'name' | 'images' |
  'skuId' | 'price' | 'originalPrice' | 'stock' | 'unit' |
  'tag' | 'services' | 'guarantees' | 'sort' | 'createdTime'
>
