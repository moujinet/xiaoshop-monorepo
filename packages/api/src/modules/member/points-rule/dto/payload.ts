import {
  type IMemberPointsRuleKey,
  type IMemberPointsRuleOptions,
  type IYesOrNo,
  MemberPointsRuleKey,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { example } from './example'

/**
 * 积分规则选项 DTO
 */
export class MemberPointsRuleOptionsPayload implements IMemberPointsRuleOptions {
  @ApiProperty({ required: false, description: '积分', example: 0 })
  @IsNumber({}, { message: '积分必须为数字' })
  @IsOptional()
  readonly points: number

  @ApiProperty({ required: false, description: '最大积分', example: 0 })
  @IsNumber({}, { message: '最大积分必须为数字' })
  @IsOptional()
  readonly limit: number

  @ApiProperty({ required: false, description: '消费积分奖励倍率', example: 0 })
  @IsNumber({}, { message: '消费积分奖励倍率必须为数字' })
  @IsOptional()
  readonly perOrderRatio: number

  @ApiProperty({ required: false, description: '连续 7 天倍率', example: 0 })
  @IsNumber({}, { message: '连续 7 天倍率必须为数字' })
  @IsOptional()
  readonly perWeekRatio: number

  @ApiProperty({ required: false, description: '连续 30 天倍率', example: 0 })
  @IsNumber({}, { message: '连续 30 天倍率必须为数字' })
  @IsOptional()
  readonly perMonthRatio: number

  @ApiProperty({ required: false, description: '积分抵扣比例', example: 0 })
  @IsNumber({}, { message: '积分抵扣比例必须为数字' })
  @IsOptional()
  readonly ratio: number
}

/**
 * 更新会员积分规则设置 DTO
 */
export class UpdateMemberPointsRuleOptionsPayload {
  @ApiProperty({ description: '积分规则标识', enum: MemberPointsRuleKey, example: example.key })
  @IsEnum(MemberPointsRuleKey, { message: '积分规则标识不正确' })
  @IsNotEmpty({ message: '积分规则标识不能为空' })
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '积分规则选项', example: example.rule })
  @ValidateNested({ message: '积分规则选项不正确' })
  @Type(() => MemberPointsRuleOptionsPayload)
  @IsNotEmptyObject({}, { message: '积分规则选项不能为空' })
  readonly options: IMemberPointsRuleOptions
}

/**
 * 更新会员积分规则启用状态 DTO
 */
export class UpdateMemberPointsRuleStatusPayload {
  @ApiProperty({ description: '积分规则标识', enum: MemberPointsRuleKey, example: example.key })
  @IsEnum(MemberPointsRuleKey, { message: '积分规则标识不正确' })
  @IsNotEmpty({ message: '积分规则标识不能为空' })
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ required: false, description: '积分规则选项', enum: YesOrNo, example: example.enable })
  @IsEnum(YesOrNo, { message: '积分规则启用状态不正确' })
  @IsNotEmpty({ message: '积分规则启用状态不能为空' })
  readonly enable: IYesOrNo
}
