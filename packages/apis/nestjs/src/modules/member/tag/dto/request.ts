import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取会员标签请求 DTO
 */
export class GetMemberTagRequest {
  @ApiProperty({ description: '会员标签 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除会员标签请求 DTO
 */
export class DeleteMemberTagRequest {
  @ApiProperty({ description: '会员标签 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
