import { LogBasedEvent } from '~/common/events'
import { MODULE_NAME } from '@/member/constants'

/**
 * 会员标签创建事件
 */
export class MemberTagCreateEvent extends LogBasedEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建会员标签 ${this.tagName}`
  }
}

/**
 * 会员标签更新事件
 */
export class MemberTagUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新会员标签 ${this.tagName}`
  }
}

/**
 * 会员标签删除事件
 */
export class MemberTagDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除会员标签 ${this.tagName}`
  }
}
