import type { IEnabled } from '@/common/types'
import type { ILogisticsFreightTemplateCalcMode } from '@/logistics/types'

/**
 * 物流运费模板
 */
export interface ILogisticsFreightTemplate {
  /**
   * 运费模板编号
   */
  id: number
  /**
   * 运费模板名称
   */
  name: string
  /**
   * 运费计算方式
   *
   * @see {@link ILogisticsFreightTemplateCalcMode}
   */
  calcMode: ILogisticsFreightTemplateCalcMode
  /**
   * 运费规则
   *
   * @see {@link ILogisticsFreightTemplateNormalRule}
   */
  rules: ILogisticsFreightTemplateNormalRule[]
  /**
   * 启用包邮地区规则
   */
  enableFreeRules: IEnabled
  /**
   * 包邮规则
   *
   * @see {@link ILogisticsFreightTemplateFreeRule}
   */
  freeRules: ILogisticsFreightTemplateFreeRule[]
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 运费模板规则 - 运费规则
 */
export interface ILogisticsFreightTemplateNormalRule {
  /**
   * 规则覆盖地区
   */
  areas: string[]
  /**
   * 首重
   */
  first: number
  /**
   * 首重费用
   */
  firstPrice: number
  /**
   * 续重
   */
  continue: number
  /**
   * 续重费用
   */
  continuePrice: number
}

/**
 * 运费模板规则 - 包邮规则
 */
export interface ILogisticsFreightTemplateFreeRule {
  /**
   * 规则覆盖地区
   */
  areas: string[]
  /**
   * 包邮件数 (达到或超过)
   */
  overCount: number
  /**
   * 包邮金额 (达到或超过)
   */
  overAmount: number
}

/**
 * 物流运费模板列表
 */
export type ILogisticsFreightTemplateListItem = Omit<ILogisticsFreightTemplate, 'rules' | 'freeRules' | 'createdTime'>

/**
 * 物流运费模板字典
 */
export type ILogisticsFreightTemplateDict = Pick<ILogisticsFreightTemplate, 'id' | 'name'>
