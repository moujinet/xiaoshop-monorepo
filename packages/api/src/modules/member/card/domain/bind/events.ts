import { MemberCardType } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Assign Member Card/Level Event
 */
export class MemberCardAssignEvent extends AdminEvent {
  constructor(
    public readonly bindId: number,
    public readonly bindMemberId: number,
    public readonly bindCardId: number,
    public readonly bindCardType: MemberCardType,
    public readonly bindCardPlanId: number,
    public readonly bindCardName: string,
    public readonly bindReason: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const cardType = this.bindCardType === MemberCardType.CUSTOM
      ? '绑定会员卡'
      : '设置会员等级'

    return `${cardType} - ${this.bindCardName} - ${this.bindReason}`
  }
}
