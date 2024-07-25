import { Type } from 'class-transformer'
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'
import {
  EnabledEnum,
  GoodsAttributeOptionTypeEnum,
  GoodsBuyBtnTypeEnum,
  GoodsLogisticsBackFreightByEnum,
  GoodsLogisticsFreightChargeModeEnum,
  GoodsPublishModeEnum,
  GoodsSourceEnum,
  GoodsStatusEnum,
  GoodsStockDeductModeEnum,
  GoodsTypeEnum,
  type IEnabled,
  type IGoodsAttribute,
  type IGoodsAttributeOptionType,
  type IGoodsBasicInfoFormData,
  type IGoodsBuyBtnType,
  type IGoodsLogisticsBackFreightBy,
  type IGoodsLogisticsFreightChargeMode,
  type IGoodsPublishMode,
  type IGoodsSource,
  type IGoodsSpec,
  type IGoodsStatus,
  type IGoodsStockDeductMode,
  type IGoodsStockInfoFormData,
  type IGoodsType,
  type ILogisticsDeliveryMode,
  LogisticsDeliveryModeEnum,
} from '@xiaoshop/schema'
import { example } from './example'
import { GoodsSkuPayload } from '@/goods/sku/dto'
import { GoodsSpecPayload } from '@/goods/spec/dto'
import { nanoid } from '~/utils'

/**
 * 商品参数 - 选项 DTO
 */
export class GoodsAttributePayload implements IGoodsAttribute {
  @ApiProperty({ description: '商品参数类型', enum: GoodsAttributeOptionTypeEnum, example: example.attributes[0].type })
  @IsEnum(GoodsAttributeOptionTypeEnum)
  readonly type: IGoodsAttributeOptionType

  @ApiProperty({ description: '商品参数名称', example: example.attributes[0].name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ type: [String], description: '商品参数选项', example: example.attributes[0].options })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly options: string[]

  @ApiProperty({ type: [String], description: '商品参数值', example: example.attributes[0].values })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly values: string[]
}

/**
 * 商品基本信息 DTO
 */
export class GoodsBasicInfoPayload implements IGoodsBasicInfoFormData {
  @ApiProperty({ required: false, description: '商品状态', enum: GoodsTypeEnum, example: example.type })
  @IsEnum(GoodsTypeEnum)
  @IsOptional()
  readonly type: IGoodsType

  @ApiProperty({ required: false, description: '商品状态', enum: GoodsStatusEnum, example: example.status })
  @IsEnum(GoodsStatusEnum)
  @IsOptional()
  readonly status: IGoodsStatus

  @ApiProperty({ required: false, description: '商品来源', enum: GoodsSourceEnum, example: example.source })
  @IsEnum(GoodsSourceEnum)
  @IsOptional()
  readonly source: IGoodsSource

  @ApiProperty({ required: false, description: '商品视频', example: example.video })
  @IsString()
  @IsOptional()
  readonly video: string

  @ApiProperty({ required: false, type: [String], description: '商品图片', example: example.images })
  @IsString({ each: true })
  @IsOptional()
  readonly images: string[]

  @ApiProperty({ required: false, type: [Number], description: '商品分类', example: example.categories })
  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  readonly categoryIds: number[]

  @ApiProperty({ description: '商品名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ required: false, description: '分享描述', example: example.shareDesc })
  @IsString()
  @IsOptional()
  readonly shareDesc: string

  @ApiProperty({ required: false, description: '商品卖点', example: example.slogan })
  @IsString()
  @IsOptional()
  readonly slogan: string

  @ApiProperty({ required: false, description: '商品标签', example: example.tagId })
  @IsNumber()
  @IsOptional()
  readonly tagId: number

  @ApiProperty({ required: false, description: '商品分组', example: example.groupId })
  @IsNumber()
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '商品品牌', example: example.brandId })
  @IsNumber()
  @IsOptional()
  readonly brandId: number

  @ApiProperty({ required: false, type: [Number], description: '服务保障', example: example.protections })
  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  readonly protectionIds: number[]

  @ApiProperty({ required: false, type: [Number], description: '附加服务', example: example.additions })
  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  readonly additionIds: number[]

  @ApiProperty({ required: false, description: '商品参数模板 ID', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly attributeTemplateId: number

  @ApiProperty({ required: false, type: [GoodsAttributePayload], description: '商品参数', example: example.attributes })
  @Type(() => GoodsAttributePayload)
  @IsOptional()
  readonly attributes: IGoodsAttribute[]

  @ApiProperty({ required: false, type: [String], enum: LogisticsDeliveryModeEnum, description: '商品配送方式', example: example.deliveryModes })
  @IsEnum(LogisticsDeliveryModeEnum, { each: true })
  @IsOptional()
  readonly logisticsDeliveryModes: ILogisticsDeliveryMode[]

  @ApiProperty({ required: false, description: '商品物流运费', example: example.freight })
  @IsNumber()
  @IsOptional()
  readonly logisticsFreight: number

  @ApiProperty({ required: false, description: '商品物流运费模板', example: example.freightTemplateId })
  @IsNumber()
  @IsOptional()
  readonly logisticsFreightTemplateId: number

  @ApiProperty({ required: false, description: '商品物流费用计算方式', enum: GoodsLogisticsFreightChargeModeEnum, example: example.freightChargeMode })
  @IsEnum(GoodsLogisticsFreightChargeModeEnum)
  @IsOptional()
  readonly logisticsFreightChargeMode: IGoodsLogisticsFreightChargeMode

  @ApiProperty({ required: false, description: '商品退货运费承担方', enum: GoodsLogisticsBackFreightByEnum, example: example.backFreightBy })
  @IsEnum(GoodsLogisticsBackFreightByEnum)
  @IsOptional()
  readonly logisticsBackFreightBy: IGoodsLogisticsBackFreightBy

  @ApiProperty({ required: false, description: '商品上架方式', enum: GoodsPublishModeEnum, example: example.publishMode })
  @IsEnum(GoodsPublishModeEnum)
  @IsOptional()
  readonly publishMode: IGoodsPublishMode

  @ApiProperty({ required: false, description: '自定义上架时间', example: example.autoInStockAt })
  @ValidateIf(o => o.publishMode === GoodsPublishModeEnum.AUTO)
  @IsDateString()
  @IsOptional()
  readonly autoInStockAt: string

  @ApiProperty({ required: false, description: '商品购买按钮类型', enum: GoodsBuyBtnTypeEnum, example: example.buyBtnNameType })
  @IsEnum(GoodsBuyBtnTypeEnum)
  @IsOptional()
  readonly buyBtnNameType: IGoodsBuyBtnType

  @ApiProperty({ required: false, description: '商品购买按钮类型', example: example.buyBtnName })
  @IsString()
  @IsOptional()
  readonly buyBtnName: string
}

/**
 * 商品价格库存信息 DTO
 */
export class GoodsStockInfoPayload implements IGoodsStockInfoFormData {
  @ApiProperty({ required: false, description: 'SKU 编码', example: example.skuCode })
  @IsString()
  @IsOptional()
  readonly skuCode: string

  @ApiProperty({ required: false, type: 'float', description: '商品单价', example: example.price })
  @IsNumber()
  @IsOptional()
  readonly price: number

  @ApiProperty({ required: false, type: 'float', description: '商品原价', example: example.originalPrice })
  @IsNumber()
  @IsOptional()
  readonly originalPrice: number

  @ApiProperty({ required: false, type: 'float', description: '商品成本价', example: example.costPrice })
  @IsNumber()
  @IsOptional()
  readonly costPrice: number

  @ApiProperty({ required: false, description: '商品库存', example: example.stock })
  @IsNumber()
  @IsOptional()
  readonly stock: number

  @ApiProperty({ required: false, description: '预警库存', example: example.alertStock })
  @IsNumber()
  @IsOptional()
  readonly alertStock: number

  @ApiProperty({ required: false, type: 'float', description: '商品重量', example: example.weight })
  @IsNumber()
  @IsOptional()
  readonly weight: number

  @ApiProperty({ required: false, type: 'float', description: '商品体积', example: example.volume })
  @IsNumber()
  @IsOptional()
  readonly volume: number

  @ApiProperty({ required: false, description: '商品单位', example: example.unit })
  @IsString()
  @IsOptional()
  readonly unit: string

  @ApiProperty({ required: false, description: '是否开启限购', enum: EnabledEnum, default: EnabledEnum.NO })
  @IsEnum(EnabledEnum)
  @IsOptional()
  readonly enablePurchaseLimits: IEnabled

  @ApiProperty({ required: false, description: '起购数量', example: example.purchaseMinQty })
  @IsNumber()
  @IsOptional()
  readonly purchaseMinQty: number

  @ApiProperty({ required: false, description: '限购数量', example: example.purchaseMaxQty })
  @IsNumber()
  @IsOptional()
  readonly purchaseMaxQty: number

  @ApiProperty({ required: false, description: '库存扣减方式', enum: GoodsStockDeductModeEnum, example: example.stockDeductMode })
  @IsEnum(GoodsStockDeductModeEnum)
  @IsOptional()
  readonly stockDeductMode: IGoodsStockDeductMode

  @ApiProperty({ required: false, description: '是否开启会员折扣', enum: EnabledEnum, default: EnabledEnum.NO })
  @IsEnum(EnabledEnum)
  @IsOptional()
  readonly enableVipDiscount: IEnabled
}

/**
 * 商品多规格价格库存信息 DTO
 */
export class GoodsSkusPayload {
  @ApiProperty({ type: [GoodsSpecPayload], description: '商品规格设置' })
  @Type(() => GoodsSpecPayload)
  readonly skuSpecs: IGoodsSpec[]

  @ApiProperty({ type: [GoodsSkuPayload], description: '商品 SKU' })
  @Type(() => GoodsSkuPayload)
  readonly skus: GoodsSkuPayload[]
}

/**
 * 商品详情 DTO
 */
export class GoodsDetailPayload {
  @ApiProperty({ required: false, description: '商品详情', example: example.detail })
  @IsString()
  @IsOptional()
  readonly detail: string
}

export class BatchUpdateGoodsData
  extends IntersectionType(
    OmitType(GoodsBasicInfoPayload, [
      'type',
      'source',
      'name',
      'shareDesc',
      'slogan',
      'video',
      'images',
      'attributeTemplateId',
      'attributes',
    ] as const),
    OmitType(GoodsStockInfoPayload, [
      'skuCode',
    ] as const),
  ) {}

/**
 * 批量更新商品 DTO
 */
export class BatchUpdateGoodsPayload {
  @ApiProperty({ description: '商品 IDs', example: [nanoid()] })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly ids: string[]

  @ApiProperty({ required: false, type: BatchUpdateGoodsData, description: '商品属性' })
  @Type(() => BatchUpdateGoodsData)
  @IsOptional()
  readonly data: BatchUpdateGoodsData
}
