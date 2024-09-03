import type {
  MemberSource,
  MemberUnregisterStatus,
} from '@/member/constants'

/**
 * 会员注销申请
 */
export interface IMemberUnregister {
  /**
   * 申请 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 注销状态
   *
   * @see {@link MemberUnregisterStatus}
   */
  status: MemberUnregisterStatus
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
   * 注销来源
   *
   * @see {@link MemberSource}
   */
  source: MemberSource
  /**
   * 申请时间
   */
  createdTime: string
  /**
   * 注销时间
   */
  unregisterTime: string
}
