import {
  type IPointsChangeType,
  PointsChangeType,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { example } from './example'

/**
 * 会员积分变更 DTO
 */
export class PointsChangePayload {
  @ApiProperty({ description: '变更类型', enum: PointsChangeType, example: example.type })
  @IsEnum(PointsChangeType, { message: '变更类型错误' })
  @IsNotEmpty({ message: '变更类型不能为空' })
  readonly type: IPointsChangeType

  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber({}, { message: '会员 ID 必须为数字' })
  readonly memberId: number

  @ApiProperty({ description: '变化积分', example: example.change })
  @IsNumber({}, { message: '变化积分必须为数字' })
  @Min(0)
  readonly change: number

  @ApiProperty({ description: '变更原因', example: example.reason })
  @IsNotEmpty({ message: '变更原因不能为空' })
  @IsString()
  readonly reason: string
}
