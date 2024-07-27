import {
  GoodsSource,
  GoodsStatus,
  type IGoodsSource,
  type IGoodsStatus,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'
import { example } from './example'
import { PaginationQueryDto } from '~/common'
import { nanoid } from '~/utils'

/**
 * 获取商品分页列表请求 DTO
 */
export class GetGoodsPagesRequest extends PaginationQueryDto {
  @ApiProperty({ required: false, description: '商品状态', enum: GoodsStatus, example: example.status })
  @IsEnum(GoodsStatus)
  @IsOptional()
  readonly status: IGoodsStatus

  @ApiProperty({ required: false, description: '商品名称', example: example.name })
  @IsString()
  @IsOptional()
  readonly name: string

  @ApiProperty({ required: false, description: '商品 SKU', example: example.skuCode })
  @IsString()
  @IsOptional()
  readonly skuCode: string

  @ApiProperty({ required: false, description: '商品分类 ID', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly categoryId: number

  @ApiProperty({ required: false, description: '商品分组 ID', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ required: false, description: '商品品牌 ID', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly brandId: number

  @ApiProperty({ required: false, description: '商品标签 ID', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly tagId: number

  @ApiProperty({ required: false, description: '商品来源', enum: GoodsSource, example: example.source })
  @IsEnum(GoodsSource)
  @IsOptional()
  readonly source: IGoodsSource

  @ApiProperty({ required: false, description: '商品价格', example: '10,20' })
  @IsString()
  @IsOptional()
  readonly price: string

  @ApiProperty({ required: false, description: '商品库存', example: '10,20' })
  @IsString()
  @IsOptional()
  readonly inventory: string

  @ApiProperty({ required: false, description: '商品销量', example: '10,20' })
  @IsString()
  @IsOptional()
  readonly sales: string

  @ApiProperty({ required: false, description: '上架时间', example: '2000-01-01,2000-01-02' })
  @IsString()
  @IsOptional()
  readonly inStockTime: string

  @ApiProperty({ required: false, description: '下架时间', example: '2000-01-01,2000-01-02' })
  @IsString()
  @IsOptional()
  readonly stockedTime: string

  @ApiProperty({ required: false, description: '发布时间', example: '2000-01-01,2000-01-02' })
  @IsString()
  @IsOptional()
  readonly createdTime: string
}

/**
 * 获取商品请求 DTO
 */
export class GetGoodsRequest {
  @ApiProperty({ description: '商品 ID', example: nanoid() })
  @IsString()
  @IsNotEmpty()
  readonly id: string
}

/**
 * 复制商品请求 DTO
 */
export class CloneGoodsRequest {
  @ApiProperty({ description: '商品 ID', example: nanoid() })
  @IsString()
  @IsNotEmpty()
  readonly id: string
}

/**
 * 删除商品请求 DTO
 */
export class DeleteGoodsRequest {
  @ApiProperty({ description: '商品 ID', example: nanoid() })
  @IsString()
  @IsNotEmpty()
  readonly id: string
}

/**
 * 批量删除商品请求 DTO
 */
export class DeleteBatchGoodsRequest {
  @ApiProperty({ type: [String], description: '商品 IDs', example: [nanoid()] })
  @IsString({ each: true })
  @IsNotEmpty()
  readonly ids: string[]
}

/**
 * 批量商品请求 DTO
 */
export class GetBatchGoodsRequest {
  @ApiProperty({ type: [String], description: '商品 IDs', example: [nanoid()] })
  @IsString({ each: true })
  @IsNotEmpty()
  readonly ids: string[]
}
