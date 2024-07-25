import { type IMemberLogType, MemberLogTypeEnum } from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { example } from './example'

/**
 * 获取会员日志分页列表请求 DTO
 */
export class GetMemberLogPagesRequest {
  @ApiProperty({ description: '日志类型', enum: MemberLogTypeEnum, example: example.type })
  @IsEnum(MemberLogTypeEnum)
  @IsNotEmpty()
  readonly type: IMemberLogType
}
