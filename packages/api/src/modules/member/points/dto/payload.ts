import type { IMemberPointsRuleOptions } from '@xiaoshop/shared'

import { Type } from 'class-transformer'
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

/**
 * Member Points Rule Options
 */
export class MemberPointsRuleOptionsPayload implements IMemberPointsRuleOptions {
  @IsNumber({}, { message: '积分必须为数字' })
  @IsOptional()
  readonly points?: number

  @IsNumber({}, { message: '最大积分必须为数字' })
  @IsOptional()
  readonly limit?: number

  @IsNumber({}, { message: '消费积分奖励倍率必须为数字' })
  @IsOptional()
  readonly perOrderRatio?: number

  @IsNumber({}, { message: '连续 7 天倍率必须为数字' })
  @IsOptional()
  readonly perWeekRatio?: number

  @IsNumber({}, { message: '连续 30 天倍率必须为数字' })
  @IsOptional()
  readonly perMonthRatio?: number

  @IsNumber({}, { message: '积分抵扣比例必须为数字' })
  @IsOptional()
  readonly ratio?: number
}

/**
 * Update Member Points Rule
 */
export class UpdateMemberPointsRulePayload {
  @IsString({ message: '规则描述不正确' })
  @IsNotEmpty({ message: '规则描述不能为空' })
  readonly desc: string

  @IsString({ message: '规则图标不正确' })
  @IsNotEmpty({ message: '规则图标不能为空' })
  readonly icon: string

  @ValidateNested({ message: '积分规则选项不正确' })
  @Type(() => MemberPointsRuleOptionsPayload)
  @IsNotEmptyObject({}, { message: '积分规则选项不能为空' })
  readonly options: IMemberPointsRuleOptions
}
