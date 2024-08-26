import type {
  MemberAccountChangeType,
  MemberCardPlanType,
  MemberCardType,
  MemberGender,
  MemberGroupCondKey,
  MemberGroupCondOperator,
  MemberPointsRuleKey,
  MemberSource,
  MemberStatus,
  MemberUnregisterStatus,
} from './constants'

// --------------------------------
// 会员 - 资料
// --------------------------------

/**
 * 会员状态
 *
 * - `normal`: 正常
 * - `locked`: 锁定
 * - `blocked`: 冻结
 *
 * @see {@link MemberStatus}
 */
export type IMemberStatus = `${MemberStatus}`

/**
 * 会员注册来源
 *
 * - `wechat_mp`: 微信小程序
 * - `wechat_oa`: 微信公众号
 * - `h5`: 手机端
 * - `manual`: 后台创建
 * - `web`: 网页端
 * - `android`: Android APP
 * - `ios`: iOS APP
 *
 * @see {@link MemberSource}
 */
export type IMemberSource = `${MemberSource}`

/**
 * 会员性别
 *
 * - `unknown`: 保密
 * - `male`: 先生
 * - `female`: 女士
 *
 * @see {@link MemberGender}
 */
export type IMemberGender = `${MemberGender}`

/**
 * 会员账户变动类型
 *
 * - `add`: 增加
 * - `sub`: 减少
 * - `set`: 设置
 *
 * @see {@link MemberAccountChangeType}
 */
export type IMemberAccountChangeType = `${MemberAccountChangeType}`

// --------------------------------
// 会员 - 会员卡
// --------------------------------

/**
 * 会员卡类型
 *
 * - `level`: 会员等级
 * - `custom`: 超级会员卡
 *
 * @see {@link MemberCardType}
 */
export type IMemberCardType = `${MemberCardType}`

/**
 * 会员卡套餐类型
 *
 * - `times`: 次卡
 * - `day`: 天卡
 * - `month`: 月卡
 * - `year`: 年卡
 *
 * @see {@link MemberCardPlanType}
 */
export type IMemberCardPlanType = `${MemberCardPlanType}`

// --------------------------------
// 会员 - 会员群体
// --------------------------------

/**
 * 会员群体条件标识
 *
 * - `source`: 注册来源 [web]
 * - `status`: 会员状态 [normal, blocked]
 * - `card`: 会员卡 [CardId, cardPlanId]
 * - `tag`: 会员标签 [tagId]
 * - `gender`: 会员性别 [male]
 * - `birthday`: 会员生日 [from, to]
 * - `created_time`: 注册时间 [from, to]
 * - `points`: 当前积分 [min, max]
 * - `exp`: 当前成长值 [min, max]
 * - `sign_in`: 累计签到数 [min, max]
 * - `order_count`: 累计订单数 [min, max]
 * - `order_amount`: 累计订单金额 [min, max]
 *
 * @see {@link MemberGroupCondKey}
 */
export type IMemberGroupCondKey = `${MemberGroupCondKey}`

/**
 * 会员群体条件运算符
 *
 * - `in`: 包含
 * - `not_in`: 不包含
 *
 * @see {@link MemberGroupCondOperator}
 */
export type IMemberGroupCondOperator = `${MemberGroupCondOperator}`

// --------------------------------
// 会员 - 会员积分
// --------------------------------

/**
 * 会员积分规则标识
 *
 * - `REGISTER`: 注册奖励
 * - `ORDER`: 消费奖励
 * - `BIRTHDAY`: 生日有礼
 * - `SIGN_IN`: 签到奖励
 * - `DEDUCT`: 积分抵现
 *
 * @see {@link MemberPointsRuleKey}
 */
export type IMemberPointsRuleKey = `${MemberPointsRuleKey}`

// --------------------------------
// 会员 - 会员注销
// --------------------------------

/**
 * 会员注销状态
 *
 * - `pending`: 待处理
 * - `approved`: 已通过
 * - `rejected`: 已拒绝
 * - `finished`: 已注销
 *
 * @see {@link MemberUnregisterStatus}
 */
export type IMemberUnregisterStatus = `${MemberUnregisterStatus}`
