import { IsArray, IsNumber, IsOptional } from 'class-validator'
import { ApiProperty, OmitType } from '@nestjs/swagger'

/**
 * 绑定会员卡请求 DTO
 */
export class BindMemberCardPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber({}, { message: '会员 ID 必须为数字' })
  readonly memberId: number

  @ApiProperty({ description: '会员卡 ID', example: 1 })
  @IsNumber({}, { message: '会员卡 ID 必须为数字' })
  readonly cardId: number

  @ApiProperty({ required: false, description: '会员卡有效期 ID', example: 1 })
  @IsNumber({}, { message: '会员卡有效期 ID 必须为数字' })
  @IsOptional()
  readonly planId: number
}

/**
 * 批量绑定会员卡请求 DTO
 */
export class BatchBindMemberCardPayload extends OmitType(BindMemberCardPayload, ['memberId']) {
  @ApiProperty({ description: '会员 ID 数组', example: [1, 2] })
  @IsArray({ message: '会员 IDs 必须为数组' })
  @IsNumber({}, { each: true, message: '会员 ID 必须为数字' })
  readonly memberIds: number[]
}
