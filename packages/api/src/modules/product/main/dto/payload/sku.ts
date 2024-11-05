import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator'

/**
 * Product Sku Attribute Payload
 */
export class ProductSkuAttributePayload {
  @IsString({ message: 'SKU 属性名称不正确' })
  @IsNotEmpty({ message: 'SKU 属性名称不能为空' })
  readonly name: string

  @IsString({ message: 'SKU 属性值不正确' })
  @IsNotEmpty({ message: 'SKU 属性值不能为空' })
  readonly value: string
}

/**
 * Product Sku Payload
 */
export class ProductSkuPayload {
  @IsNumber({}, { message: '商品 ID 不正确' })
  @IsOptional()
  readonly productId?: number

  @IsString({ message: '商品云链 ID 不正确' })
  @IsOptional()
  readonly productConnectId?: string

  @IsString({ message: 'SKU 编码不正确' })
  @IsOptional()
  readonly skuCode?: string

  @IsString({ message: 'SKU 名称不正确' })
  @IsNotEmpty({ message: 'SKU 名称不能为空' })
  readonly name?: string

  @IsString({ message: 'SKU 图片不正确' })
  @IsOptional()
  readonly image?: string

  @Type(() => ProductSkuAttributePayload)
  @IsArray({ message: 'SKU 属性不正确' })
  @ArrayNotEmpty({ message: 'SKU 属性不能为空' })
  @ValidateNested({ each: true })
  readonly attributes: ProductSkuAttributePayload[]

  @IsNumber({}, { message: '价格不正确' })
  @Min(0, { message: '价格不正确' })
  readonly price: number

  @IsNumber({}, { message: '原价不正确' })
  @IsOptional()
  readonly originalPrice?: number

  @IsNumber({}, { message: '成本价不正确' })
  @IsOptional()
  readonly costPrice?: number

  @IsNumber({}, { message: '库存不正确' })
  @Min(0, { message: '库存不正确' })
  readonly quantity: number

  @IsNumber({}, { message: '库存预警值不正确' })
  @IsOptional()
  readonly threshold?: number

  @IsNumber({}, { message: '重量不正确' })
  @IsOptional()
  readonly weight?: number

  @IsNumber({}, { message: '体积不正确' })
  @IsOptional()
  readonly volume?: number

  @IsString({ message: '单位不正确' })
  @IsOptional()
  readonly unit?: string
}

/**
 * Product Skus Payload
 */
export class ProductSkusPayload {
  @Type(() => ProductSkuPayload)
  @IsArray({ message: 'SKU 不正确' })
  @ArrayNotEmpty({ message: 'SKU 不能为空' })
  @ValidateNested({ each: true })
  readonly skus: ProductSkuPayload[]
}
