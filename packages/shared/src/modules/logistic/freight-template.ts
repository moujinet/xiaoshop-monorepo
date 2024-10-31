import type { IDict, ILocationPath, YesOrNo } from '~/common'

/**
 * 运费模板信息
 */
export interface ILogisticFreightTemplateInfo {
  /**
   * 物流模板 ID
   */
  id: number
  /**
   * 是否启用
   */
  isEnabled: YesOrNo
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
   * @see LogisticFreightCalcMode
   */
  calcMode: IDict
  /**
   * 运费规则 (JSON)
   */
  rules: ILogisticFreightLocationRule[]
  /**
   * 是否开启包邮规则
   */
  enableFreeRules: YesOrNo
  /**
   * 包邮规则 (JSON)
   */
  freeRules: ILogisticFreightFreeRule[]
}

/**
 * 运费模板字典
 */
export type ILogisticFreightTemplateDict = Pick<
  ILogisticFreightTemplateInfo,
  | 'id'
  | 'name'
>

/**
 * 运费模板列表
 */
export type ILogisticFreightTemplateList = Pick<
  ILogisticFreightTemplateInfo,
  | 'id'
  | 'isEnabled'
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
 * 运费规则
 */
export interface ILogisticFreightLocationRule {
  /**
   * 配送地区
   *
   * @example
   * ```ts
   * [
   *   [
   *     {code: '11', name: '北京'}
   *   ]
   * ]
   * ```
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
 * 包邮规则
 */
export interface ILogisticFreightFreeRule {
  /**
   * 包邮地区
   *
   * @example
   * ```ts
   * [
   *   [
   *     {code: '11', name: '北京'}
   *   ]
   * ]
   * ```
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
