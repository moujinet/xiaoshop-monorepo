import { SystemEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Update Member Group Event
 */
export class MemberGroupUpdateEvent extends SystemEvent {
  constructor(
    public readonly memberId: number,
    public readonly memberUsername: string,
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新会员群体 - ${this.memberUsername} - ${this.groupName}`
  }
}
