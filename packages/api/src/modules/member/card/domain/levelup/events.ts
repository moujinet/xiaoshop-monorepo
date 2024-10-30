import { SystemEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Member Level Up Event
 */
export class MemberLevelupEvent extends SystemEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberName: string,
    public readonly cardId: number,
    public readonly cardName: string,
  ) {
    super(MODULE_NAME)
  }
}
