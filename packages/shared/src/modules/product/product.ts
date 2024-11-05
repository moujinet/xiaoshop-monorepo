import type { IProductTagDict } from './tag'
import type { IDict, YesOrNo } from '~/common'
import type { IProductGroupDict } from './group'
import type { IProductBrandDict } from './brand'
import type { IProductAttribute } from './attribute'
import type { IProductCategoryDict } from './category'
import type { LogisticDeliveryMethod } from '@/logistic'
import type { IProductServiceAdditionDict, IProductServiceExtraDict } from './service'
import type {
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
} from './constants'

/**
 * 商品信息
 */
export interface IProductInfo {
  /**
   * 商品 ID
   */
  id: number
  /**
   * 商品云链 ID
   */
  connectId: string
  /**
   * 商品类型
   *
   * @see {@link ProductType}
   */
  type: IDict
  /**
   * 商品状态
   *
   * @see {@link ProductStatus}
   */
  status: IDict
  /**
   * 商品来源
   *
   * @see {@link ProductSource}
   */
  source: IDict
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
   * 商品详情
   */
  content: string
  /**
   * 单价 (冗余 SKU 最低价)
   */
  price: number
  /**
   * 库存 (合计 SKU 库存)
   */
  inventory: number
  /**
   * 排序
   */
  sort: number
  /**
   * 商品分类
   */
  categories: IProductCategoryDict[]
  /**
   * 商品标签
   */
  tags: IProductTagDict[]
  /**
   * 商品分组
   */
  groups: IProductGroupDict[]
  /**
   * 商品品牌
   */
  brand: IProductBrandDict
  /**
   * 商品参数
   */
  attributes: IProductAttribute[]
  /**
   * 附加服务
   */
  additions: IProductServiceAdditionDict[]
  /**
   * 服务保障
   */
  extras: IProductServiceExtraDict[]
  /**
   * 是否开启会员折扣
   */
  isEnableVipDiscount: YesOrNo
  /**
   * 是否开启限购
   */
  isEnableLimits: YesOrNo
  /**
   * 限购数量
   */
  limitsMaxQty: number
  /**
   * 最低购买数量
   */
  limitsMinQty: number
  /**
   * 发货方式
   */
  deliveryMethods: LogisticDeliveryMethod[]
  /**
   * 运费计算方式
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
   */
  returnsFreightBy: ProductReturnsFreightBy
  /**
   * 购买按钮名称类型
   */
  buyBtnNameType: ProductBuyBtnType
  /**
   * 购买按钮名称
   */
  buyBtnName: string
  /**
   * 发布方式
   */
  publishMode: ProductPublishMode
  /**
   * 自动上架时间
   */
  autoOnSaleAt: string
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
   * 综合评价 (冗余平均评分)
   */
  overallScore: number
  /**
   * 综合商品评分 (冗余平均评分)
   */
  overallProductScore: number
  /**
   * 综合服务评分 (冗余平均评分)
   */
  overallServiceScore: number
  /**
   * 综合物流评分 (冗余平均评分)
   */
  overallLogisticsScore: number
  /**
   * 是否为多规格商品
   */
  isMultiSkus: YesOrNo
  /**
   * 是否预警中
   */
  isWarning: YesOrNo
  /**
   * 是否已删除
   */
  isDeleted: YesOrNo
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
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
  /**
   * 删除时间
   */
  deletedTime: string
}

/**
 * 商品摘要信息
 */
export type IProductOverview = Pick<
  IProductInfo,
  | 'id'
  | 'connectId'
  | 'name'
  | 'desc'
  | 'slogan'
  | 'tags'
> & {
  /**
   * 商品图片 (1st)
   */
  image: string
}

/**
 * 商品字典信息
 */
export type IProductDict = Pick<
  IProductInfo,
  | 'id'
  | 'connectId'
  | 'name'
  | 'desc'
  | 'images'
>

/**
 * 商品列表信息
 */
export type IProductList =
  IProductOverview
  & Pick<
    IProductInfo,
    | 'status'
    | 'type'
    | 'source'
    | 'categories'
    | 'groups'
    | 'brand'
    | 'price'
    | 'inventory'
    | 'sales'
    | 'sort'
    | 'onSaleTime'
  >
