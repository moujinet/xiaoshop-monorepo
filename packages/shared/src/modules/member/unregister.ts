import type { IDict } from '~/common'
import type { IMemberProfileInfo } from './account'

/**
 * 会员注销信息
 */
export type IMemberUnregisterInfo = {
  /**
   * 注销申请 ID
   */
  id: number
  /**
   * 申请会员 ID
   */
  memberId: number
  /**
   * 注销状态
   *
   * @see {@link MemberUnregisterStatus}
   */
  status: IDict
  /**
   * 注销原因
   */
  reason: string
  /**
   * 申请时间
   */
  applyTime: string
  /**
   * 审核时间
   */
  auditTime: string
  /**
   * 注销时间
   */
  unregisterTime: string
}
& Pick<
  IMemberProfileInfo,
  | 'username'
  | 'nickname'
  | 'mobile'
>

/**
 * 会员注销列表
 */
export type IMemberUnregisterList = Pick<
  IMemberUnregisterInfo,
  | 'id'
  | 'memberId'
  | 'username'
  | 'nickname'
  | 'mobile'
  | 'status'
  | 'reason'
  | 'applyTime'
>
