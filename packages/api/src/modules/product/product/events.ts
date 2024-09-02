import {
  type IProductStatus,
  ProductStatus,
} from '@xiaoshop/shared'
import {
  ProductSkuPayload,
  UpdateProductPropertiesPayload,
} from '@/product/product/dto'
import { BaseEvent } from '~/common/events'

/**
 * 商品创建事件
 */
export class ProductCreatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly productName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `创建商品 ${this.productName}(#${this.id})`
  }
}

/**
 * 商品更新事件
 */
export class ProductUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly productName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `更新商品 ${this.productName}(#${this.id})`
  }
}

/**
 * 商品复制事件
 */
export class ProductCopiedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly newId: number,
    public readonly productName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `复制商品 ${this.productName}(#${this.id} -> #${this.newId})`
  }
}

/**
 * 商品属性批量更新事件
 */
export class ProductPropertiesUpdatedEvent extends BaseEvent {
  constructor(
    public readonly ids: number[],
    public readonly properties: UpdateProductPropertiesPayload,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `更新商品属性 (${this.ids.map(i => `#${i}`).join(', ')}) - ${JSON.stringify(this.properties)}`
  }
}

/**
 * 商品状态批量更新事件
 */
export class ProductStatusUpdatedEvent extends BaseEvent {
  constructor(
    public readonly ids: number[],
    public readonly status: IProductStatus,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    const actionMap = {
      [ProductStatus.ON_SALE]: '上架',
      [ProductStatus.STOCKED]: '下架',
      [ProductStatus.SOLD_OUT]: '售罄下架',
      [ProductStatus.DRAFT]: '放入草稿箱',
    }

    return `商品${actionMap[this.status]} (${this.ids.map(i => `#${i}`).join(', ')})`
  }
}

/**
 * 商品售罄事件
 */
export class ProductSoldOutEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly productName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `商品 ${this.productName}(#${this.id}) 已售罄，被系统自动下架`
  }
}

/**
 * 商品删除事件
 */
export class ProductDeletedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly productName: string,
    public readonly isHard?: boolean,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `商品${this.isHard ? '删除' : '放入回收站'} ${this.productName}(#${this.id})`
  }
}

/**
 * 商品恢复事件
 */
export class ProductRestoredEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly productName: string,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `恢复商品 ${this.productName}(#${this.id}), 该商品已被放入草稿箱`
  }
}

/**
 * 商品回收站清空事件
 */
export class ProductTrashClearedEvent extends BaseEvent {
  constructor(
    public readonly count: number,
  ) {
    super('商品管理')
  }

  getAuthLogs() {
    return `清空商品回收站 - 共 ${this.count} 个商品`
  }
}

/**
 * 商品 SKU 更新事件
 */
export class ProductSkusUpdatedEvent extends BaseEvent {
  constructor(
    public readonly id: number,
    public readonly skus: ProductSkuPayload[],
  ) {
    super('商品管理')
  }
}
