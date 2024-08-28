import type {
  IMemberPointsRule,
  IMemberPointsRuleKey,
  IMemberPointsRuleOptions,
  IYesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员积分规则信息响应 DTO
 */
export class MemberPointsRuleResponse implements IMemberPointsRule {
  @ApiProperty({ description: '会员积分规则标识', example: example.key })
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '会员积分规则启用状态', example: example.enable })
  readonly enable: IYesOrNo

  @ApiProperty({ description: '会员积分规则选项', example: example.rule })
  readonly rule: IMemberPointsRuleOptions
}
