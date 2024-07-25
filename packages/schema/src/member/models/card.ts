import type { IEnabled } from '@/common'
import type { IMemberCardPlanType, IMemberCardType } from '@/member/types'

/**
 * 会员卡信息
 */
export interface IMemberCard {
  /**
   * 会员卡编号
   */
  id: number
  /**
   * 会员卡类型
   *
   * @see {@link IMemberCardType}
   */
  type: IMemberCardType
  /**
   * 会员卡状态
   *
   * @see {@link IEnabled}
   */
  isEnabled: IEnabled
  /**
   * 会员卡标识
   */
  key: string
  /**
   * 会员卡名称
   */
  name: string
  /**
   * 会员卡描述
   */
  desc: string
  /**
   * 会员卡样式
   *
   * @see {@link IMemberCardStyles}
   */
  styles: IMemberCardStyles
  /**
   * 会员卡套餐
   *
   * @see {@link IMemberCardPlan}
   */
  plans: IMemberCardPlan[]
  /**
   * 所需成长值
   */
  needExp: number
  /**
   * 会员折扣
   */
  discount: number
  /**
   * 获得积分倍率
   */
  pointsRatio: number
  /**
   * 是否包邮 (N:否 Y:是)
   */
  isFreeShipping: IEnabled
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 会员卡 - 属性
 */
export interface IMemberCardStyles {
  /**
   * 会员卡文本颜色
   */
  textColor: string
  /**
   * 会员卡背景颜色
   */
  bgColor: string
  /**
   * 会员卡背景图片
   */
  bgImage: string
}

/**
 * 会员卡 - 套餐 (超级会员卡)
 */
export interface IMemberCardPlan {
  /**
   * 会员卡套餐编号
   */
  id: number
  /**
   * 会员卡套餐类型
   *
   * @see {@link IMemberCardPlanType}
   */
  type: IMemberCardPlanType
  /**
   * 会员卡套餐有效期
   *
   * !根据类型不同，会员卡套餐有效期不同
   *
   * - `TIMES`: 指定次数
   * - `DAYS`: 指定天数
   * - `MONTHS`, `YEARS`: 统一转换为 `天` 计算 (30 天/月, 365 天/年)
   */
  duration: number
  /**
   * 会员卡套餐价格
   */
  price: number
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 会员卡套餐绑定信息
 */
export interface IMemberCardBinding {
  /**
   * 会员卡绑定 ID
   */
  id: number
  /**
   * 会员卡
   *
   * @see {@link IMemberCardInfo}
   */
  card: IMemberCardInfo
  /**
   * 会员卡套餐
   *
   * @see {@link IMemberCardPlanInfo}
   */
  plan: IMemberCardPlanInfo
  /**
   * 会员卡使用次数
   */
  times: number
  /**
   * 到期时间
   */
  dueTime: string
  /**
   * 生效时间
   */
  createdTime: string
}

/**
 * 会员卡套餐信息
 */
export type IMemberCardPlanInfo = Omit<IMemberCardPlan, 'createdTime'>

/**
 * 会员卡信息
 */
export type IMemberCardInfo = Omit<IMemberCard, 'plans' | 'createdTime'>

/**
 * 会员等级卡
 */
export type IMemberLevelCard = Omit<IMemberCard, 'plans'>

/**
 * 会员卡字典
 */
export type IMemberCardDict = Pick<IMemberCard, 'id' | 'type' | 'name'>
