import { IsNumber, IsNumberString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取会员卡请求 DTO
 */
export class GetMemberCardRequest {
  @ApiProperty({ description: '会员卡 ID', example: 1 })
  @IsNumberString({}, { message: '会员卡 ID 必须为数字' })
  readonly id: number
}

/**
 * 删除会员卡请求 DTO
 */
export class DeleteMemberCardRequest {
  @ApiProperty({ description: '会员卡 ID', example: 1 })
  @IsNumber({}, { message: '会员卡 ID 必须为数字' })
  readonly id: number
}
