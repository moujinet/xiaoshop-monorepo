import {
  Enabled,
  type IEnabled,
  type ILogisticsFreightTemplateCalcMode,
  LogisticsFreightTemplateCalcMode,
} from '@xiaoshop/schema'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, Min, ValidateIf, ValidateNested } from 'class-validator'

/**
 * 物流运费模板 - 运费规则 DTO
 */
export class FreightTemplateNormalRulePayload {
  @ApiProperty({
    description: '规则区域',
    type: [String],
    example: ['11'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  areas: string[]

  @ApiProperty({ description: '首重' })
  @IsNumber()
  first: number

  @ApiProperty({ description: '首重费用' })
  @IsNumber()
  firstPrice: number

  @ApiProperty({ description: '续重' })
  @IsNumber()
  continue: number

  @ApiProperty({ description: '续重费用' })
  @IsNumber()
  continuePrice: number
}

/**
 * 物流运费模板 - 包邮规则 DTO
 */
export class FreightTemplateFreeRulePayload {
  @ApiProperty({
    description: '规则区域',
    type: [String],
    example: ['11'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  areas: string[]

  @ApiProperty({ description: '包邮件数' })
  @Min(0)
  @IsNumber()
  overCount: number

  @ApiProperty({ description: '包邮金额' })
  @Min(0)
  @IsNumber()
  overAmount: number
}

/**
 * 物流运费模板 DTO
 */
export class FreightTemplatePayload {
  @ApiProperty({ description: '模板名称', example: '默认物流模板 (顺丰发货)' })
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: '运费计算方式', enum: LogisticsFreightTemplateCalcMode, default: LogisticsFreightTemplateCalcMode.COUNT })
  @IsEnum(LogisticsFreightTemplateCalcMode)
  @IsNotEmpty()
  calcMode: ILogisticsFreightTemplateCalcMode

  @ApiProperty({ type: [FreightTemplateNormalRulePayload], description: '运费规则' })
  @ValidateNested()
  @Type(() => FreightTemplateNormalRulePayload)
  rules: FreightTemplateNormalRulePayload[]

  @ApiProperty({ description: '启用包邮地区', enum: Enabled, default: Enabled.NO })
  @IsEnum(Enabled)
  @IsNotEmpty()
  enableFreeRules: IEnabled

  @ApiProperty({ type: [FreightTemplateFreeRulePayload], description: '包邮规则' })
  @ValidateIf(o => o.enableFreeRules === Enabled.YES)
  @ValidateNested()
  @Type(() => FreightTemplateFreeRulePayload)
  freeRules: FreightTemplateFreeRulePayload[]
}
