import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional } from 'class-validator'

/**
 * 绑定会员卡请求 DTO
 */
export class BindMemberCardPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  readonly memberId: number

  @ApiProperty({ description: '会员卡 ID', example: 1 })
  @IsNumber()
  readonly cardId: number

  @ApiProperty({ required: false, description: '会员卡有效期 ID', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly planId: number
}

/**
 * 批量绑定会员卡请求 DTO
 */
export class BatchBindMemberCardPayload extends OmitType(BindMemberCardPayload, ['memberId']) {
  @ApiProperty({ description: '会员 ID 数组', example: [1, 2] })
  @IsArray()
  @IsNumber({}, { each: true })
  readonly memberIds: number[]
}
