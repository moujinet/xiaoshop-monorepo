import type { IEnabled } from '@/common'
import type {
  ILogisticsDeliveryMode,
  ILogisticsFreightTemplate,
} from '@/logistics'
import type {
  IGoodsBuyBtnType,
  IGoodsFreightChargeMode,
  IGoodsInventoryDeductMode,
  IGoodsPublishMode,
  IGoodsRatingGrade,
  IGoodsReturnsFreightBy,
  IGoodsSource,
  IGoodsStatus,
  IGoodsType,
} from '@/goods/types'
import type {
  IGoodsAdditionDict,
  IGoodsAttribute,
  IGoodsBrandDict,
  IGoodsCategoryDict,
  IGoodsGroupDict,
  IGoodsProtectionDict,
  IGoodsTagDict,
} from '@/goods/models'

/**
 * 商品信息
 */
export interface IGoods {
  /**
   * 商品编号
   */
  id: string
  /**
   * 商品类型
   *
   * @see {@link IGoodsType}
   */
  type: IGoodsType
  /**
   * 商品状态
   *
   * @see {@link IGoodsStatus}
   */
  status: IGoodsStatus
  /**
   * 商品来源
   *
   * @see {@link IGoodsSource}
   */
  source: IGoodsSource
  /**
   * 商品图片集
   */
  images: string[]
  /**
   * 商品视频
   */
  video: string
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品分享描述
   */
  shareDesc: string
  /**
   * 商品卖点
   */
  slogan: string
  /**
   * 商品编码
   */
  skuCode: string
  /**
   * 单价
   */
  price: number
  /**
   * 原价
   */
  originalPrice: number
  /**
   * 成本
   */
  costPrice: number
  /**
   * 库存
   */
  inventory: number
  /**
   * 预警库存数
   */
  inventoryEarlyWarning: number
  /**
   * 重量
   */
  weight: number
  /**
   * 体积
   */
  volume: number
  /**
   * 商品单位
   */
  unit: string
  /**
   * 是否开启会员折扣 (N:否 Y:是)
   */
  enableVipDiscount: IEnabled
  /**
   * 是否开启限购 (N:否 Y:是)
   */
  enablePurchaseLimits: IEnabled
  /**
   * 限购数量
   */
  purchaseMaxQty: number
  /**
   * 最低购买数量
   */
  purchaseMinQty: number
  /**
   * 库存扣减方式
   *
   * @see {@link IGoodsInventoryDeductMode}
   */
  inventoryDeductMode: IGoodsInventoryDeductMode
  /**
   * 发货方式
   *
   * @see {@link ILogisticsDeliveryMode}
   */
  deliveryModes: ILogisticsDeliveryMode[]
  /**
   * 运费计算方式
   *
   * @see {@link IGoodsFreightChargeMode}
   */
  freightChargeMode: IGoodsFreightChargeMode
  /**
   * 统一运费
   */
  freight: number
  /**
   * 运费模板编号
   */
  freightTemplateId: ILogisticsFreightTemplate['id']
  /**
   * 退货运费承担方
   *
   * @see {@link IGoodsReturnsFreightBy}
   */
  returnsFreightBy: IGoodsReturnsFreightBy
  /**
   * 发布方式
   *
   * @see {@link IGoodsPublishMode}
   */
  publishMode: IGoodsPublishMode
  /**
   * 自动上架时间
   */
  autoInStockAt: string
  /**
   * 购买按钮名称类型
   *
   * @see {@link IGoodsBuyBtnType}
   */
  buyBtnNameType: IGoodsBuyBtnType
  /**
   * 购买按钮名称
   */
  buyBtnName: string
  /**
   * 商品详情
   */
  detail: string
  /**
   * 排序
   */
  sort: number
  /**
   * 销量
   */
  sales: number
  /**
   * 浏览量
   */
  views: number
  /**
   * 收藏量
   */
  favorites: number
  /**
   * 综合评价
   */
  overallGrade: IGoodsRatingGrade
  /**
   * 商品评分
   */
  overallGoodsScore: number
  /**
   * 服务评分
   */
  overallServiceScore: number
  /**
   * 物流评分
   */
  overallLogisticsScore: number
  /**
   * 是否为多规格商品
   */
  isMultiSkus: IEnabled
  /**
   * 是否已删除
   */
  isDeleted: IEnabled
  /**
   * 是否预警
   */
  isWarning: IEnabled
  /**
   * 商品参数
   *
   * @see {@link IGoodsAttribute}
   */
  attributes: IGoodsAttribute[]
  /**
   * 商品分类
   *
   * @see {@link IGoodsCategoryDict}
   */
  categories: IGoodsCategoryDict[]
  /**
   * 商品标签
   *
   * @see {@link IGoodsTagDict}
   */
  tag: IGoodsTagDict
  /**
   * 商品分组
   *
   * @see {@link IGoodsGroupDict}
   */
  group: IGoodsGroupDict
  /**
   * 商品品牌
   *
   * @see {@link IGoodsBrandDict}
   */
  brand: IGoodsBrandDict
  /**
   * 商品服务保障
   *
   * @see {@link IGoodsProtectionDict}
   */
  protections: IGoodsProtectionDict[]
  /**
   * 商品附加服务
   *
   * @see {@link IGoodsAdditionDict}
   */
  additions: IGoodsAdditionDict[]
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
  /**
   * 删除时间
   */
  deletedTime: string
  /**
   * 上架时间
   */
  inStockTime: string
  /**
   * 下架时间
   */
  stockedTime: string
  /**
   * 售罄时间
   */
  soldOutTime: string
}

/**
 * 商品基本信息
 */
export type IGoodsBasicInfo = Pick<
  IGoods,
  | 'id'
  | 'type'
  | 'video'
  | 'images'
  | 'categories'
  | 'name'
  | 'shareDesc'
  | 'slogan'
  | 'tag'
  | 'group'
  | 'brand'
  | 'protections'
  | 'additions'
  | 'attributes'
  | 'deliveryModes'
  | 'freight'
  | 'freightTemplateId'
  | 'freightChargeMode'
  | 'returnsFreightBy'
  | 'publishMode'
  | 'autoInStockAt'
  | 'buyBtnNameType'
  | 'buyBtnName'
>

/**
 * 商品基本信息表单
 */
export type IGoodsBasicInfoFormData = Omit<
  IGoodsBasicInfo,
  'id' | 'categories' | 'tag' | 'group' | 'brand' | 'protections' | 'additions'
> & {
  categoryIds: number[]
  tagId: number
  groupId: number
  brandId: number
  protectionIds: number[]
  additionIds: number[]
}

/**
 * 商品库存信息
 */
export type IGoodsInventoryInfo = Pick<
  IGoods,
  | 'id'
  | 'type'
  | 'isMultiSkus'
  | 'skuCode'
  | 'price'
  | 'originalPrice'
  | 'costPrice'
  | 'inventory'
  | 'inventoryEarlyWarning'
  | 'weight'
  | 'volume'
  | 'unit'
  | 'sales'
  | 'enablePurchaseLimits'
  | 'purchaseMinQty'
  | 'purchaseMaxQty'
  | 'inventoryDeductMode'
  | 'enableVipDiscount'
>

/**
 * 商品库存信息表单
 */
export type IGoodsInventoryInfoFormData = Omit<
  IGoodsInventoryInfo,
  'id' | 'type'
>

/**
 * 商品库存信息
 */
export type IGoodsDetailInfo = Pick<
  IGoods,
  | 'id'
  | 'detail'
>

/**
 * 商品分页列表
 */
export type IGoodsListItem = Pick<
  IGoods,
  | 'id'
  | 'status'
  | 'source'
  | 'type'
  | 'skuCode'
  | 'isMultiSkus'
  | 'name'
  | 'images'
  | 'tag'
  | 'group'
  | 'price'
  | 'inventory'
  | 'sales'
  | 'sort'
  | 'updatedTime'
  | 'deletedTime'
>

/**
 * 商品简要信息
 */
export type IGoodsDict = Pick<
  IGoods,
  | 'id'
  | 'status'
  | 'source'
  | 'type'
  | 'skuCode'
  | 'isMultiSkus'
  | 'name'
  | 'images'
  | 'tag'
  | 'group'
  | 'price'
  | 'inventory'
  | 'sales'
>

/**
 * 商品批量更新
 */
export type IGoodsBatchUpdateFormData = Partial<
  Pick<
    IGoods,
    | 'deliveryModes'
    | 'freight'
    | 'freightTemplateId'
    | 'freightChargeMode'
    | 'returnsFreightBy'
    | 'enablePurchaseLimits'
    | 'purchaseMinQty'
    | 'purchaseMaxQty'
    | 'buyBtnNameType'
    | 'buyBtnName'
  > & {
    categoryIds: number[]
    tagId: number
    groupId: number
    brandId: number
    protectionIds: number[]
    additionIds: number[]
  }
>
