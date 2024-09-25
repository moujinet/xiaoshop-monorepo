import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * 会员群体创建事件
 */
export class MemberGroupCreateEvent extends LogBasedEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建会员群体 ${this.groupName}`
  }
}

/**
 * 会员群体更新事件
 */
export class MemberGroupUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新会员群体 ${this.groupName}`
  }
}

/**
 * 会员群体删除事件
 */
export class MemberGroupDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除会员群体 ${this.groupName}`
  }
}
