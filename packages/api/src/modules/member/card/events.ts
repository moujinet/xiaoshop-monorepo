import { type IYesOrNo, YesOrNo } from '@xiaoshop/shared'
import { BaseEvent } from '~/common/events'

/**
 * 会员卡创建事件
 */
export class MemberCardCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cardName: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `创建会员卡 ${this.cardName} (${this.id})`
  }
}

/**
 * 会员卡更新事件
 */
export class MemberCardUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cardName: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `更新会员卡 ${this.cardName} (${this.id})`
  }
}

/**
 * 会员卡删除事件
 */
export class MemberCardDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cardName: string,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `删除会员卡 ${this.cardName} (${this.id})`
  }
}

/**
 * 会员卡更新启用状态事件
 */
export class MemberCardStatusUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cardName: string,
    public readonly enable: IYesOrNo,
  ) {
    super('会员管理')
  }

  getAuthLogs() {
    return `{${this.enable === YesOrNo.YES ? '启用' : '停用'}}会员卡 ${this.cardName} (${this.id})`
  }
}
