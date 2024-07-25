import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取商品品牌请求 DTO
 */
export class GetGoodsBrandRequest {
  @ApiProperty({ description: '商品品牌 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除商品品牌请求 DTO
 */
export class DeleteGoodsBrandRequest {
  @ApiProperty({ description: '商品品牌 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
