import {
  type ILocationPath,
  type ILogisticsTemplateFreeRule,
  type ILogisticsTemplateRule,
  LogisticsCalcMode,
  YesOrNo,
} from '@xiaoshop/shared'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateIf, ValidateNested } from 'class-validator'
import { Location } from '~/common/dto'

/**
 * 物流运费模板 - 运费规则 DTO
 */
export class LogisticsTemplateRulePayload implements ILogisticsTemplateRule {
  @ApiProperty({
    description: '规则区域',
    type: [[Location]],
    example: [[{ code: '11', name: '北京市' }]],
  })
  @IsArray({ message: '规则区域必须为数组' })
  @ArrayNotEmpty({ message: '规则区域不能为空' })
  @Type(() => Location)
  readonly locations: ILocationPath[]

  @ApiProperty({ description: '首重' })
  @Min(0, { message: '首重不能小于 0' })
  @IsNumber({}, { message: '首重必须为数字' })
  readonly first: number

  @ApiProperty({ description: '首重费用' })
  @Min(0, { message: '首重费用不能小于 0' })
  @IsNumber({}, { message: '首重费用必须为数字' })
  readonly firstPrice: number

  @ApiProperty({ description: '续重' })
  @Min(0, { message: '续重不能小于 0' })
  @IsNumber({}, { message: '续重必须为数字' })
  readonly continue: number

  @ApiProperty({ description: '续重费用' })
  @Min(0, { message: '续重费用不能小于 0' })
  @IsNumber({}, { message: '续重费用必须为数字' })
  readonly continuePrice: number
}

/**
 * 物流运费模板 - 包邮规则 DTO
 */
export class LogisticsTemplateFreeRulePayload implements ILogisticsTemplateFreeRule {
  @ApiProperty({
    description: '规则区域',
    type: [[Location]],
    example: [[{ code: '11', name: '北京市' }]],
  })
  @IsArray({ message: '规则区域必须为数组' })
  @ArrayNotEmpty({ message: '规则区域不能为空' })
  @Type(() => Location)
  readonly locations: ILocationPath[]

  @ApiProperty({ description: '包邮件数' })
  @Min(0, { message: '包邮件数不能小于 0' })
  @IsNumber({}, { message: '包邮件数必须为数字' })
  readonly overCount: number

  @ApiProperty({ description: '包邮金额' })
  @Min(0, { message: '包邮金额不能小于 0' })
  @IsNumber({}, { message: '包邮金额必须为数字' })
  readonly overAmount: number
}

/**
 * 物流运费模板 DTO
 */
export class LogisticsTemplatePayload {
  @ApiProperty({ description: '模板名称', example: '默认物流模板 (顺丰发货)' })
  @MaxLength(32, { message: '模板名称长度不能超过 32 个字符' })
  @IsNotEmpty({ message: '模板名称不能为空' })
  @IsString({ message: '模板名称必须为字符串' })
  readonly name: string

  @ApiProperty({ required: false, description: '模板描述', example: '模板描述' })
  @MaxLength(255, { message: '模板描述长度不能超过 255 个字符' })
  @IsString({ message: '模板描述必须为字符串' })
  @IsOptional()
  readonly desc: string

  @ApiProperty({ required: false, description: '排序', default: 1 })
  @IsNumber({}, { message: '排序必须为数字' })
  @IsOptional()
  readonly sort: number

  @ApiProperty({ description: '运费计算方式', enum: LogisticsCalcMode, default: LogisticsCalcMode.COUNT })
  @IsEnum(LogisticsCalcMode, { message: '运费计算方式不正确' })
  @IsNotEmpty({ message: '运费计算方式不能为空' })
  readonly calcMode: LogisticsCalcMode

  @ApiProperty({ type: [LogisticsTemplateRulePayload], description: '运费规则' })
  @ValidateNested({ message: '运费规则不正确' })
  @Type(() => LogisticsTemplateRulePayload)
  readonly rules: LogisticsTemplateRulePayload[]

  @ApiProperty({ description: '启用包邮地区', enum: YesOrNo, default: YesOrNo.NO })
  @IsEnum(YesOrNo, { message: '启用包邮地区不正确' })
  @IsNotEmpty({ message: '启用包邮地区不能为空' })
  readonly enableFreeRules: YesOrNo

  @ApiProperty({ type: [LogisticsTemplateFreeRulePayload], description: '包邮规则' })
  @ValidateIf(o => o.enableFreeRules === YesOrNo.YES)
  @ValidateNested({ message: '包邮规则不正确' })
  @Type(() => LogisticsTemplateFreeRulePayload)
  readonly freeRules: LogisticsTemplateFreeRulePayload[]
}
