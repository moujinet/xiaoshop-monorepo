import type { IMemberAccountKey } from '@/member/types'

/**
 * 会员账户
 */
export interface IMemberAccount {
  /**
   * 账户 ID
   */
  id: number
  /**
   * 账户标识
   *
   * @see {@link IMemberAccountKey}
   */
  key: IMemberAccountKey
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
 * 会员账户字典
 */
export type IMemberAccountDict = Pick<IMemberAccount, 'key' | 'name' | 'value'>

/**
 * 会员账户键值对象
 */
export type IMemberAccountKeyValue = Record<IMemberAccount['key'], IMemberAccount['value']>
