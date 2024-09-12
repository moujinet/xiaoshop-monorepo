import type { YesOrNo } from '~/common'
import type {
  PromotionRuleType,
  PromotionStatus,
} from './constants'

/**
 * 促销活动信息
 */
export interface IPromotion {
  /**
   * 活动 ID
   */
  id: number
  /**
   * 活动状态
   *
   * @see {@link PromotionStatus}
   */
  status: PromotionStatus
  /**
   * 活动名称
   */
  name: string
  /**
   * 活动说明
   */
  desc: string
  /**
   * 活动规则
   *
   * @see {@link IPromotionRule}
   */
  rules: IPromotionRule[]
  /**
   * 开始时间
   */
  startTime: string
  /**
   * 结束时间
   */
  endTime: string
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
 * 促销活动规则
 */
export interface IPromotionRule {
  /**
   * 是否启用
   *
   * @see {@link YesOrNo}
   */
  isEnabled: YesOrNo
  /**
   * 活动规则名称
   */
  name: string
  /**
   * 活动规则说明
   */
  desc: string
  /**
   * 活动规则类型
   *
   * @see {@link PromotionRuleType}
   */
  type: PromotionRuleType
  /**
   * 达到金额
   */
  reachPrice: number
  /**
   * 达到数量
   */
  reachTotal: number
  /**
   * 折扣比例
   *
   * - 当 `type` 为 `PromotionRuleType.DISCOUNT` 时
   */
  discountRatio: number
  /**
   * 减免金额
   *
   * - 当 `type` 为 `PromotionRuleType.VOUCHER` 时
   */
  voucherValue: number
  /**
   * 适用商品分类
   */
  categories: number[]
  /**
   * 适用商品
   */
  products: number[]
  /**
   * 赠品
   */
  gifts: number[]
}
