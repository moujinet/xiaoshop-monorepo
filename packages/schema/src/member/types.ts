import type {
  MemberAccountKeyEnum,
  MemberAccountStatusEnum,
  MemberCardPlanTypeEnum,
  MemberCardTypeEnum,
  MemberGenderEnum,
  MemberGroupCondKeyEnum,
  MemberGroupCondOperatorEnum,
  MemberLogTypeEnum,
  MemberLogoutStatusEnum,
  MemberPointsOperatorEnum,
  MemberPointsRuleKeyEnum,
  MemberSourceEnum,
  MemberStatusEnum,
} from '@/member/constants'

/**
 * 会员 - 状态
 *
 * - `NORMAL`: 正常
 * - `BLOCKED`: 冻结
 *
 * @see {@link MemberStatusEnum}
 */
export type IMemberStatus = MemberStatusEnum

/**
 * 会员 - 注册来源
 *
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 * - `H5`: H5
 * - `IMPORT`: 批量导入
 * - `MANUAL`: 后台创建
 * - `WEB`: 网站
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 *
 * @see {@link MemberSourceEnum}
 */
export type IMemberSource = MemberSourceEnum

/**
 * 会员 - 性别
 *
 * - `UNKNOWN`: 保密
 * - `MALE`: 先生
 * - `FEMALE`: 女士
 *
 * @see {@link MemberGenderEnum}
 */
export type IMemberGender = MemberGenderEnum

/**
 * 会员账户 - 状态
 *
 * - `ENABLE`: 启用
 * - `DISABLE`: 禁用
 *
 * @see {@link MemberAccountStatusEnum}
 */
export type IMemberAccountStatus = MemberAccountStatusEnum

/**
 * 会员账户 - 标识
 *
 * - `ORDERS`: 订单数
 * - `ORDER_AMOUNT`: 消费金额
 * - `EXP`: 成长值
 * - `POINTS`: 积分
 * - `BALANCE`: 余额
 * - `SIGN_IN`: 签到
 * - `RED_PACKET`: 红包
 * - `COUPON`: 优惠券
 *
 * @see {@link MemberAccountKeyEnum}
 */
export type IMemberAccountKey = MemberAccountKeyEnum

/**
 * 会员卡 - 类型
 *
 * - `LEVEL`: 会员卡
 * - `CUSTOM`: 自定义
 *
 * @see {@link MemberCardTypeEnum}
 */
export type IMemberCardType = MemberCardTypeEnum

/**
 * 会员卡 - 套餐类型
 *
 * - `TIMES`: 按次数
 * - `DAYS`: 按天
 * - `MONTHS`: 按月
 * - `YEARS`: 按年
 *
 * @see {@link MemberCardPlanTypeEnum}
 */
export type IMemberCardPlanType = MemberCardPlanTypeEnum

/**
 * 会员积分 - 变更类型
 *
 * - `ADD`: 增加
 * - `DEDUCT`: 扣除
 * - `SET`: 设置
 *
 * @see {@link MemberPointsOperatorEnum}
 */
export type IMemberPointsOperator = MemberPointsOperatorEnum

/**
 * 会员积分规则 - 标识
 *
 * - `REGISTER`: 注册奖励
 * - `ORDERING`: 消费奖励
 * - `BIRTHDAY`: 生日有礼
 * - `SIGN_IN`: 签到奖励
 * - `DEDUCTION`: 积分抵扣
 *
 * @see {@link MemberPointsRuleKeyEnum}
 */
export type IMemberPointsRuleKey = MemberPointsRuleKeyEnum

/**
 * 会员群体 - 筛选条件 - 操作符
 *
 * - `IN`: 包含
 * - `NOT_IN`: 排除
 *
 * @see {@link MemberGroupCondOperatorEnum}
 */
export type IMemberGroupCondOperator = MemberGroupCondOperatorEnum

/**
 * 会员群体 - 筛选条件
 *
 * - `CARD`: 会员卡
 * - `TAG`: 标签
 * - `GENDER`: 性别
 * - `BIRTHDAY`: 生日
 * - `CREATED_TIME`: 注册时间
 * - `POINTS`: 积分
 * - `EXP`: 成长值
 * - `SIGN_IN`: 签到
 * - `ORDER_COUNT`: 订单数
 * - `ORDER_AMOUNT`: 订单金额
 *
 * @see {@link MemberGroupCondKeyEnum}
 */
export type IMemberGroupCondKey = MemberGroupCondKeyEnum

/**
 * 会员注销申请 - 状态
 *
 * - `PENDING`: 待处理
 * - `LOGOUT`: 已注销
 *
 * @see {@link MemberLogoutStatusEnum}
 */
export type IMemberLogoutStatus = MemberLogoutStatusEnum

/**
 * 会员日志 - 类型
 *
 * - `OPERATE`: 常规操作
 * - `VISIT`: 浏览商品
 * - `FAVORITE`: 收藏商品
 * - `POINTS`: 积分变动
 *
 * @see {@link MemberLogTypeEnum}
 */
export type IMemberLogType = MemberLogTypeEnum
