import type {
  IMemberPointsRule,
  IMemberPointsRuleOptions,
  MemberPointsRuleKey,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员积分规则信息响应 DTO
 */
export class MemberPointsRuleResponse implements IMemberPointsRule {
  @ApiProperty({ description: '会员积分规则标识', example: example.key })
  readonly key: MemberPointsRuleKey

  @ApiProperty({ description: '会员积分规则启用状态', example: example.enable })
  readonly enable: YesOrNo

  @ApiProperty({ description: '会员积分规则选项', example: example.rule })
  readonly rule: IMemberPointsRuleOptions
}
