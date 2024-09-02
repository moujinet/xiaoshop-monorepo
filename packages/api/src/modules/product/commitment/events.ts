import { BaseEvent } from '~/common/events'

/**
 * 商品服务承诺创建事件
 */
export class ProductCommitmentCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly serviceName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品服务承诺 - ${this.serviceName}(#${this.id})`
  }
}

/**
 * 商品服务承诺更新事件
 */
export class ProductCommitmentUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly serviceName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品服务承诺 - ${this.serviceName}(#${this.id})`
  }
}

/**
 * 商品服务承诺删除事件
 */
export class ProductCommitmentDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly serviceName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品服务承诺 - ${this.serviceName}(#${this.id})`
  }
}
