import {
  type ILocationPath,
  type ILogisticsTemplate,
  type ILogisticsTemplateDict,
  type ILogisticsTemplateFreeRule,
  type ILogisticsTemplateListItem,
  type ILogisticsTemplateRule,
  LogisticsCalcMode,
  YesOrNo,
} from '@xiaoshop/shared'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'

/**
 * 物流运费模板运费规则响应 DTO
 */
export class LogisticsTemplateRuleResponse implements ILogisticsTemplateRule {
  @ApiProperty({ description: '规则区域', example: [[{ code: '11', name: '北京市' }]] })
  readonly locations: ILocationPath[]

  @ApiProperty({ description: '首重', example: 0 })
  readonly first: number

  @ApiProperty({ description: '首重费用', example: 0 })
  readonly firstPrice: number

  @ApiProperty({ description: '续重', example: 0 })
  readonly continue: number

  @ApiProperty({ description: '续重费用', example: 0 })
  readonly continuePrice: number
}

/**
 * 物流运费模板包邮规则响应 DTO
 */
export class LogisticsTemplateFreeRuleResponse implements ILogisticsTemplateFreeRule {
  @ApiProperty({ description: '包邮区域', example: [[{ code: '11', name: '北京市' }]] })
  readonly locations: ILocationPath[]

  @ApiProperty({ description: '包邮件数', example: 0 })
  readonly overCount: number

  @ApiProperty({ description: '包邮金额', example: 0 })
  readonly overAmount: number
}

/**
 * 物流运费模板响应 DTO
 */
export class LogisticsTemplateResponse implements ILogisticsTemplate {
  @ApiProperty({ description: '运费模板 ID', example: 1 })
  readonly id: number

  @ApiProperty({ description: '模板名称', example: '默认运费模板' })
  readonly name: string

  @ApiProperty({ description: '模板描述', example: '默认运费模板' })
  readonly desc: string

  @ApiProperty({ description: '排序', example: 1 })
  readonly sort: number

  @ApiProperty({ description: '运费计算方式', example: LogisticsCalcMode.COUNT })
  readonly calcMode: LogisticsCalcMode

  @ApiProperty({ description: '运费规则', type: [LogisticsTemplateRuleResponse] })
  readonly rules: ILogisticsTemplateRule[]

  @ApiProperty({ description: '启用包邮地区', example: YesOrNo.NO })
  readonly enableFreeRules: YesOrNo

  @ApiProperty({ description: '包邮规则', type: [LogisticsTemplateFreeRuleResponse] })
  readonly freeRules: ILogisticsTemplateFreeRule[]

  @ApiProperty({ description: '创建时间' })
  readonly createdTime: string

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: string
}

/**
 * 物流运费模板列表响应 DTO
 */
export class LogisticsTemplateListResponse
  extends OmitType(LogisticsTemplateResponse, ['rules', 'freeRules', 'createdTime'] as const)
  implements ILogisticsTemplateListItem {}

/**
 * 物流运费模板字典响应 DTO
 */
export class LogisticsTemplateDictResponse
  extends PickType(LogisticsTemplateResponse, ['id', 'name'] as const)
  implements ILogisticsTemplateDict {}
