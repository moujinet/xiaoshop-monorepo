import { ShopEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Member Upgrade Event
 */
export class MemberUpgradeEvent extends ShopEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberName: string,
    public readonly cardId: number,
    public readonly cardName: string,
    public readonly cardPlanId: number,
  ) {
    super(MODULE_NAME)
  }
}
