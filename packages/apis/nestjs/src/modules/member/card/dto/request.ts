import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString } from 'class-validator'

/**
 * 获取会员卡请求 DTO
 */
export class GetMemberCardRequest {
  @ApiProperty({ description: '会员卡 ID', example: 1 })
  @IsNumberString()
  readonly id: number
}

/**
 * 删除会员卡请求 DTO
 */
export class DeleteMemberCardRequest {
  @ApiProperty({ description: '会员卡 ID', example: 1 })
  @IsNumber()
  readonly id: number
}
