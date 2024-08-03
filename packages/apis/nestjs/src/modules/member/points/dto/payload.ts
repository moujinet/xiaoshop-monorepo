import {
  Enabled,
  type IEnabled,
  type IMemberPointsRuleKey,
  type IMemberPointsRuleOptions,
  MemberPointsRuleKey,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { example } from './example'

/**
 * 积分规则选项 DTO
 */
export class MemberPointsRuleOptionsPayload implements IMemberPointsRuleOptions {
  @ApiProperty({ required: false, description: '积分', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly points: number

  @ApiProperty({ required: false, description: '最大积分', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly limit: number

  @ApiProperty({ required: false, description: '积分抵扣比例', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly ratio: number

  @ApiProperty({ required: false, description: '消费积分奖励倍率', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly perOrderRatio: number

  @ApiProperty({ required: false, description: '连续 7 天倍率', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly perWeekRatio: number

  @ApiProperty({ required: false, description: '连续 30 天倍率', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly perMonthRatio: number
}

/**
 * 更新会员积分规则设置 DTO
 */
export class UpdateMemberPointsRuleOptionsPayload {
  @ApiProperty({ description: '积分规则标识', enum: MemberPointsRuleKey, example: example.key })
  @IsEnum(MemberPointsRuleKey)
  @IsNotEmpty()
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '积分规则选项', example: example.options })
  @ValidateNested()
  @Type(() => MemberPointsRuleOptionsPayload)
  @IsNotEmptyObject()
  readonly options: IMemberPointsRuleOptions
}

/**
 * 更新会员积分规则启用状态 DTO
 */
export class UpdateMemberPointsRuleStatusPayload {
  @ApiProperty({ description: '积分规则标识', enum: MemberPointsRuleKey, example: example.key })
  @IsEnum(MemberPointsRuleKey)
  @IsNotEmpty()
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ required: false, description: '积分规则选项', enum: Enabled, example: example.enable })
  @IsEnum(Enabled)
  @IsNotEmpty()
  readonly enable: IEnabled
}
