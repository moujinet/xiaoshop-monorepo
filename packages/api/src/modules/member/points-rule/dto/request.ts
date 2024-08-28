import {
  type IMemberPointsRuleKey,
  MemberPointsRuleKey,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'

/**
 * 获取会员积分规则请求 DTO
 */
export class GetMemberPointsRuleRequest {
  @ApiProperty({ description: '会员积分规则标识', enum: MemberPointsRuleKey })
  @IsEnum(MemberPointsRuleKey, { message: '会员积分规则标识不正确' })
  @IsNotEmpty({ message: '会员积分规则标识不能为空' })
  readonly key: IMemberPointsRuleKey
}
