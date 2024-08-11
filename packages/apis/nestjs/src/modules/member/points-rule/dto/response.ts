import type {
  IEnabled,
  IMemberPointsRule,
  IMemberPointsRuleKey,
  IMemberPointsRuleListItem,
  IMemberPointsRuleOptions,
} from '@xiaoshop/schema'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { example } from './example'

/**
 * 会员积分规则信息响应 DTO
 */
export class MemberPointsRuleResponse implements IMemberPointsRule {
  @ApiProperty({ description: '会员积分规则 ID' })
  readonly id: number

  @ApiProperty({ description: '会员积分规则标识', example: example.key })
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '会员积分规则启用状态', example: example.enable })
  readonly enable: IEnabled

  @ApiProperty({ description: '会员积分规则名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '会员积分规则描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '会员积分规则图标', example: example.icon })
  readonly icon: string

  @ApiProperty({ description: '会员积分规则选项', example: example.options })
  readonly options: IMemberPointsRuleOptions
}

/**
 * 会员积分规则列表响应 DTO
 */
export class MemberPointsRuleListResponse
  extends PickType(MemberPointsRuleResponse, [
    'id',
    'key',
    'enable',
    'name',
    'desc',
    'icon',
  ])
  implements IMemberPointsRuleListItem {}
