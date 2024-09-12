import type { IMemberAccountInfo, IMemberAccountKeys } from '@/member/account'
import type { MemberAccountChangeType } from '@/member/constants'

/**
 * 会员账户变更日志
 */
export interface IMemberAccountChangeLogList {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 会员信息
   *
   * @see {@link IMemberAccountInfo}
   */
  member: IMemberAccountInfo
  /**
   * 变更账户
   *
   * @see {@link IMemberAccountKeys}
   */
  key: IMemberAccountKeys
  /**
   * 变更类型
   *
   * @see {@link MemberAccountChangeType}
   */
  type: MemberAccountChangeType
  /**
   * 变更值
   */
  value: number
  /**
   * 变更原因
   */
  reason: string
  /**
   * 创建时间
   */
  createdTime: string
}

/**
 * 会员账户变更日志 (会员)
 *
 * @see {@link IMemberAccountChangeLogList}
 */
export type IMemberAccountChangeLogMemberList = Omit<
  IMemberAccountChangeLogList,
  'member'
>
