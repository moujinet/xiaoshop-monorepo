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
  { label: '后台创建', value: MemberSource.MANUAL, color: 'blue', icon: 'mingcute:layout' },
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
// 会员 - 会员账户状态
// -----------------------------------------------

/**
 * 枚举: 会员账户状态
 *
 * - `ENABLE`: 启用
 * - `DISABLE`: 停用
 */
export enum MemberAccountStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

/**
 * 字典: 会员账户状态
 *
 * @see {@link IMemberAccountStatus}
 */
export const MEMBER_ACCOUNT_STATUSES = [
  { label: '启用', value: MemberAccountStatus.ENABLE, color: 'green' },
  { label: '停用', value: MemberAccountStatus.DISABLE, color: 'gray' },
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
 * - `RED_PACKET`: 红包
 * - `COUPON`: 优惠券
 */
export enum MemberAccountKey {
  ORDERS = 'orders',
  ORDER_AMOUNT = 'order_amount',
  EXP = 'exp',
  POINTS = 'points',
  BALANCE = 'balance',
  SIGN_IN = 'sign_in',
  RED_PACKET = 'red_packet',
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
 * - `DAYS`: 天数
 * - `MONTHS`: 月数
 * - `YEARS`: 年数
 */
export enum MemberCardPlanType {
  TIMES = 'times',
  DAYS = 'days',
  MONTHS = 'months',
  YEARS = 'years',
}

/**
 * 字典: 会员卡套餐类型
 *
 * @see {@link IMemberCardPlanType}
 */
export const MEMBER_CARD_PLAN_TYPES = [
  { label: '次数', unit: '次', value: MemberCardPlanType.TIMES },
  { label: '天数', unit: '天', value: MemberCardPlanType.DAYS },
  { label: '月数', unit: '月', value: MemberCardPlanType.MONTHS },
  { label: '年数', unit: '年', value: MemberCardPlanType.YEARS },
]

// -----------------------------------------------
// 会员群体 - 筛选条件 - 条件项
// -----------------------------------------------

/**
 * 枚举: 会员群体 - 筛选条件 - 条件项
 *
 * - `CARD`: 会员卡
 * - `TAG`: 会员标签
 * - `GENDER`: 会员性别
 * - `BIRTHDAY`: 会员生日
 * - `CREATED_TIME`: 注册时间
 * - `POINTS`: 当前积分
 * - `EXP`: 当前成长值
 * - `SIGN_IN`: 累计签到数
 * - `ORDER_COUNT`: 累计订单数
 * - `ORDER_AMOUNT`: 累计订单金额
 */
export enum MemberGroupCondKey {
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
 * - `LOGOUT`: 已注销
 */
export enum MemberLogoutStatus {
  PENDING = 'pending',
  LOGOUT = 'logout',
}

/**
 * 字典: 会员注销申请 - 状态
 *
 * @see {@link IMemberLogoutStatus}
 */
export const MEMBER_LOGOUT_STATUSES = [
  { label: '待处理', value: MemberLogoutStatus.PENDING, color: 'blue' },
  { label: '已注销', value: MemberLogoutStatus.LOGOUT, color: 'gray' },
]

// -----------------------------------------------
// 会员 - 会员积分 - 变更类型
// -----------------------------------------------

/**
 * 枚举: 会员积分 - 变更类型
 *
 * - `ADD`: 增加
 * - `DEDUCT`: 扣除
 * - `SET`: 变更
 */
export enum MemberPointsOperator {
  ADD = 'add',
  DEDUCT = 'deduct',
  SET = 'set',
}

/**
 * 字典: 会员积分 - 变更类型
 *
 * @see {@link IMemberPointsOperator}
 */
export const MEMBER_POINTS_OPERATORS = [
  { label: '增加', value: MemberPointsOperator.ADD },
  { label: '扣除', value: MemberPointsOperator.DEDUCT },
  { label: '变更', value: MemberPointsOperator.SET },
]

// -----------------------------------------------
// 会员 - 会员积分规则 - 标识
// -----------------------------------------------

/**
 * 枚举: 会员积分规则标识
 *
 * - `REGISTER`: 注册奖励
 * - `ORDERING`: 消费奖励
 * - `BIRTHDAY`: 生日有礼
 * - `SIGN_IN`: 签到奖励
 * - `DEDUCTION`: 积分抵现
 */
export enum MemberPointsRuleKey {
  REGISTER = 'register',
  ORDERING = 'ordering',
  BIRTHDAY = 'birthday',
  SIGN_IN = 'sign_in',
  DEDUCTION = 'deduction',
}

/**
 * 字典: 会员积分规则 - 标识
 *
 * @see {@link IMemberPointsRuleKey}
 */
export const MEMBER_POINTS_RULE_KEYS = [
  { label: '注册奖励', value: MemberPointsRuleKey.REGISTER },
  { label: '消费奖励', value: MemberPointsRuleKey.ORDERING },
  { label: '生日有礼', value: MemberPointsRuleKey.BIRTHDAY },
  { label: '签到奖励', value: MemberPointsRuleKey.SIGN_IN },
  { label: '积分抵现', value: MemberPointsRuleKey.DEDUCTION },
]

// -----------------------------------------------
// 会员 - 会员日志 - 类型
// -----------------------------------------------

/**
 * 枚举: 会员日志 - 类型
 *
 * - `OPERATE`: 常规操作
 * - `VISIT`: 浏览商品
 * - `FAVORITE`: 收藏商品
 * - `POINTS`: 积分变动
 */
export enum MemberLogType {
  OPERATE = 'operate',
  VISIT = 'visit',
  FAVORITE = 'favorite',
  POINTS = 'points',
}

/**
 * 字典: 会员日志 - 类型
 *
 * @see {@link IMemberLogType}
 */
export const MEMBER_LOG_TYPES = [
  { label: '常规操作', value: MemberLogType.OPERATE },
  { label: '浏览商品', value: MemberLogType.VISIT },
  { label: '收藏商品', value: MemberLogType.FAVORITE },
  { label: '积分变动', value: MemberLogType.POINTS },
]
