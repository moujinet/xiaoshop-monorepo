import type { LogisticsDeliveryMethod } from '@/logistics'
import type { YesOrNo } from '~/common'
import type { IProductAdditionDict } from './addition'
import type { IProductAttribute } from './attribute'
import type { IProductBrandDict } from './brand'
import type { IProductCategoryDict } from './category'
import type { IProductCommitmentDict } from './commitment'
import type {
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductInventoryDeductMode,
  ProductPublishMode,
  ProductRatingGrade,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
} from './constants'
import type { IProductGroupDict } from './group'
import type { IProductSkuInfo } from './sku'
import type { IProductTagDict } from './tag'

/**
 * 商品信息
 */
export interface IProduct {
  /**
   * 商品 ID
   */
  id: number
  /**
   * 云链 ID
   */
  connectId: string
  /**
   * 商品类型
   *
   * @see {@link ProductType}
   */
  type: ProductType
  /**
   * 商品状态
   *
   * @see {@link ProductStatus}
   */
  status: ProductStatus
  /**
   * 商品来源
   *
   * @see {@link ProductSource}
   */
  source: ProductSource
  /**
   * 商品 SKU
   *
   * @see {@link IProductSkuInfo}
   */
  skus: IProductSkuInfo[]
  /**
   * 商品分类
   *
   * @see {@link IProductCategoryDict}
   */
  categories: IProductCategoryDict[]
  /**
   * 商品标签 ID
   */
  tagId: number
  /**
   * 商品标签
   *
   * @see {@link IProductTagDict}
   */
  tag: IProductTagDict
  /**
   * 商品分组 ID
   */
  groupId: number
  /**
   * 商品分组
   *
   * @see {@link IProductGroupDict}
   */
  group: IProductGroupDict
  /**
   * 商品品牌 ID
   */
  brandId: number
  /**
   * 商品品牌
   *
   * @see {@link IProductBrandDict}
   */
  brand: IProductBrandDict
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品分享描述
   */
  desc: string
  /**
   * 商品卖点
   */
  slogan: string
  /**
   * 商品图片
   */
  images: string[]
  /**
   * 商品视频
   */
  video: string
  /**
   * 商品参数
   *
   * @see {@link IProductAttribute}
   */
  attributes: IProductAttribute[]
  /**
   * 商品服务承诺
   *
   * @see {@link IProductCommitmentDict}
   */
  commitments: IProductCommitmentDict[]
  /**
   * 商品附加服务
   *
   * @see {@link IProductAdditionDict}
   */
  additions: IProductAdditionDict[]
  /**
   * 单价 (冗余 SKU 最低价)
   */
  price: number
  /**
   * 库存 (合计 SKU 库存)
   */
  inventory: number
  /**
   * 是否开启会员折扣 (N:否 Y:是)
   *
   * @see {@link YesOrNo}
   */
  enableVipDiscount: YesOrNo
  /**
   * 是否开启限购 (N:否 Y:是)
   *
   * @see {@link YesOrNo}
   */
  enablePurchaseLimits: YesOrNo
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
   * @see {@link ProductInventoryDeductMode}
   */
  inventoryDeductMode: ProductInventoryDeductMode
  /**
   * 发货方式
   *
   * @see {@link LogisticsDeliveryMethod}
   */
  deliveryMethods: LogisticsDeliveryMethod[]
  /**
   * 运费计算方式
   *
   * @see {@link ProductFreightChargeMode}
   */
  freightChargeMode: ProductFreightChargeMode
  /**
   * 统一运费
   */
  freight: number
  /**
   * 运费模板 ID
   */
  freightTemplateId: number
  /**
   * 退货运费承担方
   *
   * @see {@link ProductReturnsFreightBy}
   */
  returnsFreightBy: ProductReturnsFreightBy
  /**
   * 发布方式
   *
   * @see {@link ProductPublishMode}
   */
  publishMode: ProductPublishMode
  /**
   * 自动上架时间
   */
  autoInStockAt: string
  /**
   * 购买按钮名称类型
   *
   * @see {@link ProductBuyBtnType}
   */
  buyBtnNameType: ProductBuyBtnType
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
   *
   * @see {@link ProductRatingGrade}
   */
  overallGrade: ProductRatingGrade
  /**
   * 商品评分
   */
  overallProductScore: number
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
   *
   * @see {@link YesOrNo}
   */
  isMultiSkus: YesOrNo
  /**
   * 是否已删除
   *
   * @see {@link YesOrNo}
   */
  isDeleted: YesOrNo
  /**
   * 是否预警
   *
   * @see {@link YesOrNo}
   */
  isWarning: YesOrNo
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
  onSaleTime: string
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
 * 商品摘要信息
 *
 * @see {@link IProduct}
 */
export type IProductInfo = Pick<
  IProduct,
  | 'id'
  | 'connectId'
  | 'type'
  | 'status'
  | 'source'
  | 'name'
  | 'slogan'
  | 'images'
  | 'video'
  | 'categories'
  | 'group'
  | 'tag'
  | 'brand'
  | 'commitments'
  | 'additions'
>

/**
 * 购物车商品信息
 *
 * @see {@link IProduct}
 */
export type IProductCartInfo = Pick<
  IProduct,
  | 'id'
  | 'connectId'
  | 'type'
  | 'status'
  | 'name'
  | 'slogan'
  | 'images'
  | 'tag'
  | 'commitments'
  | 'additions'
>

/**
 * 商品列表
 *
 * @see {@link IProductInfo}
 */
export type IProductListItem = IProductInfo
  & Pick<
    IProduct,
    | 'price'
    | 'inventory'
    | 'isMultiSkus'
    | 'sales'
    | 'favorites'
    | 'views'
    | 'sort'
    | 'updatedTime'
  >

/**
 * 商品导出列表
 *
 * @see {@link IProduct}
 */
export type IProductExportListItem = Pick<
  IProduct,
  | 'id'
  | 'type'
  | 'source'
  | 'status'
  | 'isMultiSkus'
  | 'name'
  | 'price'
  | 'inventory'
  | 'sales'
  | 'skus'
  | 'categories'
  | 'tag'
  | 'group'
  | 'brand'
>
