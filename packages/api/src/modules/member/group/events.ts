import type { IMemberGroupCondition } from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 会员群体创建事件
 */
export class MemberGroupCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly conditions: IMemberGroupCondition[],
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `创建会员群体 ${this.name} (#${this.id}) - ${JSON.stringify(this.conditions)}`
  }
}

/**
 * 会员群体更新事件
 */
export class MemberGroupUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly conditions: IMemberGroupCondition[],
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `更新会员群体 ${this.name} (#${this.id}) - ${JSON.stringify(this.conditions)}`
  }
}

/**
 * 会员群体删除事件
 */
export class MemberGroupDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly conditions: IMemberGroupCondition[],
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `删除会员群体 ${this.name} (#${this.id}) - ${JSON.stringify(this.conditions)}`
  }
}

/**
 * 会员群体刷新统计事件
 */
export class MemberGroupRefreshTotalEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly conditions: IMemberGroupCondition[],
    public readonly total: number,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `刷新会员群体统计 ${this.name} (#${this.id}) - ${JSON.stringify(this.conditions)} - 共计: ${this.total}`
  }
}
