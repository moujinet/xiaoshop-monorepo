/**
 * 会员积分变动信息
 */
export interface IMemberPointsChangeInfo {
  /**
   * 变动 ID
   */
  id: number
  /**
   * 变动积分
   */
  points: number
  /**
   * 变动原因
   */
  reason: string
  /**
   * 变动时间
   */
  createdTime: string
}

/**
 * 会员积分变动列表
 */
export type IMemberPointsChangeList = Pick<
  IMemberPointsChangeInfo,
  | 'id'
  | 'points'
  | 'reason'
  | 'createdTime'
>
