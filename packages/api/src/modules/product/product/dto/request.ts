import {
  ProductSource,
  YesOrNo,
} from '@xiaoshop/shared'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'
import { PaginationRequest } from '~/common/dto'

enum ProductStatusAndWarning {
  ON_SALE = 1,
  STOCKED = 2,
  SOLD_OUT = 3,
  DRAFT = 4,
  WARNING = 5,
}

export class GetProductPagesRequest extends PaginationRequest {
  @ApiProperty({ required: false, description: '商品是否删除', enum: YesOrNo, example: 'N' })
  @IsNumberString({}, { message: '商品是否删除不正确' })
  @IsOptional()
  readonly isDeleted: YesOrNo

  @ApiProperty({ required: false, description: '商品状态', enum: ProductStatusAndWarning, example: example.status })
  @IsNumberString({}, { message: '商品状态不正确' })
  @IsOptional()
  readonly status: ProductStatusAndWarning

  @ApiProperty({ required: false, description: '商品名称', example: example.name })
  @IsString({ message: '商品名称不正确' })
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '商品 SKU 编码', example: '111-1111-1111' })
  @IsString({ message: '商品 SKU 编码不正确' })
  @IsOptional()
  readonly skuCode: string

  @ApiProperty({ required: false, description: '商品分类 ID', example: 1 })
  @IsNumberString({}, { message: '商品分类 ID 不正确' })
  @IsOptional()
  readonly categoryId: number

  @ApiProperty({ required: false, description: '商品分组 ID', example: 1 })
  @IsNumberString({}, { message: '商品分组 ID 不正确' })
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '商品品牌 ID', example: 1 })
  @IsNumberString({}, { message: '商品品牌 ID 不正确' })
  @IsOptional()
  readonly brandId: number

  @ApiProperty({ required: false, description: '商品标签 ID', example: 1 })
  @IsNumberString({}, { message: '商品标签 ID 不正确' })
  @IsOptional()
  readonly tagId: number

  @ApiProperty({ required: false, description: '商品来源', enum: ProductSource, example: example.source })
  @IsNumberString({}, { message: '商品来源不正确' })
  @IsOptional()
  readonly source: ProductSource

  @ApiProperty({ required: false, description: '商品价格', example: '10,20' })
  @IsString({ message: '商品价格不正确' })
  @IsOptional()
  readonly price: string

  @ApiProperty({ required: false, description: '商品库存', example: '10,20' })
  @IsString({ message: '商品库存不正确' })
  @IsOptional()
  readonly inventory: string

  @ApiProperty({ required: false, description: '商品销量', example: '10,20' })
  @IsString({ message: '商品销量不正确' })
  @IsOptional()
  readonly sales: string

  @ApiProperty({ required: false, description: '上架时间', example: '2000-01-01,2000-01-02' })
  @IsString({ message: '上架时间不正确' })
  @IsOptional()
  readonly onSaleTime: string

  @ApiProperty({ required: false, description: '下架时间', example: '2000-01-01,2000-01-02' })
  @IsString({ message: '下架时间不正确' })
  @IsOptional()
  readonly stockedTime: string

  @ApiProperty({ required: false, description: '发布时间', example: '2000-01-01,2000-01-02' })
  @IsString({ message: '发布时间不正确' })
  @IsOptional()
  readonly createdTime: string
}

export class GetProductRequest {
  @ApiProperty({ description: '商品 ID', example: 1 })
  @IsNumberString({}, { message: '商品 ID 不正确' })
  @IsNotEmpty({ message: '商品 ID 不能为空' })
  readonly id: number
}

export class GetProductPostRequest {
  @ApiProperty({ description: '商品 ID', example: 1 })
  @IsNumber({}, { message: '商品 ID 不正确' })
  readonly id: number
}

export class GetProductsPostRequest {
  @ApiProperty({ description: '商品 IDs', example: [1, 2] })
  @IsNumber({}, { each: true, message: '商品 ID 不正确' })
  readonly ids: number[]
}
