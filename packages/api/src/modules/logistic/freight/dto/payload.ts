import { Type } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf, ValidateNested } from 'class-validator'
import {
  type ILocationPath,
  type ILogisticFreightFreeRule,
  type ILogisticFreightLocationRule,
  type LogisticFreightCalcMode,
  YesOrNo,
} from '@xiaoshop/shared'

import { LocationDto } from '~/common/dto'

/**
 * Logistic Freight Rule Payload
 */
export class LogisticFreightLocationRulePayload implements ILogisticFreightLocationRule {
  @Type(() => LocationDto)
  @ArrayNotEmpty({ message: '地区不能为空' })
  @ValidateNested({ each: true })
  readonly locations: ILocationPath[]

  @IsNumber({}, { message: '首(重)必须为数字' })
  @Min(0, { message: '首(重)必须为大于 0 的数字' })
  readonly first: number

  @IsNumber({}, { message: '首(重)运费必须为数字' })
  @Min(0, { message: '首(重)运费必须为大于 0 的数字' })
  readonly firstPrice: number

  @IsNumber({}, { message: '续(重)必须为数字' })
  @Min(0, { message: '续(重)必须为大于 0 的数字' })
  readonly continue: number

  @IsNumber({}, { message: '续(重)运费必须为数字' })
  @Min(0, { message: '续(重)运费必须为大于 0 的数字' })
  readonly continuePrice: number
}

/**
 * Logistic Freight Free Rule Payload
 */
export class LogisticFreightFreeRulePayload implements ILogisticFreightFreeRule {
  @Type(() => LocationDto)
  @ArrayNotEmpty({ message: '地区不能为空' })
  @ValidateNested({ each: true })
  readonly locations: ILocationPath[]

  @IsNumber({}, { message: '包邮件数必须为数字' })
  @Min(0, { message: '包邮件数必须为大于 0 的数字' })
  readonly overCount: number

  @IsNumber({}, { message: '包邮金额必须为数字' })
  @Min(0, { message: '包邮金额必须为大于 0 的数字' })
  readonly overAmount: number
}

/**
 * Create Logistic Freight Template
 */
export class CreateLogisticFreightTemplatePayload {
  @IsNumber({}, { message: '是否启用不正确' })
  @IsOptional()
  readonly isEnabled?: YesOrNo

  @IsString({ message: '模板名称不正确' })
  @IsNotEmpty({ message: '模板名称不能为空' })
  readonly name: string

  @IsString({ message: '模板描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '运费计算方式不正确' })
  readonly calcMode: LogisticFreightCalcMode

  @IsNumber({}, { message: '是否开启包邮规则不正确' })
  readonly enableFreeRules: YesOrNo

  @Type(() => LogisticFreightLocationRulePayload)
  @ArrayNotEmpty({ message: '运费规则不能为空' })
  @ValidateNested({ each: true })
  readonly rules: ILogisticFreightLocationRule[]

  @ValidateIf(o => o.enableFreeRules === YesOrNo.YES)
  @Type(() => LogisticFreightFreeRulePayload)
  @ArrayNotEmpty({ message: '包邮规则不能为空' })
  @ValidateNested({ each: true })
  readonly freeRules: ILogisticFreightFreeRule[]

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number
}

/**
 * Update Logistic Freight Template
 */
export class UpdateLogisticFreightTemplatePayload extends PartialType(CreateLogisticFreightTemplatePayload) {
}
