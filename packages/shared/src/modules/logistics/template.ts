import type { ILogisticsCalcMode } from './types'
import type { ILocationPath, IYesOrNo } from '~/common'

/**
 * 物流运费模板
 */
export interface ILogisticsTemplate {
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
   * - `weight`: 重量
   * - `volume`: 体积
   * - `count`: 数量
   *
   * @see {@link ILogisticsCalcMode}
   */
  calcMode: ILogisticsCalcMode
  /**
   * 运费规则 (JSON)
   *
   * @see {@link ILogisticsTemplateRule}
   */
  rules: ILogisticsTemplateRule[]
  /**
   * 是否开启包邮规则 (Y:是  N:否)
   *
   * @see {@link IYesOrNo}
   */
  enableFreeRules: IYesOrNo
  /**
   * 包邮规则 (JSON)
   *
   * @see {@link ILogisticsTemplateFreeRule}
   */
  freeRules: ILogisticsTemplateFreeRule[]
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
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
 * @see {@link ILogisticsTemplate}
 */
export type ILogisticsTemplateListItem = Pick<
  ILogisticsTemplate,
  | 'id'
  | 'name'
  | 'desc'
  | 'sort'
  | 'calcMode'
  | 'enableFreeRules'
  | 'updatedTime'
>

/**
 * 物流运费模板 - 字典
 *
 * @see {@link ILogisticsTemplate}
 */
export type ILogisticsTemplateDict = Pick<
  ILogisticsTemplate,
  | 'id'
  | 'name'
>
