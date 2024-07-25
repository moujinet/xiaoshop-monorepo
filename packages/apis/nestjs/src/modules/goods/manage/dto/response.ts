import { ApiProperty, PickType } from '@nestjs/swagger'
import {
  EnabledEnum,
  GoodsBuyBtnTypeEnum,
  GoodsLogisticsBackFreightByEnum,
  GoodsLogisticsFreightChargeModeEnum,
  GoodsPublishModeEnum,
  GoodsRatingGradeEnum,
  GoodsSourceEnum,
  GoodsStatusEnum,
  GoodsStockDeductModeEnum,
  GoodsTypeEnum,
  type IEnabled,
  type IGoods,
  type IGoodsAdditionalInfo,
  type IGoodsAttribute,
  type IGoodsBasicInfo,
  type IGoodsBrandDict,
  type IGoodsBuyBtnType,
  type IGoodsCategoryDict,
  type IGoodsDetailInfo,
  type IGoodsGroupDict,
  type IGoodsLogisticsBackFreightBy,
  type IGoodsLogisticsFreightChargeMode,
  type IGoodsProtectionInfo,
  type IGoodsPublishMode,
  type IGoodsRatingGrade,
  type IGoodsSource,
  type IGoodsStatus,
  type IGoodsStockDeductMode,
  type IGoodsStockInfo,
  type IGoodsTagDict,
  type IGoodsType,
  type ILogisticsDeliveryMode,
  LogisticsDeliveryModeEnum,
} from '@xiaoshop/schema'
import { example } from './example'
import { nanoid } from '~/utils'

/**
 * 创建商品响应
 */
export class CreateGoodsResponse {
  @ApiProperty({ description: '商品 ID', example: nanoid() })
  readonly id: string
}

/**
 * 商品信息 DTO
 */
export class GoodsResponse implements IGoods {
  @ApiProperty({ description: '商品 ID', example: nanoid() })
  readonly id: string

  @ApiProperty({ description: '商品类型', enum: GoodsTypeEnum, example: example.type })
  readonly type: IGoodsType

  @ApiProperty({ description: '商品状态', enum: GoodsStatusEnum, example: example.status })
  readonly status: IGoodsStatus

  @ApiProperty({ description: '商品来源', enum: GoodsSourceEnum, example: example.source })
  readonly source: IGoodsSource

  @ApiProperty({ description: '商品视频', example: example.video })
  readonly video: string

  @ApiProperty({ type: [String], description: '商品图片', example: example.images })
  readonly images: string[]

  @ApiProperty({ description: '商品名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '分享描述', example: example.shareDesc })
  readonly shareDesc: string

  @ApiProperty({ description: '商品卖点', example: example.slogan })
  readonly slogan: string

  @ApiProperty({ description: '商品编码', example: example.skuCode })
  readonly skuCode: string

  @ApiProperty({ type: 'float', description: '商品单价', example: example.price })
  readonly price: number

  @ApiProperty({ type: 'float', description: '商品原价', example: example.originalPrice })
  readonly originalPrice: number

  @ApiProperty({ type: 'float', description: '商品成本价', example: example.costPrice })
  readonly costPrice: number

  @ApiProperty({ description: '商品库存', example: example.stock })
  readonly stock: number

  @ApiProperty({ description: '预警库存', example: example.alertStock })
  readonly alertStock: number

  @ApiProperty({ type: 'float', description: '商品重量', example: example.weight })
  readonly weight: number

  @ApiProperty({ type: 'float', description: '商品体积', example: example.volume })
  readonly volume: number

  @ApiProperty({ description: '商品单位', example: example.unit })
  readonly unit: string

  @ApiProperty({ description: '限购数量', example: example.purchaseMaxQty })
  readonly purchaseMaxQty: number

  @ApiProperty({ description: '起购数量', example: example.purchaseMinQty })
  readonly purchaseMinQty: number

  @ApiProperty({ description: '库存扣减方式', enum: GoodsStockDeductModeEnum, example: example.stockDeductMode })
  readonly stockDeductMode: IGoodsStockDeductMode

  @ApiProperty({ description: '是否开启会员折扣', enum: EnabledEnum, default: EnabledEnum.NO })
  readonly enableVipDiscount: IEnabled

  @ApiProperty({ description: '是否开启限购', enum: EnabledEnum, default: EnabledEnum.NO })
  readonly enablePurchaseLimits: IEnabled

  @ApiProperty({ type: [String], enum: LogisticsDeliveryModeEnum, description: '商品配送方式', example: example.deliveryModes })
  readonly logisticsDeliveryModes: ILogisticsDeliveryMode[]

  @ApiProperty({ description: '商品物流费用计算方式', enum: GoodsLogisticsFreightChargeModeEnum, example: example.freightChargeMode })
  readonly logisticsFreightChargeMode: IGoodsLogisticsFreightChargeMode

  @ApiProperty({ description: '商品物流运费', example: example.freight })
  readonly logisticsFreight: number

  @ApiProperty({ description: '商品物流运费模板', example: example.freightTemplateId })
  readonly logisticsFreightTemplateId: number

  @ApiProperty({ description: '商品退货运费承担方', enum: GoodsLogisticsBackFreightByEnum, example: example.backFreightBy })
  readonly logisticsBackFreightBy: IGoodsLogisticsBackFreightBy

  @ApiProperty({ description: '商品上架方式', enum: GoodsPublishModeEnum, example: example.publishMode })
  readonly publishMode: IGoodsPublishMode

  @ApiProperty({ description: '自定义上架时间', example: example.autoInStockAt })
  readonly autoInStockAt: string

  @ApiProperty({ description: '商品购买按钮类型', enum: GoodsBuyBtnTypeEnum, example: example.buyBtnNameType })
  readonly buyBtnNameType: IGoodsBuyBtnType

  @ApiProperty({ description: '商品购买按钮类型', example: example.buyBtnName })
  readonly buyBtnName: string

  @ApiProperty({ description: '商品详情', example: example.detail })
  readonly detail: string

  @ApiProperty({ description: '商品标签', example: example.tag })
  readonly tag: IGoodsTagDict

  @ApiProperty({ description: '商品分组', example: example.group })
  readonly group: IGoodsGroupDict

  @ApiProperty({ description: '商品品牌', example: example.brand })
  readonly brand: IGoodsBrandDict

  @ApiProperty({ description: '商品分类', example: example.categoriesDict })
  readonly categories: IGoodsCategoryDict[]

  @ApiProperty({ description: '服务保障', example: example.protectionsDict })
  readonly protections: IGoodsProtectionInfo[]

  @ApiProperty({ description: '附加服务', example: example.additionsDict })
  readonly additions: IGoodsAdditionalInfo[]

  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  readonly attributeTemplateId: number

  @ApiProperty({ description: '商品参数', example: [example.attributes] })
  readonly attributes: IGoodsAttribute[]

  @ApiProperty({ description: '排序', example: example.sort })
  readonly sort: number

  @ApiProperty({ description: '商品销量', example: 0 })
  readonly sales: number

  @ApiProperty({ description: '商品浏览量', example: 0 })
  readonly views: number

  @ApiProperty({ description: '商品收藏量', example: 0 })
  readonly favorites: number

  @ApiProperty({ description: '综合评级', enum: GoodsRatingGradeEnum })
  readonly overallGrade: IGoodsRatingGrade

  @ApiProperty({ description: '商品评分' })
  readonly overallGoodsScore: number

  @ApiProperty({ description: '服务评分' })
  readonly overallServiceScore: number

  @ApiProperty({ description: '物流评分' })
  readonly overallLogisticsScore: number

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string

  @ApiProperty({ description: '删除时间' })
  readonly deletedTime: string

  @ApiProperty({ description: '上架时间' })
  readonly inStockTime: string

  @ApiProperty({ description: '下架时间' })
  readonly stockedTime: string

  @ApiProperty({ description: '售罄时间' })
  readonly soldOutTime: string
}

/**
 * 商品基本信息响应
 */
export class GoodsBasicInfoResponse
  extends PickType(GoodsResponse, [
    'id',
    'type',
    'video',
    'images',
    'categories',
    'name',
    'shareDesc',
    'slogan',
    'tag',
    'group',
    'brand',
    'protections',
    'additions',
    'attributeTemplateId',
    'attributes',
    'logisticsDeliveryModes',
    'logisticsFreight',
    'logisticsFreightTemplateId',
    'logisticsFreightChargeMode',
    'logisticsBackFreightBy',
    'publishMode',
    'autoInStockAt',
    'buyBtnNameType',
    'buyBtnName',
  ] as const)
  implements IGoodsBasicInfo {}

/**
 * 商品库存信息响应
 */
export class GoodsStockInfoResponse
  extends PickType(GoodsResponse, [
    'id',
    'skuCode',
    'price',
    'originalPrice',
    'costPrice',
    'stock',
    'alertStock',
    'weight',
    'volume',
    'unit',
    'enablePurchaseLimits',
    'purchaseMinQty',
    'purchaseMaxQty',
    'stockDeductMode',
    'enableVipDiscount',
  ] as const)
  implements IGoodsStockInfo {}

/**
 * 商品详情响应
 */
export class GoodsDetailInfoResponse
  extends PickType(GoodsResponse, [
    'id',
    'detail',
  ] as const)
  implements IGoodsDetailInfo {}
