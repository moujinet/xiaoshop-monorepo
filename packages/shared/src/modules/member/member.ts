import type { IDict, ILocationPath } from '~/common'

import type { IMemberTagInfo } from './tag'
import type { IMemberGroupDict } from './group'
import type { IMemberAccountInfo } from './account'
import type { IMemberCardBinding } from './card/binding'

/**
 * 会员信息
 */
export interface IMemberInfo {
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
   *
   * @example 000-000-000
   */
  inviteCode: string
  /**
   * 邀请会员 ID
   */
  inviteMemberId: IMemberInfo['id']
  /**
   * 会员卡号
   */
  cardNo: string
  /**
   * 会员卡
   */
  card: IMemberCardBinding
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
   * 累计签到次数
   */
  signInCount: number
  /**
   * 连续签到天数
   */
  signInDays: number
  /**
   * 累计登录次数
   */
  loginCount: number
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
  lastSignInTime: string
}

/**
 * 会员字典
 */
export type IMemberDict = Pick<
  IMemberInfo,
  | 'id'
  | 'status'
  | 'nickname'
  | 'avatar'
  | 'gender'
  | 'card'
  | 'group'
  | 'tags'
  | 'createdTime'
>

/**
 * 会员列表
 */
export type IMemberList = Pick<
  IMemberInfo,
  | 'id'
  | 'status'
  | 'source'
  | 'nickname'
  | 'avatar'
  | 'mobile'
  | 'birthday'
  | 'gender'
  | 'location'
  | 'cardNo'
  | 'card'
  | 'group'
  | 'tags'
  | 'account'
  | 'lastLoginTime'
>
