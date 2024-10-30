import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Create Member Group Event
 */
export class MemberGroupCreateEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建会员群体 - ${this.groupName}`
  }
}

/**
 * Update Member Group Event
 */
export class MemberGroupUpdateEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新会员群体 - ${this.groupName}`
  }
}

/**
 * Delete Member Group Event
 */
export class MemberGroupDeleteEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除会员群体 - ${this.groupName}`
  }
}
