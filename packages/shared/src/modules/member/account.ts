import type {
  MemberGender,
  MemberSource,
  MemberStatus,
} from './constants'
import type { IMemberTagDict } from './tag'
import type { IMemberGroupDict } from './group'
import type { IMemberBindingInfo } from './binding'
import type { ILocationPath } from '~/common'

/**
 * 会员账户信息
 */
export interface IMemberAccount {
  /**
   * 会员 ID
   */
  id: number
  /**
   * 会员状态
   *
   * @see {@link MemberStatus}
   */
  status: MemberStatus
  /**
   * 注册来源
   *
   * @see {@link MemberSource}
   */
  source: MemberSource
  /**
   * 会员标签
   *
   * @see {@link IMemberTagDict}
   */
  tags: IMemberTagDict[]
  /**
   * 会员群体 ID
   */
  groupId: number
  /**
   * 会员群体
   *
   * @see {@link IMemberGroupDict}
   */
  group: IMemberGroupDict
  /**
   * 会员卡绑定 ID
   */
  cardId: number
  /**
   * 绑定会员卡
   *
   * @see {@link IMemberBindingInfo}
   */
  card: IMemberBindingInfo
  /**
   * 会员卡号
   */
  cardNo: string
  /**
   * 会员头像
   */
  avatar: string
  /**
   * 会员账号
   */
  username: string
  /**
   * 会员昵称
   */
  nickname: string
  /**
   * 会员手机号
   */
  mobile: string
  /**
   * 会员密码
   */
  password: string
  /**
   * 会员密码盐值
   */
  salt: string
  /**
   * 会员生日
   */
  birthday: string
  /**
   * 会员性别
   *
   * @see {@link MemberGender}
   */
  gender: MemberGender
  /**
   * 注册城市
   *
   * @example `[{ code: '11', name: '北京' }, { code: '1100', name: '市区' }]`
   * @see {@link ILocationPath}
   */
  location: ILocationPath
  /**
   * 会员成长值
   */
  exp: number
  /**
   * 会员积分
   */
  points: number
  /**
   * 账户余额
   */
  balance: number
  /**
   * 订单数
   */
  orders: number
  /**
   * 消费金额
   */
  orderAmount: number
  /**
   * 签到次数
   */
  signInTimes: number
  /**
   * 登录次数
   */
  loginTimes: number
  /**
   * 红包数量
   */
  redPacket: number
  /**
   * 优惠券数量
   */
  coupon: number
  /**
   * 注册时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
  /**
   * 锁定时间
   */
  lockedTime: string
  /**
   * 最后消费时间
   */
  lastOrderTime: string
  /**
   * 最后签到时间
   */
  lastSignInTime: string
  /**
   * 最后登录时间
   */
  lastLoginTime: string
}

/**
 * 会员账户值
 *
 * @see {@link IMemberAccount}
 */
export type IMemberAccountValues = Pick<
  IMemberAccount,
  | 'exp'
  | 'points'
  | 'balance'
  | 'orders'
  | 'orderAmount'
  | 'redPacket'
  | 'coupon'
  | 'signInTimes'
  | 'loginTimes'
>

/**
 * 会员账户名
 *
 * @see {@link IMemberAccountValues}
 */
export type IMemberAccountKeys = keyof IMemberAccountValues

/**
 * 会员账户信息
 *
 * @see {@link IMemberAccount}
 */
export type IMemberAccountInfo = Pick<
  IMemberAccount,
  | 'id'
  | 'status'
  | 'tags'
  | 'group'
  | 'card'
  | 'cardNo'
  | 'avatar'
  | 'nickname'
  | 'gender'
  | 'birthday'
  | 'location'
>

/**
 * 会员资料
 *
 * @see {@link IMemberAccountInfo}
 */
export type IMemberProfile = IMemberAccountInfo & Pick<
  IMemberAccount,
  | 'source'
  | 'username'
  | 'mobile'
  | 'exp'
  | 'points'
  | 'balance'
  | 'orders'
  | 'orderAmount'
  | 'redPacket'
  | 'coupon'
  | 'createdTime'
  | 'lastLoginTime'
  | 'lastOrderTime'
  | 'lastSignInTime'
>

/**
 * 会员账户列表
 *
 * @see {@link IMemberAccountInfo}
 */
export type IMemberAccountListItem = IMemberAccountInfo & Pick<
  IMemberAccount,
  | 'source'
  | 'points'
  | 'orders'
  | 'orderAmount'
  | 'lastLoginTime'
>

export type IMemberAccountNotificationInfo = Pick<
  IMemberAccount,
  | 'nickname'
  | 'mobile'
>

/**
 * 登录会员账户信息
 *
 * @see {@link IMemberAccountInfo}
 */
export type IMemberLoginInfo = IMemberAccountInfo & Pick<
  IMemberAccount,
  | 'username'
  | 'exp'
  | 'points'
  | 'balance'
  | 'orders'
  | 'orderAmount'
  | 'redPacket'
  | 'coupon'
  | 'lastLoginTime'
>

/**
 * 会员登录鉴权信息
 *
 * @see {@link IMemberAccountLoginInfo}
 */
export type IMemberAuthInfo = IMemberLoginInfo & Pick<
  IMemberAccount,
  | 'password'
  | 'salt'
>
