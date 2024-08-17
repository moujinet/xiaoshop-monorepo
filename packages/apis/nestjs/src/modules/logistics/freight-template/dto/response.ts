import type {
  IEnabled,
  ILocationPath,
  ILogisticsFreightTemplate,
  ILogisticsFreightTemplateCalcMode,
  ILogisticsFreightTemplateDict,
  ILogisticsFreightTemplateFreeRule,
  ILogisticsFreightTemplateListItem,
  ILogisticsFreightTemplateNormalRule,
} from '@xiaoshop/schema'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'

/**
 * 物流运费模板运费规则响应 DTO
 */
export class FreightTemplateNormalRuleResponse implements ILogisticsFreightTemplateNormalRule {
  @ApiProperty({ description: '规则区域', example: [[{ code: '11', name: '北京市' }]] })
  readonly locations: ILocationPath[]

  @ApiProperty({ description: '首重' })
  readonly first: number

  @ApiProperty({ description: '首重费用' })
  readonly firstPrice: number

  @ApiProperty({ description: '续重' })
  readonly continue: number

  @ApiProperty({ description: '续重费用' })
  readonly continuePrice: number
}

/**
 * 物流运费模板包邮规则响应 DTO
 */
export class FreightTemplateFreeRuleResponse implements ILogisticsFreightTemplateFreeRule {
  @ApiProperty({ description: '包邮区域', example: [[{ code: '11', name: '北京市' }]] })
  readonly locations: ILocationPath[]

  @ApiProperty({ description: '包邮件数' })
  readonly overCount: number

  @ApiProperty({ description: '包邮金额' })
  readonly overAmount: number
}

/**
 * 物流运费模板响应 DTO
 */
export class FreightTemplateResponse implements ILogisticsFreightTemplate {
  @ApiProperty({ description: '运费模板 ID' })
  readonly id: number

  @ApiProperty({ description: '模板名称' })
  readonly name: string

  @ApiProperty({ description: '运费计算方式' })
  readonly calcMode: ILogisticsFreightTemplateCalcMode

  @ApiProperty({ description: '运费规则', type: [FreightTemplateNormalRuleResponse] })
  readonly rules: ILogisticsFreightTemplateNormalRule[]

  @ApiProperty({ description: '启用包邮地区' })
  readonly enableFreeRules: IEnabled

  @ApiProperty({ description: '包邮规则', type: [FreightTemplateFreeRuleResponse] })
  readonly freeRules: ILogisticsFreightTemplateFreeRule[]

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string
}

/**
 * 物流运费模板列表响应 DTO
 */
export class FreightTemplateListResponse
  extends OmitType(FreightTemplateResponse, ['rules', 'freeRules'])
  implements ILogisticsFreightTemplateListItem {}

/**
 * 物流运费模板字典响应 DTO
 */
export class FreightTemplateDictResponse
  extends PickType(FreightTemplateResponse, ['id', 'name'])
  implements ILogisticsFreightTemplateDict {}
