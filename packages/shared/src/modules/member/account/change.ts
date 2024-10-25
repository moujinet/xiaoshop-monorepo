import type { IDict } from '~/common'
import type { IMemberProfileDict } from '../member'

/**
 * 会员账户变更信息
 */
export interface IMemberAccountChangeInfo {
  /**
   * 变更信息 ID
   */
  id: number
  /**
   * 变更账户标识
   *
   * @see {@link IMemberAccountKey}
   */
  key: IDict
  /**
   * 变更类型
   *
   * @see {@link MemberAccountChangeMethod}
   */
  method: IDict
  /**
   * 会员
   */
  member: IMemberProfileDict
  /**
   * 变更值
   */
  value: number
  /**
   * 变更原因
   */
  reason: string
  /**
   * 变更时间
   */
  updatedTime: string
}

/**
 * 会员账户变更列表
 */
export type IMemberAccountChangeList = Pick<
  IMemberAccountChangeInfo,
  | 'id'
  | 'method'
  | 'value'
  | 'reason'
  | 'updatedTime'
>

/**
 * 会员账户变更列表
 */
export type IMemberAccountChangeMemberList = Pick<
  IMemberAccountChangeInfo,
  | 'id'
  | 'method'
  | 'member'
  | 'value'
  | 'reason'
  | 'updatedTime'
>
