import { SystemEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Refresh Member Group Event
 */
export class MemberGroupRefreshEvent extends SystemEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
    public readonly total: number,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新会员群体人数 - ${this.groupName} - ${this.total} 人`
  }
}
