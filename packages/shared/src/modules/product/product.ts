import type {
  IProductBuyBtnType,
  IProductFreightChargeMode,
  IProductInventoryDeductMode,
  IProductPublishMode,
  IProductRatingGrade,
  IProductReturnsFreightBy,
  IProductSource,
  IProductStatus,
  IProductType,
} from './types'
import type { IProductSkuInfo } from './sku'
import type { IProductTagDict } from './tag'
import type { IProductBrandDict } from './brand'
import type { IProductGroupDict } from './group'
import type { IProductAttribute } from './attribute'
import type { IProductAdditionDict } from './addition'
import type { IProductCategoryDict } from './category'
import type { IProductCommitmentDict } from './commitment'
import type { ILogisticsDeliveryMethod } from '@/logistics'
import type { IYesOrNo } from '~/common'

/**
 * 商品信息
 */
export interface IProduct {
  /**
   * 商品 ID
   */
  id: number
  /**
   * 商品 UUID
   */
  uuid: string
  /**
   * 商品类型
   *
   * - `entity`: 实物商品
   * - `virtual`: 虚拟商品
   * - `card`: 电子卡密
   *
   * @see {@link IProductType}
   */
  type: IProductType
  /**
   * 商品状态
   *
   * - `on_sale`: 在售
   * - `stocked`: 仓库
   * - `sold_out`: 售罄
   * - `draft`: 草稿
   *
   * @see {@link IProductStatus}
   */
  status: IProductStatus
  /**
   * 商品来源
   *
   * - `manual`: 手动添加
   * - `import`: 导入商品
   * - `clawer`: 采集商品
   * - `connect`: 云链商品
   *
   * @see {@link IProductSource}
   */
  source: IProductSource
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
   * @see {@link IYesOrNo}
   */
  enableVipDiscount: IYesOrNo
  /**
   * 是否开启限购 (N:否 Y:是)
   *
   * @see {@link IYesOrNo}
   */
  enablePurchaseLimits: IYesOrNo
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
   * - `order`: 拍下减库存
   * - `paid`: 付款减库存
   *
   * @see {@link IProductInventoryDeductMode}
   */
  inventoryDeductMode: IProductInventoryDeductMode
  /**
   * 发货方式
   *
   * - `express`: 物流快递
   * - `self`: 到店自提
   * - `local`: 同城配送
   * - `none`: 无需发货
   *
   * @see {@link ILogisticsDeliveryMethod}
   */
  deliveryMethods: ILogisticsDeliveryMethod[]
  /**
   * 运费计算方式
   *
   * - `std`: 统一运费
   * - `template`: 模板
   * - `cod`: 货到付款
   *
   * @see {@link IProductFreightChargeMode}
   */
  freightChargeMode: IProductFreightChargeMode
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
   * - `seller`: 卖家
   * - `buyer`: 买家
   *
   * @see {@link IProductReturnsFreightBy}
   */
  returnsFreightBy: IProductReturnsFreightBy
  /**
   * 发布方式
   *
   * - `direct`: 立即上架
   * - `auto`: 自定义上架
   * - `stocked`: 暂不售卖, 放入仓库
   *
   * @see {@link IProductPublishMode}
   */
  publishMode: IProductPublishMode
  /**
   * 自动上架时间
   */
  autoInStockAt: string
  /**
   * 购买按钮名称类型
   *
   * - `default`: 默认名称
   * - `custom`: 自定义名称
   *
   * @see {@link IProductBuyBtnType}
   */
  buyBtnNameType: IProductBuyBtnType
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
   * - `high`: 好评
   * - `normal`: 中评
   * - `low`: 差评
   *
   * @see {@link IProductRatingGrade}
   */
  overallGrade: IProductRatingGrade
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
   * @see {@link IYesOrNo}
   */
  isMultiSkus: IYesOrNo
  /**
   * 是否已删除
   *
   * @see {@link IYesOrNo}
   */
  isDeleted: IYesOrNo
  /**
   * 是否预警
   *
   * @see {@link IYesOrNo}
   */
  isWarning: IYesOrNo
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
  | 'uuid'
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
