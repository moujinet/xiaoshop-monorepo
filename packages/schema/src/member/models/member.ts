import type { ILocationPath } from '@/common/models'
import type { IMemberGender, IMemberSource, IMemberStatus } from '@/member/types'
import type {
  IMemberAccountDict,
  IMemberCardBinding,
  IMemberCardBindingInfo,
  IMemberGroupDict,
  IMemberTagDict,
} from '@/member/models'

/**
 * 会员信息
 */
export interface IMember {
  /**
   * 会员编号
   */
  id: number
  /**
   * 会员状态
   *
   * @see {@link IMemberStatus}
   */
  status: IMemberStatus
  /**
   * 注册来源
   *
   * @see {@link IMemberSource}
   */
  source: IMemberSource
  /**
   * 会员账户
   *
   * @see {@link IMemberAccountDict}
   */
  account: IMemberAccountDict[]
  /**
   * 会员分组
   *
   * @see {@link IMemberGroupDict}
   */
  group: IMemberGroupDict
  /**
   * 会员标签
   *
   * @see {@link IMemberTag}
   */
  tags: IMemberTagDict[]
  /**
   * 会员卡
   *
   * @see {@link IMemberCardBinding}
   */
  card: IMemberCardBinding
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
   * @see {@link IMemberGender}
   */
  gender: IMemberGender
  /**
   * 注册城市
   *
   * @see {@link ILocationPath}
   */
  location: ILocationPath
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
}

/**
 * 会员信息
 */
export type IMemberProfile = Pick<
  IMember,
  | 'id'
  | 'status'
  | 'source'
  | 'tags'
  | 'group'
  | 'card'
  | 'cardNo'
  | 'avatar'
  | 'username'
  | 'nickname'
  | 'mobile'
  | 'birthday'
  | 'gender'
  | 'location'
  | 'createdTime'
  | 'lastLoginTime'
>

/**
 * 会员列表
 */
export type IMemberListItem = Pick<
  IMember,
  | 'id'
  | 'status'
  | 'source'
  | 'tags'
  | 'group'
  | 'account'
  | 'cardNo'
  | 'avatar'
  | 'username'
  | 'nickname'
  | 'mobile'
  | 'gender'
  | 'location'
  | 'lastLoginTime'
> & {
  /**
   * 会员卡
   *
   * @see {@link IMemberCardBindingInfo}
   */
  card: IMemberCardBindingInfo
}
