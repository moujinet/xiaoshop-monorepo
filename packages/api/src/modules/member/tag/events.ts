import { BaseEvent } from '~/common/events'

/**
 * 会员标签创建事件
 */
export class MemberTagCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tagName: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `创建会员标签 - ${this.tagName}(#${this.id})`
  }
}

/**
 * 会员标签更新事件
 */
export class MemberTagUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tagName: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `更新会员标签 - ${this.tagName}(#${this.id})`
  }
}

/**
 * 会员标签删除事件
 */
export class MemberTagDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tagName: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `删除会员标签 - ${this.tagName}(#${this.id})`
  }
}
