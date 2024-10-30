import type { IMemberTagInfo } from '../tag'
import type { IMemberGroupDict } from '../group'
import type { IMemberAccountInfo } from './account'
import type { IMemberBindCard } from '../card/bind'
import type { IDict, ILocationPath } from '~/common'

/**
 * 会员信息
 */
export interface IMemberProfileInfo {
  /**
   * 会员 ID
   */
  id: number
  /**
   * 会员状态
   *
   * @see {@link MemberStatus}
   */
  status: IDict
  /**
   * 注册来源
   *
   * @see {@link MemberSource}
   */
  source: IDict
  /**
   * 会员账号
   */
  username: string
  /**
   * 会员昵称
   */
  nickname: string
  /**
   * 会员头像
   */
  avatar: string
  /**
   * 会员手机号
   */
  mobile: string
  /**
   * 会员生日
   */
  birthday: string
  /**
   * 会员性别
   *
   * @see {@link MemberGender}
   */
  gender: IDict
  /**
   * 注册城市
   *
   * @example
   * ```ts
   * [{ code: '11', name: '北京' }, { code: '1100', name: '市区' }]
   * ```
   */
  location: ILocationPath
  /**
   * 邀请码
   */
  inviteCode: string
  /**
   * 会员卡
   */
  card: IMemberBindCard
  /**
   * 会员群体
   */
  group: IMemberGroupDict
  /**
   * 会员标签
   */
  tags: IMemberTagInfo[]
  /**
   * 会员账户
   */
  account: IMemberAccountInfo
  /**
   * 消费次数
   */
  orderCount: number
  /**
   * 消费金额
   */
  orderAmount: number
  /**
   * 红包数量
   */
  redPacketCount: number
  /**
   * 优惠券数量
   */
  couponCount: number
  /**
   * 累计签到次数
   */
  checkInTimes: number
  /**
   * 连续签到天数
   */
  checkInDays: number
  /**
   * 累计登录次数
   */
  loginTimes: number
  /**
   * 注册时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
  /**
   * 最后登录时间
   */
  lastLoginTime: string
  /**
   * 最后消费时间
   */
  lastOrderTime: string
  /**
   * 最后签到时间
   */
  lastCheckInTime: string
}

/**
 * 会员字典
 */
export type IMemberProfileDict = Pick<
  IMemberProfileInfo,
  | 'id'
  | 'status'
  | 'avatar'
  | 'nickname'
  | 'gender'
  | 'card'
  | 'group'
  | 'tags'
>

/**
 * 会员列表
 */
export type IMemberProfileList = Pick<
  IMemberProfileInfo,
  | 'id'
  | 'status'
  | 'source'
  | 'avatar'
  | 'nickname'
  | 'mobile'
  | 'birthday'
  | 'gender'
  | 'location'
  | 'account'
  | 'card'
  | 'group'
  | 'tags'
  | 'orderCount'
  | 'orderAmount'
  | 'lastLoginTime'
  | 'lastOrderTime'
  | 'createdTime'
>
