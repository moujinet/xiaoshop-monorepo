import {
  type IProductAttribute,
  type IProductSkuAttribute,
  LogisticsDeliveryMethod,
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductInventoryDeductMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
  ProductSource,
  ProductStatus,
  ProductType,
  YesOrNo,
} from '@xiaoshop/shared'
import { ArrayNotEmpty, IsArray, IsDateString, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateIf, ValidateNested } from 'class-validator'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { example } from './example'

export class ProductAttributePayload implements IProductAttribute {
  @ApiProperty({ required: true, description: '参数名', example: example.attributes[0].name })
  @IsString({ message: '参数名必须为字符串' })
  readonly name: string

  @ApiProperty({ required: true, description: '参数值', example: example.attributes[0].value })
  readonly value: string[]
}

export class ProductSkuAttributePayload implements IProductSkuAttribute {
  @ApiProperty({ required: true, description: '参数名', example: example.attributes[0].name })
  @IsString({ message: '参数名必须为字符串' })
  @IsNotEmpty({ message: '参数名不能为空' })
  readonly name: string

  @ApiProperty({ required: true, description: '参数值', example: example.attributes[0].value })
  @IsString({ message: '参数值必须为字符串' })
  @IsNotEmpty({ message: '参数值不能为空' })
  readonly value: string
}

export class ProductSkuPayload {
  @ApiProperty({ required: false, description: 'SKU ID', example: example.skus[0].id })
  @IsNumber({}, { message: 'SKU ID 必须为数字' })
  @IsOptional()
  readonly id?: number

  @ApiProperty({ required: false, description: 'SKU 编码', example: example.skus[0].skuCode })
  @IsString({ message: 'SKU 编码必须为字符串' })
  @IsOptional()
  readonly skuCode: string

  @ApiProperty({ description: 'SKU 名称', example: example.skus[0].name })
  @IsString({ message: 'SKU 名称必须为字符串' })
  @IsNotEmpty({ message: 'SKU 名称不能为空' })
  readonly name: string

  @ApiProperty({ description: 'SKU 属性', example: example.skus[0].attributes })
  @ValidateNested({ message: 'SKU 属性格式不正确' })
  @Type(() => ProductSkuAttributePayload)
  @IsArray({ message: 'SKU 属性必须为数组' })
  readonly attributes: ProductSkuAttributePayload[]

  @ApiProperty({ required: false, description: 'SKU 图片', example: example.skus[0].image })
  @IsString({ message: 'SKU 图片必须为字符串' })
  @IsOptional()
  readonly image?: string

  @ApiProperty({ description: '单价', example: example.skus[0].price })
  @IsNumber({}, { message: '单价必须为数字' })
  @Min(0, { message: '单价不能小于 0' })
  readonly price: number

  @ApiProperty({ description: '原价', example: example.skus[0].originalPrice })
  @IsNumber({}, { message: '原价必须为数字' })
  @Min(0, { message: '原价不能小于 0' })
  readonly originalPrice: number

  @ApiProperty({ description: '成本价', example: example.skus[0].costPrice })
  @IsNumber({}, { message: '成本价必须为数字' })
  @Min(0, { message: '成本价不能小于 0' })
  readonly costPrice: number

  @ApiProperty({ description: '库存', example: example.skus[0].inventory })
  @IsNumber({}, { message: '库存必须为数字' })
  @Min(0, { message: '库存不能小于 0' })
  readonly inventory: number

  @ApiProperty({ description: '预警库存', example: example.skus[0].inventoryEarlyWarning })
  @IsNumber({}, { message: '预警库存必须为数字' })
  @Min(0, { message: '预警库存不能小于 0' })
  readonly inventoryEarlyWarning: number

  @ApiProperty({ description: '重量', example: example.skus[0].weight })
  @IsNumber({}, { message: '重量必须为数字' })
  @Min(0, { message: '重量不能小于 0' })
  readonly weight: number

  @ApiProperty({ description: '体积', example: example.skus[0].volume })
  @IsNumber({}, { message: '体积必须为数字' })
  @Min(0, { message: '体积不能小于 0' })
  readonly volume: number

  @ApiProperty({ required: false, description: '单位', example: example.skus[0].unit })
  @IsString({ message: '单位必须为字符串' })
  @IsOptional()
  readonly unit?: string
}

export class ProductPayload {
  @ApiProperty({ required: false, description: '商品类型', enum: ProductType, example: example.type })
  @IsNumber({}, { message: '商品类型不正确' })
  @IsOptional()
  readonly type?: ProductType

  @ApiProperty({ required: false, description: '商品来源', enum: ProductSource, example: example.source })
  @IsNumber({}, { message: '商品来源不正确' })
  @IsOptional()
  readonly source?: ProductSource

  @ApiProperty({ type: [ProductSkuPayload], description: '商品 SKU', example: example.skus })
  @ValidateNested({ message: '商品 SKU 信息格式不正确' })
  @Type(() => ProductSkuPayload)
  @ArrayNotEmpty({ message: '商品 SKU 信息不能为空' })
  readonly skus: ProductSkuPayload[]

  @ApiProperty({ required: false, type: [Number], description: '商品分类', example: [1, 2] })
  @IsNumber({}, { each: true, message: '商品分类必须为数字' })
  @IsArray({ message: '商品分类必须为数组' })
  @IsOptional()
  readonly categoryIds?: number[]

  @ApiProperty({ required: false, description: '商品标签', example: 1 })
  @IsNumber({}, { message: '商品标签必须为数字' })
  @Min(0, { message: '商品标签不能小于 0' })
  @IsOptional()
  readonly tagId?: number

  @ApiProperty({ required: false, description: '商品分组', example: 1 })
  @IsNumber({}, { message: '商品分组必须为数字' })
  @Min(0, { message: '商品分组不能小于 0' })
  @IsOptional()
  readonly groupId?: number

  @ApiProperty({ required: false, description: '商品品牌', example: 1 })
  @IsNumber({}, { message: '商品品牌必须为数字' })
  @Min(0, { message: '商品品牌不能小于 0' })
  @IsOptional()
  readonly brandId?: number

  @ApiProperty({ description: '商品名称', example: example.name })
  @IsString({ message: '商品名称必须为字符串' })
  @IsNotEmpty({ message: '商品名称不能为空' })
  @MaxLength(100, { message: '商品名称不能超过 100 个字符' })
  readonly name: string

  @ApiProperty({ required: false, description: '商品分享描述', example: example.desc })
  @IsString({ message: '商品分享描述必须为字符串' })
  @MaxLength(36, { message: '商品分享描述不能超过 36 个字符' })
  @IsOptional()
  readonly desc?: string

  @ApiProperty({ required: false, description: '商品卖点', example: example.slogan })
  @IsString({ message: '商品卖点必须为字符串' })
  @MaxLength(60, { message: '商品卖点不能超过 60 个字符' })
  @IsOptional()
  readonly slogan?: string

  @ApiProperty({ description: '商品图片', example: example.images })
  @IsString({ each: true, message: '商品图片必须为字符串' })
  @IsArray({ message: '商品图片必须为数组' })
  @ArrayNotEmpty({ message: '商品图片不能为空' })
  readonly images: string[]

  @ApiProperty({ required: false, description: '商品视频', example: example.video })
  @IsString({ message: '商品视频必须为字符串' })
  @IsOptional()
  readonly video?: string

  @ApiProperty({ required: false, description: '商品参数', example: example.attributes })
  @ValidateNested({ message: '商品参数信息格式不正确' })
  @Type(() => ProductAttributePayload)
  @IsOptional()
  readonly attributes?: ProductAttributePayload[]

  @ApiProperty({ required: false, description: '商品服务承诺', example: 1 })
  @IsNumber({}, { each: true, message: '商品服务承诺必须为数字' })
  @Min(0, { each: true, message: '商品服务承诺不能小于 0' })
  @IsOptional()
  readonly commitmentIds?: number[]

  @ApiProperty({ required: false, description: '商品附加服务', example: 1 })
  @IsNumber({}, { each: true, message: '商品附加服务必须为数字' })
  @Min(0, { each: true, message: '商品附加服务不能小于 0' })
  @IsOptional()
  readonly additionIds?: number[]

  @ApiProperty({ required: false, description: '是否开启会员折扣', enum: YesOrNo, example: example.enableVipDiscount })
  @IsNumber({}, { message: '是否开启会员折扣格式不正确' })
  @IsOptional()
  readonly enableVipDiscount?: YesOrNo

  @ApiProperty({ required: false, description: '是否开启限购', enum: YesOrNo, example: example.enablePurchaseLimits })
  @IsNumber({}, { message: '是否开启限购格式不正确' })
  @IsOptional()
  readonly enablePurchaseLimits?: YesOrNo

  @ApiProperty({ required: false, description: '限购数量', example: example.purchaseMaxQty })
  @ValidateIf(o => o.purchaseMaxQty === YesOrNo.YES)
  @IsNumber({}, { message: '限购数量必须为数字' })
  @Min(0, { message: '限购数量不能小于 0' })
  readonly purchaseMaxQty?: number

  @ApiProperty({ description: '最低购买数量', example: example.purchaseMinQty })
  @IsNumber({}, { message: '最低购买数量必须为数字' })
  @Min(1, { message: '最低购买数量不能小于 1' })
  readonly purchaseMinQty: number

  @ApiProperty({ required: false, description: '库存扣减模式', enum: ProductInventoryDeductMode, example: example.inventoryDeductMode })
  @IsNumber({}, { message: '库存扣减模式不正确' })
  @IsOptional()
  readonly inventoryDeductMode: ProductInventoryDeductMode

  @ApiProperty({ description: '发货方式', example: example.deliveryMethods })
  @IsNumber({}, { each: true, message: '发货方式格式不正确' })
  @IsArray({ message: '发货方式必须为数组' })
  @ArrayNotEmpty({ message: '发货方式不能为空' })
  readonly deliveryMethods: LogisticsDeliveryMethod[]

  @ApiProperty({ required: false, description: '运费计算方式', enum: ProductFreightChargeMode, example: example.freightChargeMode })
  @IsNumber({}, { message: '运费计算方式不正确' })
  @IsOptional()
  readonly freightChargeMode: ProductFreightChargeMode

  @ApiProperty({ required: false, description: '统一运费', example: example.freight })
  @ValidateIf(o => o.freightChargeMode === ProductFreightChargeMode.STD)
  @IsNumber({}, { message: '统一运费必须为数字' })
  @Min(0, { message: '统一运费不能小于 0' })
  readonly freight?: number

  @ApiProperty({ required: false, description: '运费模板', example: example.freightTemplateId })
  @ValidateIf(o => o.freightChargeMode === ProductFreightChargeMode.TEMPLATE)
  @IsNumber({}, { message: '运费模板必须为数字' })
  @Min(0, { message: '运费模板不能小于 0' })
  readonly freightTemplateId?: number

  @ApiProperty({ required: false, description: '退货运费承担方', enum: ProductReturnsFreightBy, example: example.returnsFreightBy })
  @IsNumber({}, { message: '退货运费承担方不正确' })
  @IsOptional()
  readonly returnsFreightBy?: ProductReturnsFreightBy

  @ApiProperty({ required: false, description: '发布方式', enum: ProductPublishMode, example: example.publishMode })
  @IsNumber({}, { message: '发布方式不正确' })
  @IsOptional()
  readonly publishMode?: ProductPublishMode

  @ApiProperty({ required: false, description: '自动上架时间', example: example.autoInStockAt })
  @ValidateIf(o => o.publishMode === ProductPublishMode.AUTO)
  @IsDateString({}, { message: '自动上架时间格式不正确' })
  @IsNotEmpty({ message: '自动上架时间不能为空' })
  readonly autoInStockAt?: string

  @ApiProperty({ required: false, description: '商品购买按钮类型', enum: ProductBuyBtnType, example: example.buyBtnNameType })
  @IsNumber({}, { message: '商品购买按钮类型不正确' })
  @IsOptional()
  readonly buyBtnNameType?: ProductBuyBtnType

  @ApiProperty({ required: false, description: '购买按钮名称', example: example.buyBtnName })
  @ValidateIf(o => o.buyBtnNameType === ProductBuyBtnType.CUSTOM)
  @IsString({ message: '购买按钮名称必须为字符串' })
  @IsNotEmpty({ message: '购买按钮名称不能为空' })
  readonly buyBtnName?: string

  @ApiProperty({ required: false, description: '商品详情', example: example.detail })
  @IsString({ message: '商品详情必须为字符串' })
  @IsOptional()
  readonly detail?: string

  @ApiProperty({ required: false, description: '商品排序', example: example.sort })
  @IsNumber({}, { message: '商品排序必须为数字' })
  @Min(1, { message: '商品排序不能小于 1' })
  @IsOptional()
  readonly sort?: number
}

export class UpdateProductPropertiesPayload
  extends PickType(ProductPayload, [
    'categoryIds',
    'groupId',
    'brandId',
    'tagId',
    'additionIds',
    'commitmentIds',
    'enablePurchaseLimits',
    'enableVipDiscount',
    'purchaseMaxQty',
    'purchaseMinQty',
    'inventoryDeductMode',
    'deliveryMethods',
    'freightChargeMode',
    'freight',
    'freightTemplateId',
    'returnsFreightBy',
    'buyBtnNameType',
    'buyBtnName',
  ] as const) {}

export class UpdateProductSkusPayload
  extends PickType(ProductPayload, ['skus'] as const) {}

export class BatchUpdateProductPropertiesPayload {
  @ApiProperty({ description: '商品 ID 列表', example: [1, 2] })
  @IsNumber({}, { each: true, message: '商品 ID 必须为数字' })
  @ArrayNotEmpty({ message: '商品 ID 列表不能为空' })
  @IsArray({ message: '商品 ID 必须为数组' })
  readonly ids: number[]

  @ApiProperty({ description: '更新商品信息', type: UpdateProductPropertiesPayload })
  @Type(() => UpdateProductPropertiesPayload)
  @IsNotEmptyObject({}, { message: '更新商品信息不能为空' })
  readonly data: UpdateProductPropertiesPayload
}

export class BatchUpdateProductStatusPayload {
  @ApiProperty({ description: '商品 ID 列表', example: [1, 2] })
  @IsNumber({}, { each: true, message: '商品 ID 必须为数字' })
  @ArrayNotEmpty({ message: '商品 ID 列表不能为空' })
  @IsArray({ message: '商品 ID 必须为数组' })
  readonly ids: number[]

  @ApiProperty({ required: false, description: '商品状态', enum: ProductStatus, example: example.status })
  @IsEnum(ProductStatus, { message: '商品状态不正确' })
  @IsOptional()
  readonly status?: ProductStatus
}
