import { BaseEvent } from '~/common/events'

/**
 * 素材分组创建事件
 */
export class ResourceGroupCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly groupName: string,
  ) {
    super('素材管理')
  }

  getLogs() {
    return `创建素材分组 ${this.groupName}(#${this.id})`
  }
}

/**
 * 素材分组更新事件
 */
export class ResourceGroupUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly groupName: string,
  ) {
    super('素材管理')
  }

  getLogs() {
    return `创建素材分组 ${this.groupName}(#${this.id})`
  }
}

/**
 * 素材分组删除事件
 */
export class ResourceGroupDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly groupName: string,
  ) {
    super('素材管理')
  }

  getLogs() {
    return `创建素材分组 ${this.groupName}(#${this.id})`
  }
}
