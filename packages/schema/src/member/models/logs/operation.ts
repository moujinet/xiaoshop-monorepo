import type { IMemberOperationLogType } from '@/member/types'

/**
 * 会员操作日志
 */
export interface IMemberOperationLog {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 操作类型
   *
   * @see {@link IMemberOperationLogType}
   */
  type: IMemberOperationLogType
  /**
   * 操作动作
   */
  action: string
  /**
   * 操作内容
   */
  content: string
  /**
   * 附加数据
   */
  extras?: Record<string, unknown>
  /**
   * 操作时间
   */
  createdTime: string
}
