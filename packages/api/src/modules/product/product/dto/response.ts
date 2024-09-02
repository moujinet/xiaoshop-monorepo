import { ApiProperty, PickType } from '@nestjs/swagger'
import type {
  ILogisticsDeliveryMethod,
  IProductAdditionDict,
  IProductAttribute,
  IProductBrandDict,
  IProductBuyBtnType,
  IProductCategoryDict,
  IProductCommitmentDict,
  IProductFreightChargeMode,
  IProductGroupDict,
  IProductInventoryDeductMode,
  IProductListItem,
  IProductPublishMode,
  IProductRatingGrade,
  IProductReturnsFreightBy,
  IProductSkuInfo,
  IProductSource,
  IProductStatus,
  IProductTagDict,
  IProductType,
  IYesOrNo,
} from '@xiaoshop/shared'
import { example } from './example'

export class ProductResponse {
  @ApiProperty({ description: '商品 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '商品 UUID', example: example.uuid })
  readonly uuid: string

  @ApiProperty({ description: '商品类型', example: example.type })
  readonly type: IProductType

  @ApiProperty({ description: '商品状态', example: example.status })
  readonly status: IProductStatus

  @ApiProperty({ description: '商品来源', example: example.source })
  readonly source: IProductSource

  @ApiProperty({ description: '商品 SKU', example: example.skus })
  readonly skus: IProductSkuInfo[]

  @ApiProperty({ description: '商品分类', example: example.categories })
  readonly categories: IProductCategoryDict[]

  @ApiProperty({ description: '商品标签 ID', example: example.tagId })
  readonly tagId: number

  @ApiProperty({ description: '商品标签', example: example.tag })
  readonly tag: IProductTagDict

  @ApiProperty({ description: '商品分组 ID', example: example.groupId })
  readonly groupId: number

  @ApiProperty({ description: '商品分组', example: example.group })
  readonly group: IProductGroupDict

  @ApiProperty({ description: '商品品牌 ID', example: example.brandId })
  readonly brandId: number

  @ApiProperty({ description: '商品品牌', example: example.brand })
  readonly brand: IProductBrandDict

  @ApiProperty({ description: '商品名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '商品描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '商品 slogan', example: example.slogan })
  readonly slogan: string

  @ApiProperty({ description: '商品图片', example: example.images })
  readonly images: string[]

  @ApiProperty({ description: '商品视频', example: example.video })
  readonly video: string

  @ApiProperty({ description: '商品属性', example: example.attributes })
  readonly attributes: IProductAttribute[]

  @ApiProperty({ description: '商品服务承诺', example: example.commitments })
  readonly commitments: IProductCommitmentDict[]

  @ApiProperty({ description: '商品附加服务', example: example.additions })
  readonly additions: IProductAdditionDict[]

  @ApiProperty({ description: '商品价格', example: example.price })
  readonly price: number

  @ApiProperty({ description: '商品库存', example: example.inventory })
  readonly inventory: number

  @ApiProperty({ description: '是否启用会员折扣', example: example.enableVipDiscount })
  readonly enableVipDiscount: IYesOrNo

  @ApiProperty({ description: '是否启用限购', example: example.enablePurchaseLimits })
  readonly enablePurchaseLimits: IYesOrNo

  @ApiProperty({ description: '限购数量', example: example.purchaseMaxQty })
  readonly purchaseMaxQty: number

  @ApiProperty({ description: '最低购买数量', example: example.purchaseMinQty })
  readonly purchaseMinQty: number

  @ApiProperty({ description: '库存扣减方式', example: example.inventoryDeductMode })
  readonly inventoryDeductMode: IProductInventoryDeductMode

  @ApiProperty({ description: '发货方式', example: example.deliveryMethods })
  readonly deliveryMethods: ILogisticsDeliveryMethod[]

  @ApiProperty({ description: '运费计算方式', example: example.freightChargeMode })
  readonly freightChargeMode: IProductFreightChargeMode

  @ApiProperty({ description: '统一运费', example: example.freight })
  readonly freight: number

  @ApiProperty({ description: '运费模板 ID', example: example.freightTemplateId })
  readonly freightTemplateId: number

  @ApiProperty({ description: '退货运费承担方', example: example.returnsFreightBy })
  readonly returnsFreightBy: IProductReturnsFreightBy

  @ApiProperty({ description: '发布方式', example: example.publishMode })
  readonly publishMode: IProductPublishMode

  @ApiProperty({ description: '自动上架时间', example: example.autoInStockAt })
  readonly autoInStockAt: string

  @ApiProperty({ description: '购买按钮名称类型', example: example.buyBtnNameType })
  readonly buyBtnNameType: IProductBuyBtnType

  @ApiProperty({ description: '购买按钮名称', example: example.buyBtnName })
  readonly buyBtnName: string

  @ApiProperty({ description: '商品详情', example: example.detail })
  readonly detail: string

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '销量', example: example.sales })
  readonly sales: number

  @ApiProperty({ description: '浏览量', example: example.views })
  readonly views: number

  @ApiProperty({ description: '收藏量', example: example.favorites })
  readonly favorites: number

  @ApiProperty({ description: '综合评价', example: example.overallGrade })
  readonly overallGrade: IProductRatingGrade

  @ApiProperty({ description: '商品评分', example: example.overallProductScore })
  readonly overallProductScore: number

  @ApiProperty({ description: '服务评分', example: example.overallServiceScore })
  readonly overallServiceScore: number

  @ApiProperty({ description: '物流评分', example: example.overallLogisticsScore })
  readonly overallLogisticsScore: number

  @ApiProperty({ description: '是否为多规格商品', example: example.isMultiSkus })
  readonly isMultiSkus: IYesOrNo

  @ApiProperty({ description: '是否已删除', example: example.isDeleted })
  readonly isDeleted: IYesOrNo

  @ApiProperty({ description: '是否预警', example: example.isWarning })
  readonly isWarning: IYesOrNo

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string

  @ApiProperty({ description: '删除时间' })
  readonly deletedTime: string

  @ApiProperty({ description: '上架时间' })
  readonly onSaleTime: string

  @ApiProperty({ description: '下架时间' })
  readonly stockedTime: string

  @ApiProperty({ description: '售罄时间' })
  readonly soldOutTime: string
}

export class ProductListResponse
  extends PickType(ProductResponse, [
    'id',
    'uuid',
    'type',
    'status',
    'source',
    'name',
    'slogan',
    'images',
    'video',
    'categories',
    'group',
    'tag',
    'brand',
    'commitments',
    'additions',
    'price',
    'inventory',
    'isMultiSkus',
    'sales',
    'favorites',
    'views',
    'sort',
    'updatedTime',
  ])
  implements IProductListItem {}
