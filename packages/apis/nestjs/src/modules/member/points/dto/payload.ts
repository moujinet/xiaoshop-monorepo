import {
  EnabledEnum,
  IEnabled,
  type IMemberPointsRuleKey,
  type IMemberPointsRuleOptions,
  MemberPointsRuleKeyEnum,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { example } from './example'

/**
 * 积分规则选项 DTO
 */
export class MemberPointsRuleOptionsPayload implements IMemberPointsRuleOptions {
  @ApiProperty({ required: false, description: '积分', example: example.options.points })
  @IsNumber()
  @IsOptional()
  readonly points: number

  @ApiProperty({ required: false, description: '最大积分', example: example.options.limit })
  @IsNumber()
  @IsOptional()
  readonly limit: number

  @ApiProperty({ type: 'float', required: false, description: '积分倍率', example: example.options.ratio })
  @IsNumber()
  @IsOptional()
  readonly ratio: number

  @ApiProperty({ type: 'float', required: false, description: '连续 7 天倍率', example: example.options.perWeekRatio })
  @IsNumber()
  @IsOptional()
  readonly perWeekRatio: number

  @ApiProperty({ type: 'float', required: false, description: '连续 30 天倍率', example: example.options.perMonthRatio })
  @IsNumber()
  @IsOptional()
  readonly perMonthRatio: number
}

/**
 * 创建积分规则 DTO
 */
export class MemberPointsRulePayload {
  @ApiProperty({ description: '积分规则状态', enum: MemberPointsRuleKeyEnum, example: example.key })
  @IsEnum(MemberPointsRuleKeyEnum)
  @IsNotEmpty()
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '积分规则状态', enum: EnabledEnum, example: example.status })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  readonly status: IEnabled

  @ApiProperty({ description: '积分规则名称', example: example.name })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ required: false, description: '积分规则描述', example: example.desc })
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '积分规则图标', example: example.icon })
  @IsString()
  @IsOptional()
  readonly icon: string

  @ApiProperty({ description: '积分规则选项', example: example.options })
  @Type(() => MemberPointsRuleOptionsPayload)
  readonly options: IMemberPointsRuleOptions
}

/**
 * 更新积分规则状态 DTO
 */
export class UpdateMemberPointsRuleStatusPayload {
  @ApiProperty({ description: '积分规则状态', enum: EnabledEnum, example: example.status })
  @IsEnum(EnabledEnum)
  @IsNotEmpty()
  readonly status: IEnabled
}
