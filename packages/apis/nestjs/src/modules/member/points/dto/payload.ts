import {
  Enabled,
  type IEnabled,
  type IMemberPointsRuleKey,
  type IMemberPointsRuleOptions,
  MemberPointsRuleKey,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { example } from './example'

/**
 * 积分规则选项 DTO
 */
export class MemberPointsRuleOptionsPayload implements IMemberPointsRuleOptions {
  @ApiProperty({ description: '积分', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly points: number

  @ApiProperty({ description: '最大积分', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly limit: number

  @ApiProperty({ description: '积分倍率', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly ratio: number

  @ApiProperty({ description: '连续 7 天倍率', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly perWeekRatio: number

  @ApiProperty({ description: '连续 30 天倍率', example: 1 })
  @IsNumber()
  @IsOptional()
  readonly perMonthRatio: number
}

/**
 * 会员积分规则 DTO
 */
export class MemberPointsRulePayload {
  @ApiProperty({ description: '积分规则标识', enum: MemberPointsRuleKey, example: example.key })
  @IsEnum(MemberPointsRuleKey)
  @IsNotEmpty()
  readonly key: IMemberPointsRuleKey

  @ApiProperty({ description: '积分规则启用状态', enum: Enabled, example: example.enable })
  @IsEnum(Enabled)
  @IsNotEmpty()
  readonly enable: IEnabled

  @ApiProperty({ description: '积分规则描述', example: example.desc })
  @IsString()
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '积分规则选项', example: example.options })
  @ValidateNested()
  @Type(() => MemberPointsRuleOptionsPayload)
  @IsOptional()
  readonly options: IMemberPointsRuleOptions
}
