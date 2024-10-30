import type { MemberAccountChangeMethod } from '@xiaoshop/shared'

import { MODULE_NAME } from '@/member/constants'
import { AdminEvent, SystemEvent } from '~/common/events'

/**
 * Update Member Points Setup Event
 */
export class MemberPointsSetupEvent extends AdminEvent {
  constructor(
    public readonly memberId: number,
    public readonly points: number,
    public readonly reason: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `设置会员积分 - ${this.points} - ${this.reason}`
  }
}

/**
 * Update Member Points Change Event
 */
export class MemberPointsChangeEvent extends SystemEvent {
  constructor(
    public readonly memberId: number,
    public readonly method: MemberAccountChangeMethod,
    public readonly points: number,
    public readonly reason: string,
  ) {
    super(MODULE_NAME)
  }
}
