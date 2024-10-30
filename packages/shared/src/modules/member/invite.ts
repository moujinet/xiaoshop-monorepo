import type { IMemberProfileInfo } from './account/profile'

/**
 * 会员邀请记录信息
 */
export type IMemberInviteInfo = {
  /**
   * 记录 ID
   */
  id: number
  /**
   * 受邀会员 ID
   */
  inviteeId: number
  /**
   * 邀请时间
   */
  createdTime: string
} & Pick<
  IMemberProfileInfo,
  | 'avatar'
  | 'nickname'
  | 'gender'
  | 'card'
  | 'orderCount'
  | 'orderAmount'
  | 'lastLoginTime'
>

/**
 * 会员邀请记录列表
 */
export type IMemberInviteList = Pick<
  IMemberInviteInfo,
  | 'id'
  | 'inviteeId'
  | 'avatar'
  | 'nickname'
  | 'gender'
  | 'card'
  | 'orderCount'
  | 'orderAmount'
  | 'lastLoginTime'
  | 'createdTime'
>
