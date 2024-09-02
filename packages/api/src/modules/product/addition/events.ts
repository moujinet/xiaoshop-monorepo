import { BaseEvent } from '~/common/events'

/**
 * 商品附加服务创建事件
 */
export class ProductAdditionCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly serviceName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品附加服务 - ${this.serviceName}(#${this.id})`
  }
}

/**
 * 商品附加服务更新事件
 */
export class ProductAdditionUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly serviceName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品附加服务 - ${this.serviceName}(#${this.id})`
  }
}

/**
 * 商品附加服务删除事件
 */
export class ProductAdditionDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly serviceName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品附加服务 - ${this.serviceName}(#${this.id})`
  }
}
