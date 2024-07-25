import type { IMemberInfo } from '@/member/models'
import type { IOrderInfo } from '@/order/models'
import type { IOrderLogType } from '@/order/types'

/**
 * 订单日志
 */
export interface IOrderLog {
  /**
   * 日志编号
   */
  id: number
  /**
   * 订单信息
   *
   * @see {@link IOrderInfo}
   */
  order: IOrderInfo
  /**
   * 操作人
   *
   * @see {@link IMemberInfo}
   */
  member: IMemberInfo
  /**
   * 日志类型
   *
   * @see {@link IOrderLogType}
   */
  type: IOrderLogType
  /**
   * 日志操作
   */
  action: string
  /**
   * 日志内容
   */
  content: string
  /**
   * 日志额外信息
   *
   * @see {@link IOrderLogExtra}
   */
  extra?: IOrderLogExtra
  /**
   * 创建时间
   */
  createdTime: number
}

/**
 * 订单日志额外信息
 */
export type IOrderLogExtra = Record<string, any>
