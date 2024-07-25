import type { IArea } from '@/common'
import type { IMemberGender, IMemberSource, IMemberStatus } from '@/member/types'
import type { IMemberCardBinding, IMemberGroupDict, IMemberTagDict } from '@/member/models'

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
  tag: IMemberTagDict
  /**
   * 绑定会员卡
   *
   * @see {@link IMemberCardBinding}
   */
  binding: IMemberCardBinding
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
   * 注册来源
   *
   * @see {@link IMemberSource}
   */
  source: IMemberSource
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
   * @see {@link IArea}
   */
  location: IArea['code'][]
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
export type IMemberInfo = Pick<
  IMember,
  'id' | 'username' | 'nickname' | 'mobile' | 'avatar' | 'gender' | 'tag' | 'binding'
>
