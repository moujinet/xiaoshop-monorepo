import {
  type IMemberPointsLogChangeType,
  MemberPointsLogChangeType,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 * 创建会员积分日志 DTO
 */
export class MemberPointsLogPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  readonly memberId: number

  @ApiProperty({ description: '变更类型', enum: MemberPointsLogChangeType, example: 'set' })
  @IsEnum(MemberPointsLogChangeType)
  @IsNotEmpty()
  readonly type: IMemberPointsLogChangeType

  @ApiProperty({ description: '积分变化', example: 100 })
  @IsNumber()
  readonly change: number

  @ApiProperty({ description: '变化原因', example: '购买商品' })
  @IsString()
  @IsNotEmpty()
  readonly reason: string
}
