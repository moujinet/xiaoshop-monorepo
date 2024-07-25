import {
  type IMemberLogExtra,
  type IMemberLogType,
  type IMemberSource,
  MemberLogTypeEnum,
  MemberSourceEnum,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 获取会员日志响应 DTO
 */
export class MemberLogResponse {
  @ApiProperty({ description: '会员日志 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '日志类型', enum: MemberLogTypeEnum, example: example.type })
  readonly type: IMemberLogType

  @ApiProperty({ description: '日志来源', enum: MemberSourceEnum, example: example.source })
  readonly source: IMemberSource

  @ApiProperty({ description: '日志操作', example: example.action })
  readonly action: string

  @ApiProperty({ description: '日志内容', example: example.content })
  readonly content: string

  @ApiProperty({ type: Object, required: false, description: '额外信息', example: example.extra })
  readonly extra: IMemberLogExtra

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string
}
