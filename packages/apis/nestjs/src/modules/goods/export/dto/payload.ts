import {
  GoodsSource,
  GoodsStatus,
  type IGoodsExportConditions,
  type IGoodsSource,
  type IGoodsStatus,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

/**
 * 商品导出请求 DTO
 */
export class GoodsExportPayload implements IGoodsExportConditions {
  @ApiProperty({ description: '商品状态', enum: GoodsStatus, example: GoodsStatus.IN_STOCK })
  @IsEnum(GoodsStatus)
  @IsOptional()
  readonly status: IGoodsStatus

  @ApiProperty({ description: '商品来源', enum: GoodsSource, example: GoodsSource.MANUAL })
  @IsEnum(GoodsSource)
  @IsOptional()
  readonly source: IGoodsSource

  @ApiProperty({ description: '商品分类', example: [1, 2, 3] })
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly categoryIds: number[]

  @ApiProperty({ description: '商品分组', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly groupId: number

  @ApiProperty({ description: '商品品牌', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly brandId: number

  @ApiProperty({ description: '商品标签', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly tagId: number
}
