import type { ILocationPath, YesOrNo } from '~/common'
import type { LogisticsCalcMode } from './constants'

/**
 * 物流运费模板
 */
export interface ILogisticsTemplateInfo {
  /**
   * 物流模板编号
   */
  id: number
  /**
   * 模板名称
   */
  name: string
  /**
   * 模板描述
   */
  desc: string
  /**
   * 排序
   */
  sort: number
  /**
   * 运费计算方式
   *
   * @see {@link LogisticsCalcMode}
   */
  calcMode: LogisticsCalcMode
  /**
   * 运费规则 (JSON)
   *
   * @see {@link ILogisticsTemplateRule}
   */
  rules: ILogisticsTemplateRule[]
  /**
   * 是否开启包邮规则 (Y:是  N:否)
   *
   * @see {@link YesOrNo}
   */
  enableFreeRules: YesOrNo
  /**
   * 包邮规则 (JSON)
   *
   * @see {@link ILogisticsTemplateFreeRule}
   */
  freeRules: ILogisticsTemplateFreeRule[]
}

/**
 * 物流运费模板 - 运费规则
 */
export interface ILogisticsTemplateRule {
  /**
   * 配送地区
   *
   * @see {@link ILocationPath}
   */
  locations: ILocationPath[]
  /**
   * 首件
   */
  first: number
  /**
   * 首件运费
   */
  firstPrice: number
  /**
   * 续件
   */
  continue: number
  /**
   * 续件运费
   */
  continuePrice: number
}

/**
 * 物流运费模板 - 包邮规则
 */
export interface ILogisticsTemplateFreeRule {
  /**
   * 包邮地区
   *
   * @see {@link ILocationPath}
   */
  locations: ILocationPath[]
  /**
   * 包邮件数
   */
  overCount: number
  /**
   * 包邮金额
   */
  overAmount: number
}

/**
 * 物流运费模板 - 列表
 *
 * @see {@link ILogisticsTemplateInfo}
 */
export type ILogisticsTemplateList = Pick<
  ILogisticsTemplateInfo,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
  | 'calcMode'
  | 'enableFreeRules'
> & {
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 物流运费模板 - 字典
 *
 * @see {@link ILogisticsTemplateInfo}
 */
export type ILogisticsTemplateDict = Pick<
  ILogisticsTemplateInfo,
  | 'id'
  | 'name'
>
