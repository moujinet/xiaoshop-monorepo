import {
  type IProductExportConditions,
  type IProductSource,
  type IProductStatus,
  type IProductType,
  ProductSource,
  ProductStatus,
  ProductType,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsNumber, IsOptional, Min } from 'class-validator'

export class ProductExportConditionsPayload implements IProductExportConditions {
  @ApiProperty({ required: false, description: '商品类型', enum: ProductType })
  @IsEnum(ProductType, { message: '商品类型不正确' })
  @IsOptional()
  readonly type: IProductType

  @ApiProperty({ required: false, description: '商品状态', enum: ProductStatus })
  @IsEnum(ProductStatus, { message: '商品状态不正确' })
  @IsOptional()
  readonly status: IProductStatus

  @ApiProperty({ required: false, description: '商品来源', enum: ProductSource })
  @IsEnum(ProductSource, { message: '商品来源不正确' })
  @IsOptional()
  readonly source: IProductSource

  @ApiProperty({ required: false, type: [Number], description: '商品分类' })
  @IsNumber({}, { each: true, message: '商品分类必须为数字' })
  @IsArray({ message: '商品分类必须为数组' })
  @IsOptional()
  readonly categoryIds: number[]

  @ApiProperty({ required: false, type: [Number], description: '商品标签' })
  @IsNumber({}, { each: true, message: '商品标签必须为数字' })
  @Min(0, { each: true, message: '商品标签不能小于 0' })
  @IsArray({ message: '商品标签必须为数组' })
  @IsOptional()
  readonly tagIds: number[]

  @ApiProperty({ required: false, type: [Number], description: '商品分组' })
  @IsNumber({}, { each: true, message: '商品分组必须为数字' })
  @Min(0, { each: true, message: '商品分组不能小于 0' })
  @IsArray({ message: '商品分组必须为数组' })
  @IsOptional()
  readonly groupIds: number[]

  @ApiProperty({ required: false, type: [Number], description: '商品品牌' })
  @IsNumber({}, { each: true, message: '商品品牌必须为数字' })
  @Min(0, { each: true, message: '商品品牌不能小于 0' })
  @IsArray({ message: '商品品牌必须为数组' })
  @IsOptional()
  readonly brandIds: number[]
}
