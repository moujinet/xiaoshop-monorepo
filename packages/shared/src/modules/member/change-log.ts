import type { IMemberAccountChangeType } from '@/member/types'
import type { IMemberAccountInfo, IMemberAccountKeys } from '@/member/account'

/**
 * 会员账户变更日志
 */
export interface IMemberAccountChangeLog {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
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
   * - `add`: 增加
   * - `sub`: 减少
   * - `set`: 设置
   *
   * @see {@link IMemberAccountChangeType}
   */
  type: IMemberAccountChangeType
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
 * 会员账户变更日志列表 (全部)
 *
 * @see {@link IMemberAccountChangeLog}
 */
export type IMemberAccountChangeLogListItem = Pick<
  IMemberAccountChangeLog,
  | 'id'
  | 'member'
  | 'key'
  | 'type'
  | 'value'
  | 'reason'
  | 'createdTime'
>

/**
 * 会员账户变更日志 (会员)
 */
export type IMemberAccountChangeLogMemberListItem = Omit<IMemberAccountChangeLogListItem, 'member'>
