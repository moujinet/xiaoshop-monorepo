import { type IMemberSource, MemberSourceEnum } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { example } from './example'

/**
 * 创建会员日志 DTO
 */
export class MemberLogPayload {
  @ApiProperty({ description: '会员 ID', example: 1 })
  @IsNumber()
  readonly memberId: number

  @ApiProperty({ description: '日志来源', enum: MemberSourceEnum, example: example.action })
  @IsEnum(MemberSourceEnum)
  @IsNotEmpty()
  readonly source: IMemberSource

  @ApiProperty({ description: '日志操作', example: example.action })
  @IsString()
  @IsNotEmpty()
  readonly action: string

  @ApiProperty({ description: '日志内容', example: example.content })
  @IsString()
  @IsNotEmpty()
  readonly content: string

  @ApiProperty({ type: Object, required: false, description: '额外信息', example: example.extra })
  readonly extra: Record<string, any>
}
