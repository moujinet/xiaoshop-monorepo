import { BaseEvent } from '~/common/events'

/**
 * 商品分组创建事件
 */
export class ProductGroupCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly groupName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品分组 - ${this.groupName}(#${this.id})`
  }
}

/**
 * 商品分组更新事件
 */
export class ProductGroupUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly groupName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品分组 - ${this.groupName}(#${this.id})`
  }
}

/**
 * 商品分组删除事件
 */
export class ProductGroupDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly groupName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品分组 - ${this.groupName}(#${this.id})`
  }
}
