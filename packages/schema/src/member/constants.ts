// -----------------------------------------------
// 会员 - 默认密码
// -----------------------------------------------

export const MEMBER_DEFAULT_PASSWORD = '123456'

// -----------------------------------------------
// 会员 - 会员状态
// -----------------------------------------------

/**
 * 枚举: 会员状态
 *
 * - `NORMAL`: 正常
 * - `BLOCKED`: 冻结
 */
export enum MemberStatus {
  NORMAL = 'normal',
  BLOCKED = 'blocked',
}

/**
 * 字典: 会员状态
 *
 * @see {@link IMemberStatus}
 */
export const MEMBER_STATUSES = [
  { label: '正常', value: MemberStatus.NORMAL, color: 'green' },
  { label: '冻结', value: MemberStatus.BLOCKED, color: 'gray' },
]

// -----------------------------------------------
// 会员 - 注册来源
// -----------------------------------------------

/**
 * 枚举: 会员注册来源
 *
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 * - `H5`: H5
 * - `MANUAL`: 手动创建
 * - `WEB`: 网站
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 */
export enum MemberSource {
  WECHAT_MP = 'wechat_mp',
  WECHAT_OA = 'wechat_oa',
  H5 = 'h5',
  MANUAL = 'manual',
  WEB = 'web',
  APP_ANDROID = 'android',
  APP_IOS = 'ios',
}

/**
 * 字典: 会员注册来源
 *
 * @see {@link IMemberSource}
 */
export const MEMBER_SOURCES = [
  { label: '微信小程序', value: MemberSource.WECHAT_MP, color: 'gray', icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: MemberSource.WECHAT_OA, color: 'green', icon: 'mingcute:wechat' },
  { label: 'H5', value: MemberSource.H5, color: 'blue', icon: 'mingcute:cellphone' },
  { label: '手动创建', value: MemberSource.MANUAL, color: 'blue', icon: 'mingcute:layout' },
  { label: '网站', value: MemberSource.WEB, color: 'blue', icon: 'mingcute:laptop' },
  { label: 'iOS APP', value: MemberSource.APP_IOS, color: 'gray', icon: 'mingcute:apple' },
  { label: 'Android APP', value: MemberSource.APP_ANDROID, color: 'cyan', icon: 'mingcute:android-2' },
]

// -----------------------------------------------
// 会员 - 会员性别
// -----------------------------------------------

/**
 * 枚举: 会员性别
 *
 * - `UNKNOWN`: 保密
 * - `MALE`: 先生
 * - `FEMALE`: 女士
 */
export enum MemberGender {
  UNKNOWN = 'unknown',
  MALE = 'male',
  FEMALE = 'female',
}

/**
 * 字典: 会员性别
 *
 * @see {@link IMemberGender}
 */
export const MEMBER_GENDERS = [
  { label: '保密', value: MemberGender.UNKNOWN, color: 'gray', icon: '' },
  { label: '先生', value: MemberGender.MALE, color: 'blue', icon: 'mingcute:male' },
  { label: '女士', value: MemberGender.FEMALE, color: 'red', icon: 'mingcute:female' },
]

// -----------------------------------------------
// 会员 - 会员账户标识
// -----------------------------------------------

/**
 * 枚举: 会员账户标识
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
 */
export enum MemberAccountKey {
  ORDERS = 'orders',
  ORDER_AMOUNT = 'orderAmount',
  EXP = 'exp',
  POINTS = 'points',
  BALANCE = 'balance',
  SIGN_IN = 'signIn',
  LOGIN = 'login',
  RED_PACKET = 'redPacket',
  COUPON = 'coupon',
}

/**
 * 字典: 会员账户标识
 *
 * @see {@link IMemberAccountKey}
 */
export const MEMBER_ACCOUNT_KEYS = [
  { label: '订单数', value: MemberAccountKey.ORDERS },
  { label: '消费金额', value: MemberAccountKey.ORDER_AMOUNT },
  { label: '成长值', value: MemberAccountKey.EXP },
  { label: '积分', value: MemberAccountKey.POINTS },
  { label: '余额', value: MemberAccountKey.BALANCE },
  { label: '签到', value: MemberAccountKey.SIGN_IN },
  { label: '登录次数', value: MemberAccountKey.LOGIN },
  { label: '红包', value: MemberAccountKey.RED_PACKET },
  { label: '优惠券', value: MemberAccountKey.COUPON },
]

// -----------------------------------------------
// 会员 - 会员卡类型
// -----------------------------------------------

/**
 * 枚举: 会员卡类型
 *
 * - `LEVEL`: 会员等级
 * - `CUSTOM`: 超级会员卡
 */
export enum MemberCardType {
  LEVEL = 'level',
  CUSTOM = 'custom',
}

/**
 * 字典: 会员卡类型
 *
 * @see {@link IMemberCardType}
 */
export const MEMBER_CARD_TYPES = [
  { label: '会员等级', value: MemberCardType.LEVEL },
  { label: '超级会员卡', value: MemberCardType.CUSTOM },
]

// -----------------------------------------------
// 会员 - 会员卡套餐类型
// -----------------------------------------------

/**
 * 枚举: 会员卡套餐类型
 *
 * - `TIMES`: 次数
 * - `DAY`: 天数
 * - `MONTH`: 月数
 * - `YEAR`: 年数
 */
export enum MemberCardPlanType {
  TIMES = 'times',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

/**
 * 字典: 会员卡套餐类型
 *
 * @see {@link IMemberCardPlanType}
 */
export const MEMBER_CARD_PLAN_TYPES = [
  { label: '次数', unit: '次', value: MemberCardPlanType.TIMES },
  { label: '天数', unit: '天', value: MemberCardPlanType.DAY },
  { label: '月数', unit: '月', value: MemberCardPlanType.MONTH },
  { label: '年数', unit: '年', value: MemberCardPlanType.YEAR },
]

// -----------------------------------------------
// 会员群体 - 筛选条件 - 条件项
// -----------------------------------------------

/**
 * 枚举: 会员群体 - 筛选条件 - 条件项
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
export enum MemberGroupCondKey {
  SOURCE = 'source',
  STATUS = 'status',
  CARD = 'card',
  TAG = 'tag',
  GENDER = 'gender',
  BIRTHDAY = 'birthday',
  CREATED_TIME = 'created_time',
  POINTS = 'points',
  EXP = 'exp',
  SIGN_IN = 'sign_in',
  ORDER_COUNT = 'order_count',
  ORDER_AMOUNT = 'order_amount',
}

/**
 * 字典: 会员群体 - 筛选条件
 *
 * @see {@link IMemberGroupCondKey}
 */
export const MEMBER_GROUP_COND_KEYS = [
  { label: '注册来源', value: MemberGroupCondKey.SOURCE },
  { label: '会员状态', value: MemberGroupCondKey.STATUS },
  { label: '会员等级', value: MemberGroupCondKey.CARD },
  { label: '会员标签', value: MemberGroupCondKey.TAG },
  { label: '会员性别', value: MemberGroupCondKey.GENDER },
  { label: '会员生日', value: MemberGroupCondKey.BIRTHDAY },
  { label: '注册时间', value: MemberGroupCondKey.CREATED_TIME },
  { label: '当前积分', value: MemberGroupCondKey.POINTS },
  { label: '当前成长值', value: MemberGroupCondKey.EXP },
  { label: '累计签到数', value: MemberGroupCondKey.SIGN_IN },
  { label: '累计订单数', value: MemberGroupCondKey.ORDER_COUNT },
  { label: '累计订单金额', value: MemberGroupCondKey.ORDER_AMOUNT },
]

// -----------------------------------------------
// 会员群体 - 筛选条件 - 操作符
// -----------------------------------------------

/**
 * 枚举: 会员群体 - 筛选条件 - 操作符
 *
 * - `IN`: 包含
 * - `NOT_IN`: 排除
 */
export enum MemberGroupCondOperator {
  IN = 'in',
  NOT_IN = 'not_in',
}

/**
 * 字典: 会员群体 - 筛选条件 - 操作符
 *
 * @see {@link IMemberGroupCondOperator}
 */
export const MEMBER_GROUP_COND_OPERATORS = [
  { label: '包含', value: MemberGroupCondOperator.IN },
  { label: '排除', value: MemberGroupCondOperator.NOT_IN },
]

// -----------------------------------------------
// 会员 - 会员注销 - 状态
// -----------------------------------------------

/**
 * 枚举: 会员注销申请 - 状态
 *
 * - `PENDING`: 待处理
 * - `APPROVED`: 已通过
 * - `REJECTED`: 已拒绝
 * - `LOGOUT`: 已注销
 */
export enum MemberLogoutStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  LOGOUT = 'logout',
}

/**
 * 字典: 会员注销申请 - 状态
 *
 * @see {@link IMemberLogoutStatus}
 */
export const MEMBER_LOGOUT_STATUSES = [
  { label: '待处理', value: MemberLogoutStatus.PENDING, color: 'blue' },
  { label: '已通过', value: MemberLogoutStatus.APPROVED, color: 'orange' },
  { label: '已拒绝', value: MemberLogoutStatus.REJECTED, color: 'red' },
  { label: '已注销', value: MemberLogoutStatus.LOGOUT, color: 'gray' },
]

// -----------------------------------------------
// 会员 - 历史记录 - 记录类型
// -----------------------------------------------

/**
 * 枚举: 历史记录类型
 *
 * - `VISIT`: 访问
 * - `FAVORITE`: 收藏
 */
export enum MemberHistoryLogType {
  VISIT = 'visit',
  FAVORITE = 'favorite',
}

/**
 * 字典: 历史记录类型
 *
 * @see {@link IMemberHistoryLogType}
 */
export const MEMBER_HISTORY_LOG_TYPES = [
  { label: '访问', value: MemberHistoryLogType.VISIT },
  { label: '收藏', value: MemberHistoryLogType.FAVORITE },
]

// -----------------------------------------------
// 会员 - 操作日志 - 操作类型
// -----------------------------------------------

/**
 * 枚举: 操作日志操作类型
 *
 * - `USER`: 用户
 * - `SYSTEM`: 系统
 */
export enum MemberOperationLogType {
  USER = 'user',
  SYSTEM = 'system',
}

/**
 * 字典: 操作日志操作类型
 *
 * @see {@link IMemberOperationLogType}
 */
export const MEMBER_OPERATION_LOG_TYPES = [
  { label: '用户', value: MemberOperationLogType.USER },
  { label: '系统', value: MemberOperationLogType.SYSTEM },
]
