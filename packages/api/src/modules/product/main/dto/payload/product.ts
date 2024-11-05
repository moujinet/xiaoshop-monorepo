import type {
  LogisticDeliveryMethod,
  ProductBuyBtnType,
  ProductFreightChargeMode,
  ProductPublishMode,
  ProductReturnsFreightBy,
  ProductSource,
  ProductType,
  YesOrNo,
} from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator'

import { ProductSkusPayload } from './sku'
import { ProductAttributePayload } from './attribute'

/**
 * Product Property Payload
 */
export class ProductPropertyPayload {
  @IsNumber({}, { message: '商品品牌不正确' })
  @IsOptional()
  readonly brandId?: number

  @IsNumber({}, { each: true, message: '商品分类不正确' })
  @IsArray({ message: '商品分类不正确' })
  @ArrayNotEmpty({ message: '商品分类不能为空' })
  @ArrayMinSize(1, { message: '商品分类不能少于 1 个' })
  @ArrayMaxSize(3, { message: '商品分类不能超过 3 个' })
  readonly categoryIds: number[]

  @IsNumber({}, { each: true, message: '商品标签不正确' })
  @IsArray({ message: '商品标签不正确' })
  @IsOptional()
  readonly tagIds?: number[]

  @IsNumber({}, { each: true, message: '商品分组不正确' })
  @IsArray({ message: '商品分组不正确' })
  @IsOptional()
  readonly groupIds?: number[]

  @IsNumber({}, { message: '商品附加服务不正确' })
  @IsOptional()
  readonly additionIds?: number[]

  @IsNumber({}, { message: '商品服务保障不正确' })
  @IsOptional()
  readonly extraIds?: number[]

  @IsNumber({}, { message: '是否开启会员折扣不正确' })
  @IsOptional()
  readonly isEnableVipDiscount?: YesOrNo

  @IsNumber({}, { message: '是否开启限购不正确' })
  @IsOptional()
  readonly isEnableLimits?: YesOrNo

  @IsNumber({}, { message: '限购数量不正确' })
  @IsOptional()
  readonly limitsMaxQty?: number

  @IsNumber({}, { message: '最低购买数量不正确' })
  @IsOptional()
  readonly limitsMinQty?: number

  @IsNumber({}, { message: '买按钮名称类型不正确' })
  @IsOptional()
  readonly buyBtnNameType?: ProductBuyBtnType

  @IsString({ message: '购买按钮名称不正确' })
  @IsOptional()
  readonly buyBtnName?: string

  @IsNumber({}, { each: true, message: '发货方式不正确' })
  @IsOptional()
  readonly deliveryMethods?: LogisticDeliveryMethod[]

  @IsNumber({}, { message: '运费计算方式不正确' })
  @IsOptional()
  readonly freightChargeMode?: ProductFreightChargeMode

  @IsNumber({}, { message: '统一运费不正确' })
  @IsOptional()
  readonly freight?: number

  @IsNumber({}, { message: '运费模板不正确' })
  @IsOptional()
  readonly freightTemplateId?: number

  @IsNumber({}, { message: '退货运费承担方不正确' })
  @IsOptional()
  readonly returnsFreightBy?: ProductReturnsFreightBy

  @IsNumber({}, { message: '发布模式不正确' })
  @IsOptional()
  readonly publishMode?: ProductPublishMode

  @IsString({ message: '自动上架时间不正确' })
  @IsOptional()
  readonly autoOnSaleAt?: string
}

/**
 * Create Product
 */
export class CreateProductPayload extends IntersectionType(
  ProductPropertyPayload,
  ProductSkusPayload,
) {
  @IsNumber({}, { message: '商品类型不正确' })
  @IsOptional()
  readonly type?: ProductType

  @IsNumber({}, { message: '商品来源不正确' })
  @IsOptional()
  readonly source?: ProductSource

  @IsString({ message: '商品名称不正确' })
  @IsNotEmpty({ message: '商品名称不能为空' })
  @MaxLength(100, { message: '商品名称不能超过 100 个字符' })
  readonly name: string

  @IsString({ message: '商品描述不正确' })
  @MaxLength(36, { message: '商品描述不能超过 36 个字符' })
  @IsOptional()
  readonly desc?: string

  @IsString({ message: '商品卖点不正确' })
  @MaxLength(60, { message: '商品卖点不能超过 60 个字符' })
  @IsOptional()
  readonly slogan?: string

  @IsString({ each: true, message: '商品图片不正确' })
  @IsArray({ message: '商品图片不正确' })
  @ArrayNotEmpty({ message: '商品图片不能为空' })
  @ArrayMinSize(1, { message: '商品图片不能少于 1 个' })
  @ArrayMaxSize(15, { message: '商品图片不能超过 15 个' })
  readonly images: string[]

  @IsString({ message: '商品视频不正确' })
  @IsOptional()
  readonly video?: string

  @IsNumber({}, { message: '商品排序不正确' })
  @IsOptional()
  readonly sort?: number

  @Type(() => ProductAttributePayload)
  @IsArray({ message: '商品参数不正确' })
  @ValidateNested({ each: true })
  @IsOptional()
  readonly attributes?: ProductAttributePayload[]

  @IsString({ message: '商品内容不正确' })
  @IsOptional()
  readonly content?: string
}

/**
 * Update Product
 */
export class UpdateProductPayload extends PartialType(CreateProductPayload) {}

/**
 * Update Product Properties
 */
export class UpdateProductPropertyPayload {
  @IsNumber({}, { each: true, message: '商品属性 ID 不正确' })
  @IsArray({ message: '商品属性 ID 不正确' })
  @ArrayNotEmpty({ message: '商品属性 ID 不能为空' })
  readonly ids: number[]

  @Type(() => ProductPropertyPayload)
  @IsObject({ message: '商品属性不正确' })
  @IsNotEmptyObject({}, { message: '商品属性不能为空' })
  @ValidateNested()
  readonly properties: ProductPropertyPayload
}
