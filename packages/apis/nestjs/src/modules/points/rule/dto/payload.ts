import {
  Enabled,
  type IEnabled,
  type IPointsRuleKey,
  type IPointsRuleOptions,
  PointsRuleKey,
} from '@xiaoshop/schema'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { example } from './example'

/**
 * 积分规则选项 DTO
 */
export class PointsRuleOptionsPayload implements IPointsRuleOptions {
  @ApiProperty({ required: false, description: '积分', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly points: number

  @ApiProperty({ required: false, description: '最大积分', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly limit: number

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

  @ApiProperty({ required: false, description: '积分抵扣比例', example: 0 })
  @IsNumber()
  @IsOptional()
  readonly ratio: number
}

/**
 * 更新会员积分规则设置 DTO
 */
export class UpdatePointsRuleOptionsPayload {
  @ApiProperty({ description: '积分规则标识', enum: PointsRuleKey, example: example.key })
  @IsEnum(PointsRuleKey)
  @IsNotEmpty()
  readonly key: IPointsRuleKey

  @ApiProperty({ description: '积分规则选项', example: example.options })
  @ValidateNested()
  @Type(() => PointsRuleOptionsPayload)
  @IsNotEmptyObject()
  readonly options: IPointsRuleOptions
}

/**
 * 更新会员积分规则启用状态 DTO
 */
export class UpdatePointsRuleStatusPayload {
  @ApiProperty({ description: '积分规则标识', enum: PointsRuleKey, example: example.key })
  @IsEnum(PointsRuleKey)
  @IsNotEmpty()
  readonly key: IPointsRuleKey

  @ApiProperty({ required: false, description: '积分规则选项', enum: Enabled, example: example.enable })
  @IsEnum(Enabled)
  @IsNotEmpty()
  readonly enable: IEnabled
}
