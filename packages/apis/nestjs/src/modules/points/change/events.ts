import type { IPointsChangeType } from '@xiaoshop/schema'

/**
 * 会员积分变更事件
 */
export class PointsChangeEvent {
  constructor(
    public readonly memberId: number,
    public readonly type: IPointsChangeType,
    public readonly change: number,
    public readonly points: number,
    public readonly reason: string,
    public readonly isSystem: boolean = false,
  ) {}
}
