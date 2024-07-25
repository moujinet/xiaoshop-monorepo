import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取商品服务请求 DTO
 */
export class GetGoodsAdditionalRequest {
  @ApiProperty({ description: '商品服务 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除商品参数请求 DTO
 */
export class DeleteGoodsAdditionalRequest {
  @ApiProperty({ description: '商品服务 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
