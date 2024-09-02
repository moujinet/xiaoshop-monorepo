import { BaseEvent } from '~/common/events'

/**
 * 商品品牌创建事件
 */
export class ProductBrandCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly brandName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品品牌 - ${this.brandName}(#${this.id})`
  }
}

/**
 * 商品品牌更新事件
 */
export class ProductBrandUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly brandName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品品牌 - ${this.brandName}(#${this.id})`
  }
}

/**
 * 商品品牌删除事件
 */
export class ProductBrandDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly brandName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品品牌 - ${this.brandName}(#${this.id})`
  }
}
