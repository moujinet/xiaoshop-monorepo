import { BaseEvent } from '~/common/events'

/**
 * 商品参数模板创建事件
 */
export class ProductAttributeTemplateCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tempName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `创建商品参数模板 - ${this.tempName}(#${this.id})`
  }
}

/**
 * 商品参数模板更新事件
 */
export class ProductAttributeTemplateUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tempName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `更新商品参数模板 - ${this.tempName}(#${this.id})`
  }
}

/**
 * 商品参数模板删除事件
 */
export class ProductAttributeTemplateDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly tempName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs(): string | false {
    return `删除商品参数模板 - ${this.tempName}(#${this.id})`
  }
}
