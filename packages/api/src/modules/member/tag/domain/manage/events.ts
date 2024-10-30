import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * Create Member Tag Event
 */
export class MemberTagCreateEvent extends AdminEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建会员标签 - ${this.tagName}`
  }
}

/**
 * Update Member Tag Event
 */
export class MemberTagUpdateEvent extends AdminEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新会员标签 - ${this.tagName}`
  }
}

/**
 * Delete Member Tag Event
 */
export class MemberTagDeleteEvent extends AdminEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除会员标签 - ${this.tagName}`
  }
}
