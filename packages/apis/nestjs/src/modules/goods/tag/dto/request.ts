import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取标签请求 DTO
 */
export class GetGoodsTagRequest {
  @ApiProperty({ description: '标签 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除标签请求 DTO
 */
export class DeleteGoodsTagRequest {
  @ApiProperty({ description: '标签 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
