// --------------------------------
// 会员默认密码
// --------------------------------

export const MEMBER_DEFAULT_PASSWORD = '123456'

// --------------------------------
// 会员 - 会员状态
// --------------------------------

/**
 * 会员状态 - 枚举
 *
 * - `NORMAL`: 正常
 * - `LOCKED`: 锁定
 * - `BLOCKED`: 冻结
 *
 * @see {@link IMemberStatus}
 */
export enum MemberStatus {
  NORMAL = 'normal',
  LOCKED = 'locked',
  BLOCKED = 'blocked',
}

/**
 * 会员状态 - 字典
 *
 * @see {@link IMemberStatus}
 */
export const MEMBER_STATUSES = [
  { label: '正常', value: MemberStatus.NORMAL, color: 'green' },
  { label: '锁定', value: MemberStatus.LOCKED, color: 'red' },
  { label: '冻结', value: MemberStatus.BLOCKED, color: 'gray' },
]

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
 *
 * @see {@link IMemberSource}
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
 * 会员注册来源 - 字典
 *
 * @see {@link IMemberSource}
 */
export const MEMBER_SOURCES = [
  { label: '微信小程序', value: MemberSource.WECHAT_MP, color: 'gray', icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: MemberSource.WECHAT_OA, color: 'green', icon: 'mingcute:wechat' },
  { label: '手机端', value: MemberSource.H5, color: 'blue', icon: 'mingcute:cellphone' },
  { label: '后台创建', value: MemberSource.MANUAL, color: 'blue', icon: 'mingcute:layout' },
  { label: '网页端', value: MemberSource.WEB, color: 'blue', icon: 'mingcute:laptop' },
  { label: 'iOS APP', value: MemberSource.APP_IOS, color: 'gray', icon: 'mingcute:apple' },
  { label: 'Android APP', value: MemberSource.APP_ANDROID, color: 'cyan', icon: 'mingcute:android-2' },
]

// --------------------------------
// 会员 - 会员性别
// --------------------------------

/**
 * 会员性别 - 枚举
 *
 * - `UNKNOWN`: 保密
 * - `MALE`: 先生
 * - `FEMALE`: 女士
 *
 * @see {@link IMemberGender}
 */
export enum MemberGender {
  UNKNOWN = 'unknown',
  MALE = 'male',
  FEMALE = 'female',
}

/**
 * 会员性别 - 字典
 *
 * @see {@link IMemberGender}
 */
export const MEMBER_GENDERS = [
  { label: '保密', value: MemberGender.UNKNOWN, color: 'gray', icon: '' },
  { label: '先生', value: MemberGender.MALE, color: 'blue', icon: 'mingcute:male' },
  { label: '女士', value: MemberGender.FEMALE, color: 'red', icon: 'mingcute:female' },
]

// --------------------------------
// 会员 - 账户变更类型
// --------------------------------

/**
 * 会员账户变更类型 - 枚举
 *
 * - `ADD`: 增加
 * - `SUB`: 减少
 * - `SET`: 设置
 *
 * @see {@link IMemberAccountChangeType}
 */
export enum MemberAccountChangeType {
  ADD = 'add',
  SUB = 'sub',
  SET = 'set',
}

/**
 * 会员账户变更类型 - 字典
 *
 * @see {@link MemberAccountChangeType}
 */
export const MEMBER_ACCOUNT_CHANGE_TYPES = [
  { label: '增加', value: MemberAccountChangeType.ADD },
  { label: '减少', value: MemberAccountChangeType.SUB },
  { label: '设置', value: MemberAccountChangeType.SET },
]

// --------------------------------
// 会员 - 会员账户名
// --------------------------------

/**
 * 会员账户名 - 字典
 *
 * - `points`: 积分
 * - `exp`: 成长值
 * - `balance`: 账户余额
 * - `orders`: 累计订单数
 * - `orderAmount`: 累计订单金额
 * - `redPacket`: 红包数量
 * - `coupon`: 优惠券数量
 * - `signInTimes`: 签到次数
 * - `loginTime`: 登录次数
 *
 * @see {@link IMemberAccountKeys}
 */
export const MEMBER_ACCOUNT_KEYS = [
  { label: '积分', value: 'points' },
  { label: '成长值', value: 'exp' },
  { label: '账户余额', value: 'balance' },
  { label: '累计订单数', value: 'orders' },
  { label: '累计订单金额', value: 'orderAmount' },
  { label: '红包数量', value: 'redPacket' },
  { label: '优惠券数量', value: 'coupon' },
  { label: '签到次数', value: 'signInTimes' },
  { label: '登录次数', value: 'loginTime' },
]

// --------------------------------
// 会员 - 会员卡类型
// --------------------------------

/**
 * 会员卡类型 - 枚举
 *
 * - `LEVEL`: 会员等级
 * - `CUSTOM`: 超级会员卡
 *
 * @see {@link IMemberCardType}
 */
export enum MemberCardType {
  LEVEL = 'level',
  CUSTOM = 'custom',
}

/**
 * 会员卡类型 - 字典
 *
 * @see {@link IMemberCardType}
 */
export const MEMBER_CARD_TYPES = [
  { label: '会员等级', value: MemberCardType.LEVEL },
  { label: '超级会员卡', value: MemberCardType.CUSTOM },
]

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
 *
 * @see {@link IMemberCardPlanType}
 */
export enum MemberCardPlanType {
  TIMES = 'times',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

/**
 * 会员卡套餐类型 - 字典
 *
 * @see {@link IMemberCardPlanType}
 */
export const MEMBER_CARD_PLAN_TYPES = [
  { label: '次数', name: '次卡', unit: '次', value: MemberCardPlanType.TIMES },
  { label: '天数', name: '日卡', unit: '天', value: MemberCardPlanType.DAY },
  { label: '月数', name: '月卡', unit: '月', value: MemberCardPlanType.MONTH },
  { label: '年数', name: '年卡', unit: '年', value: MemberCardPlanType.YEAR },
]

// --------------------------------
// 会员群体 - 筛选条件 - 条件项
// --------------------------------

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
 *
 * @see {@link IMemberGroupCondKey}
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
 * 会员群体筛选条件项 - 字典
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

// --------------------------------
// 会员群体 - 筛选条件 - 操作符
// --------------------------------

/**
 * 会员群体筛选条件操作符 - 枚举
 *
 * - `IN`: 包含
 * - `NOT_IN`: 排除
 *
 * @see {@link IMemberGroupCondOperator}
 */
export enum MemberGroupCondOperator {
  IN = 'in',
  NOT_IN = 'not_in',
}

/**
 * 会员群体筛选条件操作符 - 字典
 *
 * @see {@link IMemberGroupCondOperator}
 */
export const MEMBER_GROUP_COND_OPERATORS = [
  { label: '包含', value: MemberGroupCondOperator.IN },
  { label: '排除', value: MemberGroupCondOperator.NOT_IN },
]

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
 *
 * @see {@link IMemberUnregisterStatus}
 */
export enum MemberUnregisterStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FINISHED = 'finished',
}

/**
 * 会员注销申请状态 - 字典
 *
 * @see {@link IMemberUnregisterStatus}
 */
export const MEMBER_UNREGISTER_STATUSES = [
  { label: '待处理', value: MemberUnregisterStatus.PENDING, color: 'blue' },
  { label: '已通过', value: MemberUnregisterStatus.APPROVED, color: 'orange' },
  { label: '已拒绝', value: MemberUnregisterStatus.REJECTED, color: 'red' },
  { label: '已注销', value: MemberUnregisterStatus.FINISHED, color: 'gray' },
]

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
 *
 * @see {@link IMemberPointsRuleKey}
 */
export enum MemberPointsRuleKey {
  REGISTER = 'register',
  ORDER = 'order',
  BIRTHDAY = 'birthday',
  SIGN_IN = 'signIn',
  DEDUCT = 'deduct',
}

/**
 * 会员积分规则标识 - 字典
 *
 * @see {@link IMemberPointsRuleKey}
 */
export const MEMBER_POINTS_RULE_KEYS = [
  { label: '注册奖励', desc: '注册会员时赠送的积分', icon: 'mingcute:user-add-2', value: MemberPointsRuleKey.REGISTER },
  { label: '消费奖励', desc: '会员消费时, 赠送消费金额 100% 的积分', icon: 'mingcute:shopping-bag-3', value: MemberPointsRuleKey.ORDER },
  { label: '生日有礼', desc: '会员生日时赠送的积分', icon: 'mingcute:birthday-2', value: MemberPointsRuleKey.BIRTHDAY },
  { label: '签到奖励', desc: '会员签到时赠送的积分', icon: 'mingcute:checkbox', value: MemberPointsRuleKey.SIGN_IN },
  { label: '积分抵现', desc: '会员消费时, 积分抵扣一定金额', icon: 'mingcute:cash', value: MemberPointsRuleKey.DEDUCT },
]
