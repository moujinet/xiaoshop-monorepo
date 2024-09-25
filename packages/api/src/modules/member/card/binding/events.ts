import type { MemberCardType } from '@xiaoshop/shared'

import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * 会员卡绑定事件
 */
export class MemberCardBindEvent extends LogBasedEvent {
  constructor(
    public readonly memberId: number,
    public readonly cardId: number,
    public readonly cardType: MemberCardType,
    public readonly cardName: string,
    public readonly cardPlanId?: number,
    public readonly reason?: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `绑定会员卡 ${this.cardName}${this.reason ? ` - ${this.reason}` : ''}`
  }
}

/**
 * 会员等级升级事件
 */
export class MemberLevelUpEvent extends LogBasedEvent {
  constructor(
    public readonly memberId: number,
    public readonly cardId: number,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }
}
