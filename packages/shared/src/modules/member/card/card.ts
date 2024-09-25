import type { IDict, YesOrNo } from '~/common'

import type { MemberCardType } from '../constants'

/**
 * 会员卡信息
 */
export interface IMemberCardInfo {
  /**
   * 会员卡 ID
   */
  id: number
  /**
   * 是否启用
   */
  isEnabled: YesOrNo
  /**
   * 会员卡类型
   */
  type: MemberCardType
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
   * 会员卡卡片样式
   */
  cardStyle: IMemberCardStyle
  /**
   * 会员卡徽章样式
   */
  badgeStyle: IMemberCardBadgeStyle
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
   * 是否包邮
   */
  isFreeShipping: YesOrNo
  /**
   * 会员卡套餐
   */
  plans: IMemberCardPlanInfo[]
}

/**
 * 会员等级列表
 */
export type IMemberLevelCardList = Pick<
  IMemberCardInfo,
  | 'id'
  | 'isEnabled'
  | 'key'
  | 'name'
  | 'desc'
  | 'badgeStyle'
  | 'needExp'
  | 'discount'
  | 'pointsRatio'
  | 'isFreeShipping'
> & {
  /**
   * 开通会员数
   */
  total: number
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 超级会员卡列表
 */
export type IMemberCustomCardList = Pick<
  IMemberCardInfo,
  | 'id'
  | 'isEnabled'
  | 'key'
  | 'name'
  | 'desc'
  | 'badgeStyle'
  | 'needExp'
  | 'discount'
  | 'pointsRatio'
  | 'isFreeShipping'
  | 'plans'
> & {
  /**
   * 开通会员数
   */
  total: number
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 会员卡字典
 */
export type IMemberCardDict = Pick<
  IMemberCardInfo,
  | 'id'
  | 'type'
  | 'name'
>

/**
 * 会员卡套餐信息
 */
export interface IMemberCardPlanInfo {
  /**
   * 会员卡套餐 ID
   */
  id: number
  /**
   * 会员卡套餐类型
   *
   * @see {@link MemberCardPlanType}
   */
  type: IDict
  /**
   * 会员卡套餐有效期
   */
  due: number
  /**
   * 会员卡套餐价格
   */
  price: number
}

/**
 * 会员卡徽章样式
 */
export interface IMemberCardBadgeStyle {
  /**
   * 徽章图片
   */
  image: string
  /**
   * 徽章图标
   */
  icon: string
  /**
   * 徽章文本颜色
   */
  textColor: string
  /**
   * 徽章背景颜色
   */
  bgColor: string
}

/**
 * 会员卡卡片样式
 */
export interface IMemberCardStyle {
  /**
   * 会员卡图片
   */
  image: string
  /**
   * 图标
   */
  icon: string
  /**
   * 文本颜色
   */
  textColor: string
  /**
   * 背景颜色
   */
  bgColor: string
  /**
   * 背景图片
   */
  bgImage: string
}
