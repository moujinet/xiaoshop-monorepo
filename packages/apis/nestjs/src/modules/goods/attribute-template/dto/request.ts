import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取商品参数模板请求 DTO
 */
export class GetGoodsAttributeTemplateRequest {
  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除商品参数请求 DTO
 */
export class DeleteGoodsAttributeTemplateRequest {
  @ApiProperty({ description: '商品参数模板 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
