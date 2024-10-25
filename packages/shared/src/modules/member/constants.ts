// --------------------------------
// 会员 - 会员状态
// --------------------------------

/**
 * 会员状态 - 枚举
 *
 * - `NORMAL`: 正常
 * - `LOCKED`: 锁定
 * - `BLOCKED`: 冻结
 */
export enum MemberStatus {
  NORMAL = 1,
  LOCKED,
  BLOCKED,
}

// --------------------------------
// 会员 - 注册来源
// --------------------------------

/**
 * 会员注册来源 - 枚举
 *
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 * - `H5`: 手机端
 * - `MANUAL`: 后台创建
 * - `WEB`: 网页端
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 */
export enum MemberSource {
  WECHAT_MP = 1,
  WECHAT_OA,
  H5,
  MANUAL,
  WEB,
  APP_ANDROID,
  APP_IOS,
}

// --------------------------------
// 会员 - 会员性别
// --------------------------------

/**
 * 会员性别 - 枚举
 *
 * - `UNKNOWN`: 保密
 * - `MALE`: 先生
 * - `FEMALE`: 女士
 */
export enum MemberGender {
  UNKNOWN,
  MALE,
  FEMALE,
}

// --------------------------------
// 会员 - 账户标识
// --------------------------------

/**
 * 会员账户标识 - 枚举
 *
 * - `EXP`: 成长值
 * - `POINTS`: 积分值
 * - `BALANCE`: 当前余额
 */
export enum MemberAccountKey {
  EXP = 'exp',
  POINTS = 'points',
  BALANCE = 'balance',
}

// --------------------------------
// 会员 - 账户变更类型
// --------------------------------

/**
 * 会员账户变更类型 - 枚举
 *
 * - `ADD`: 增加
 * - `SUB`: 减少
 * - `SET`: 设置
 */
export enum MemberAccountChangeMethod {
  ADD = 1,
  SUB,
  SET,
}

// --------------------------------
// 会员 - 会员卡类型
// --------------------------------

/**
 * 会员卡类型 - 枚举
 *
 * - `LEVEL`: 会员等级
 * - `CUSTOM`: 超级会员卡
 */
export enum MemberCardType {
  LEVEL = 1,
  CUSTOM,
}

// --------------------------------
// 会员 - 会员卡套餐类型
// --------------------------------

/**
 * 会员卡套餐类型 - 枚举
 *
 * - `TIMES`: 次数
 * - `DAY`: 天数
 * - `MONTH`: 月数
 * - `YEAR`: 年数
 */
export enum MemberCardPlanType {
  TIMES = 1,
  DAY,
  MONTH,
  YEAR,
}

// --------------------------------
// 会员 - 会员卡升级方式
// --------------------------------

/**
 * 会员卡升级方式 - 枚举
 *
 * - `BINDING`: 绑定
 * - `UPGRADE`: 开通
 * - `LEVEL_UP`: 升级
 */
export enum MemberCardUpgradeMethod {
  BINDING = 1,
  UPGRADE,
  LEVEL_UP,
}

// --------------------------------
// 会员群体 - 筛选条件 - 条件项
// --------------------------------
// TODO: 移除
/**
 * 会员群体筛选条件项 - 枚举
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
 */
export enum MemberGroupFilterKey {
  SOURCE = 1,
  STATUS,
  CARD,
  TAG,
  GENDER,
  BIRTHDAY,
  CREATED_TIME,
  POINTS,
  EXP,
  SIGN_IN,
  ORDER_COUNT,
  ORDER_AMOUNT,
}

// --------------------------------
// 会员群体 - 筛选条件 - 操作符
// --------------------------------

/**
 * 会员群体筛选条件操作符 - 枚举
 *
 * - `IN`: 包含
 * - `NOT_IN`: 排除
 */
export enum MemberGroupFilterOperator {
  IN = 1,
  NOT_IN,
}

// --------------------------------
// 会员 - 会员注销 - 状态
// --------------------------------

/**
 * 会员注销申请状态 - 枚举
 *
 * - `PENDING`: 待处理
 * - `APPROVED`: 已通过
 * - `REJECTED`: 已拒绝
 * - `FINISHED`: 已注销
 */
export enum MemberUnregisterStatus {
  PENDING,
  APPROVED,
  REJECTED,
  FINISHED,
}

// --------------------------------
// 会员积分 - 规则标识
// --------------------------------

/**
 * 会员积分规则标识 - 枚举
 *
 * - `REGISTER`: 注册奖励
 * - `ORDER`: 消费奖励
 * - `BIRTHDAY`: 生日有礼
 * - `SIGN_IN`: 签到奖励
 * - `DEDUCT`: 积分抵现
 * - `INVITE`: 邀请奖励
 */
export enum MemberPointsRuleKey {
  REGISTER = 'register',
  ORDER = 'order',
  BIRTHDAY = 'birthday',
  SIGN_IN = 'signIn',
  DEDUCT = 'deduct',
  INVITE = 'invite',
}
