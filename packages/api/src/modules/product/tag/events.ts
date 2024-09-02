import { BaseEvent } from '~/common/events'

/**
 * 商品标签创建事件
 */
export class ProductTagCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tagName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品标签 - ${this.tagName}(#${this.id})`
  }
}

/**
 * 商品标签更新事件
 */
export class ProductTagUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tagName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品标签 - ${this.tagName}(#${this.id})`
  }
}

/**
 * 商品标签删除事件
 */
export class ProductTagDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tagName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品标签 - ${this.tagName}(#${this.id})`
  }
}
