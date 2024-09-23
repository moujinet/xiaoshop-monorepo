import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateIf, ValidateNested } from 'class-validator'
import {
  type ILocationPath,
  type ILogisticFreightFreeRule,
  type ILogisticFreightLocationRule,
  LogisticFreightCalcMode,
  YesOrNo,
} from '@xiaoshop/shared'

export class FreightLocationRulePayload implements ILogisticFreightLocationRule {
  @IsArray({ message: '规则地区不正确' })
  @ArrayNotEmpty({ message: '规则地区不能为空' })
  readonly locations: ILocationPath[]

  @IsNumber({}, { message: '首重不正确' })
  @Min(0, { message: '首重不能小于 0' })
  readonly first: number

  @IsNumber({}, { message: '首重价格不正确' })
  @Min(0, { message: '首重价格不能小于 0' })
  readonly firstPrice: number

  @IsNumber({}, { message: '续重不正确' })
  @Min(0, { message: '续重不能小于 0' })
  readonly continue: number

  @IsNumber({}, { message: '续重价格不正确' })
  @Min(0, { message: '续重价格不能小于 0' })
  readonly continuePrice: number
}

export class FreightFreeRulePayload implements ILogisticFreightFreeRule {
  @IsArray({ message: '规则地区不正确' })
  @ArrayNotEmpty({ message: '规则地区不能为空' })
  readonly locations: ILocationPath[]

  @IsNumber({}, { message: '包邮件数不正确' })
  @Min(0, { message: '包邮件数不能小于 0' })
  readonly overCount: number

  @IsNumber({}, { message: '包邮金额不正确' })
  @Min(0, { message: '包邮金额不能小于 0' })
  readonly overAmount: number
}

export class FreightTemplatePayload {
  @IsString({ message: '模板名称不正确' })
  @IsNotEmpty({ message: '模板名称不能为空' })
  readonly name: string

  @IsString({ message: '模板描述不正确' })
  @IsOptional()
  readonly desc?: string

  @IsNumber({}, { message: '排序不正确' })
  @IsOptional()
  readonly sort?: number

  @IsNumber({}, { message: '运费计算方式不正确' })
  @Min(LogisticFreightCalcMode.WEIGHT, { message: '运费计算方式不能小于 0' })
  @Max(LogisticFreightCalcMode.COUNT, { message: '运费计算方式不正确' })
  readonly calcMode: LogisticFreightCalcMode

  @ValidateNested()
  @IsArray({ message: '运费规则不正确' })
  @ArrayNotEmpty({ message: '运费规则不能为空' })
  @Type(() => FreightLocationRulePayload)
  readonly rules: ILogisticFreightLocationRule[]

  @IsNumber({}, { message: '是否包邮不正确' })
  @Min(0, { message: '是否包邮不正确' })
  @Max(1, { message: '是否包邮不正确' })
  @IsOptional()
  readonly enableFreeRules?: YesOrNo

  @ValidateIf(o => o.enableFreeRules === YesOrNo.YES)
  @ValidateNested()
  @IsArray({ message: '包邮规则不正确' })
  @ArrayNotEmpty({ message: '包邮规则不能为空' })
  @Type(() => FreightFreeRulePayload)
  readonly freeRules?: ILogisticFreightFreeRule[]
}
