import type { IMemberInfo } from './member'

/**
 * 会员邀请记录信息
 */
export interface IMemberInviteInfo {
  /**
   * 记录 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: IMemberInfo['id']
  /**
   * 会员昵称 (冗余)
   */
  nickname: IMemberInfo['nickname']
  /**
   * 受邀会员 ID
   */
  invitedMemberId: IMemberInfo['id']
  /**
   * 受邀会员昵称 (冗余)
   */
  invitedNickname: IMemberInfo['nickname']
  /**
   * 邀请时间
   */
  createdTime: string
}
