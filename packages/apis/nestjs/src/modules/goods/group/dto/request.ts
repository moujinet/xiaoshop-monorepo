import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取商品分组请求 DTO
 */
export class GetGoodsGroupRequest {
  @ApiProperty({ description: '商品分组 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除商品分组请求 DTO
 */
export class DeleteGoodsGroupRequest {
  @ApiProperty({ description: '商品分组 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
