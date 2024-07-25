import type {
  IEnabled,
  IMemberPointsRule,
  IMemberPointsRuleKey,
  IMemberPointsRuleOptions,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { example } from './example'

/**
 * 积分规则选项响应 DTO
 */
export class MemberPointsRuleOptionsResponse implements IMemberPointsRuleOptions {
  @ApiProperty({ required: false, description: '积分', example: example.options.points })
  readonly points: number

  @ApiProperty({ required: false, description: '最大积分', example: example.options.limit })
  readonly limit: number

  @ApiProperty({ type: 'float', required: false, description: '积分倍率', example: example.options.ratio })
  readonly ratio: number

  @ApiProperty({ type: 'float', required: false, description: '连续 7 天倍率', example: example.options.perWeekRatio })
  readonly perWeekRatio: number

  @ApiProperty({ type: 'float', required: false, description: '连续 30 天倍率', example: example.options.perMonthRatio })
  readonly perMonthRatio: number
}

/**
 * 积分规则响应 DTO
 */
export class MemberPointsRuleResponse implements IMemberPointsRule {
  @ApiProperty({ description: '积分规则 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '积分规则标识', example: example.key })
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '积分规则状态', example: example.status })
  readonly status: IEnabled

  @ApiProperty({ description: '积分规则名称', example: example.name })
  readonly name: string

  @ApiProperty({ description: '积分规则描述', example: example.desc })
  readonly desc: string

  @ApiProperty({ description: '积分规则图标', example: example.icon })
  readonly icon: string

  @ApiProperty({ description: '积分规则选项', example: example.options })
  readonly options: MemberPointsRuleOptionsResponse
}
