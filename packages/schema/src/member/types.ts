import type {
  MemberAccountKey,
  MemberCardPlanType,
  MemberCardType,
  MemberGender,
  MemberGroupCondKey,
  MemberGroupCondOperator,
  MemberLogoutStatus,
  MemberPointsOperator,
  MemberPointsRuleKey,
  MemberSource,
  MemberStatus,
} from '@/member/constants'

/**
 * 会员 - 状态
 *
 * - `NORMAL`: 正常
 * - `BLOCKED`: 冻结
 *
 * @see {@link MemberStatus}
 */
export type IMemberStatus = `${MemberStatus}` | MemberStatus

/**
 * 会员 - 注册来源
 *
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 * - `H5`: H5
 * - `MANUAL`: 后台创建
 * - `WEB`: 网站
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 *
 * @see {@link MemberSource}
 */
export type IMemberSource = `${MemberSource}` | MemberSource

/**
 * 会员 - 性别
 *
 * - `UNKNOWN`: 保密
 * - `MALE`: 先生
 * - `FEMALE`: 女士
 *
 * @see {@link MemberGender}
 */
export type IMemberGender = `${MemberGender}` | MemberGender

/**
 * 会员账户 - 标识
 *
 * - `ORDERS`: 订单数
 * - `ORDER_AMOUNT`: 消费金额
 * - `EXP`: 成长值
 * - `POINTS`: 积分
 * - `BALANCE`: 余额
 * - `SIGN_IN`: 签到
 * - `LOGIN`: 登录次数
 * - `RED_PACKET`: 红包
 * - `COUPON`: 优惠券
 *
 * @see {@link MemberAccountKey}
 */
export type IMemberAccountKey = `${MemberAccountKey}` | MemberAccountKey

/**
 * 会员卡 - 类型
 *
 * - `LEVEL`: 会员卡
 * - `CUSTOM`: 自定义
 *
 * @see {@link MemberCardType}
 */
export type IMemberCardType = `${MemberCardType}` | MemberCardType

/**
 * 会员卡 - 套餐类型
 *
 * - `TIMES`: 按次数
 * - `DAYS`: 按天
 * - `MONTHS`: 按月
 * - `YEARS`: 按年
 *
 * @see {@link MemberCardPlanType}
 */
export type IMemberCardPlanType = `${MemberCardPlanType}` | MemberCardPlanType

/**
 * 会员积分 - 变更类型
 *
 * - `ADD`: 增加
 * - `DEDUCT`: 扣除
 * - `SET`: 设置
 *
 * @see {@link MemberPointsOperator}
 */
export type IMemberPointsOperator = `${MemberPointsOperator}` | MemberPointsOperator

/**
 * 会员积分规则 - 标识
 *
 * - `REGISTER`: 注册奖励
 * - `ORDERING`: 消费奖励
 * - `BIRTHDAY`: 生日有礼
 * - `SIGN_IN`: 签到奖励
 * - `DEDUCTION`: 积分抵扣
 *
 * @see {@link MemberPointsRuleKey}
 */
export type IMemberPointsRuleKey = `${MemberPointsRuleKey}` | MemberPointsRuleKey

/**
 * 会员群体 - 筛选条件 - 操作符
 *
 * - `IN`: 包含
 * - `NOT_IN`: 排除
 *
 * @see {@link MemberGroupCondOperator}
 */
export type IMemberGroupCondOperator = `${MemberGroupCondOperator}` | MemberGroupCondOperator

/**
 * 会员群体 - 筛选条件
 *
 * - `SOURCE`: 注册来源 [web]
 * - `STATUS`: 会员状态 [normal, blocked]
 * - `CARD`: 会员卡 [cardId, cardPlanId]
 * - `TAG`: 会员标签 [tagId]
 * - `GENDER`: 会员性别 [male]
 * - `BIRTHDAY`: 会员生日 [from, to]
 * - `CREATED_TIME`: 注册时间 [from, to]
 * - `POINTS`: 当前积分 [min, max]
 * - `EXP`: 当前成长值 [min, max]
 * - `SIGN_IN`: 累计签到数 [min, max]
 * - `ORDER_COUNT`: 累计订单数 [min, max]
 * - `ORDER_AMOUNT`: 累计订单金额 [min, max]
 *
 * @see {@link MemberGroupCondKey}
 */
export type IMemberGroupCondKey = `${MemberGroupCondKey}` | MemberGroupCondKey

/**
 * 会员注销申请 - 状态
 *
 * - `PENDING`: 待处理
 * - `LOGOUT`: 已注销
 *
 * @see {@link MemberLogoutStatus}
 */
export type IMemberLogoutStatus = `${MemberLogoutStatus}` | MemberLogoutStatus
