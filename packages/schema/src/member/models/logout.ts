import type { IMemberLogoutStatus, IMemberSource } from '@/member/types'

/**
 * 会员注销申请
 */
export interface IMemberLogout {
  /**
   * 申请 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
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
   * 注销原因
   */
  reason: string
  /**
   * 注销状态
   *
   * @see {@link IMemberLogoutStatus}
   */
  status: IMemberLogoutStatus
  /**
   * 注销来源
   *
   * @see {@link IMemberSource}
   */
  source: IMemberSource
  /**
   * 申请时间
   */
  createdTime: string
  /**
   * 注销时间
   */
  logoutTime: string
}
