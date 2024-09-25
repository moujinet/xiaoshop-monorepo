import type { MemberAccountKey } from '../constants'

/**
 * 会员账户标识
 *
 * @see {@link MemberAccountKey}
 */
export type IMemberAccountKey = `${MemberAccountKey}`

/**
 * 会员账户信息
 */
export type IMemberAccountInfo = {
  /**
   * 账户
   */
  [key in IMemberAccountKey]: number
}
