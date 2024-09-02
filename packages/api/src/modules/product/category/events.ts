import { BaseEvent } from '~/common/events'

/**
 * 商品分类创建事件
 */
export class ProductCategoryCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cateName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品分类 - ${this.cateName}(#${this.id})`
  }
}

/**
 * 商品分类更新事件
 */
export class ProductCategoryUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cateName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品分类 - ${this.cateName}(#${this.id})`
  }
}

/**
 * 商品分类删除事件
 */
export class ProductCategoryDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly cateName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品分类 - ${this.cateName}(#${this.id})`
  }
}
