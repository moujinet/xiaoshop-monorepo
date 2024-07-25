import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString, IsOptional } from 'class-validator'

/**
 * 获取商品分类列表请求 DTO
 */
export class GetGoodsCategoryListRequest {
  @ApiProperty({ required: false, description: '所属分类 ID', example: 1 })
  @IsNumberString()
  @IsOptional()
  readonly parentId: number
}

/**
 * 获取商品分类请求 DTO
 */
export class GetGoodsCategoryRequest {
  @ApiProperty({ description: '商品分类 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除商品参数请求 DTO
 */
export class DeleteGoodsCategoryRequest {
  @ApiProperty({ description: '商品分类 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
