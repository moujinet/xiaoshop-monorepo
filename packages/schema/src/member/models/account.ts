import type { IMemberAccountKey, IMemberAccountStatus } from '@/member/types'

/**
 * 会员账户
 */
export interface IMemberAccount {
  /**
   * 账户标识
   *
   * @see {@link IMemberAccountKey}
   */
  key: IMemberAccountKey
  /**
   * 账户状态
   *
   * @see {@link IMemberAccountStatus}
   */
  status: IMemberAccountStatus
  /**
   * 账户名
   */
  name: string
  /**
   * 账户值
   */
  value: number
}

/**
 * 会员账户信息
 *
 * @see {@link IMemberAccountKey}
 */
export type IMemberAccountInfo = Record<IMemberAccountKey, IMemberAccount>
