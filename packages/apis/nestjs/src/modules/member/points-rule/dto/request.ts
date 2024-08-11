import { ApiProperty } from '@nestjs/swagger'
import { IMemberPointsRuleKey, MemberPointsRuleKey } from '@xiaoshop/schema'
import { IsEnum, IsNotEmpty } from 'class-validator'

/**
 * 获取会员积分规则请求 DTO
 */
export class GetMemberPointsRuleRequest {
  @ApiProperty({ description: '会员积分规则标识', enum: MemberPointsRuleKey })
  @IsEnum(MemberPointsRuleKey)
  @IsNotEmpty()
  readonly key: IMemberPointsRuleKey
}
