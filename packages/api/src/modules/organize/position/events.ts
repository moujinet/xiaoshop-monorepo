import { BaseEvent } from '~/common/events'

/**
 * 组织职位创建事件
 */
export class OrganizePositionCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly positionName: string,
  ) {
    super('组织管理')
  }

  getAuthLogs() {
    return `创建组织职位 ${this.positionName}(#${this.id})`
  }
}

/**
 * 组织职位更新事件
 */
export class OrganizePositionUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly positionName: string,
  ) {
    super('组织管理')
  }

  getAuthLogs() {
    return `更新组织职位 ${this.positionName}(#${this.id})`
  }
}

/**
 * 组织职位删除事件
 */
export class OrganizePositionDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly positionName: string,
  ) {
    super('组织管理')
  }

  getAuthLogs() {
    return `删除组织职位 ${this.positionName}(#${this.id})`
  }
}
