import type { IMemberInfo } from '@/member/models'
import type { IPointsChangeType } from '@/points/types'

/**
 * 会员积分变更日志
 */
export interface IPointsChangeLog {
  /**
   * 日志 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 变更类型
   *
   * @see {@link IPointsChangeType}
   */
  type: IPointsChangeType
  /**
   * 积分变化
   */
  change: number
  /**
   * 变化后积分
   */
  points: number
  /**
   * 变化原因
   */
  reason: string
  /**
   * 发生时间
   */
  createdTime: string
}

/**
 * 会员积分变更日志列表
 */
export type IPointsChangeLogListItem = Pick<
  IPointsChangeLog,
  | 'id'
  | 'type'
  | 'change'
  | 'points'
  | 'reason'
  | 'createdTime'
> & {
  /**
   * 会员信息
   *
   * @see {@link IMemberInfo}
   */
  member: IMemberInfo
}
