import type { IMemberProfileDict } from './member'

/**
 * 会员邀请记录信息
 */
export interface IMemberInviteInfo {
  /**
   * 记录 ID
   */
  id: number
  /**
   * 受邀会员 ID
   */
  invitedMemberId: IMemberProfileDict['id']
  /**
   * 受邀会员
   */
  invitedMember: IMemberProfileDict
  /**
   * 邀请时间
   */
  createdTime: string
}
