import type { ProductPublishMode, ProductStatus } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/main/constants'

/**
 * Create Product Event
 */
export class ProductCreateEvent extends AdminEvent {
  constructor(
    readonly productId: number,
    readonly connectId: string,
    readonly productName: string,
    readonly productStatus: ProductStatus,
    readonly publishMode: ProductPublishMode,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品 - ${this.productName}`
  }
}

/**
 * Update Product Event
 */
export class ProductUpdateEvent extends AdminEvent {
  constructor(
    readonly productId: number,
    readonly connectId: string,
    readonly productName: string,
    readonly productStatus: ProductStatus,
    readonly publishMode: ProductPublishMode,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品 - ${this.productName}`
  }
}

/**
 * Copy Product Event
 */
export class ProductCopyEvent extends AdminEvent {
  constructor(
    readonly productId: number,
    readonly connectId: string,
    readonly productName: string,
    readonly newProductId: number,
    readonly newConnectId: string,
    readonly newProductName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `复制商品 - ${this.productName} -> ${this.newProductName}`
  }
}

/**
 * Soft-Delete Product Event
 */
export class ProductSoftDeleteEvent extends AdminEvent {
  constructor(
    readonly productId: number,
    readonly connectId: string,
    readonly productName: string,
    readonly productStatus: ProductStatus,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品 (可恢复) - ${this.productName}`
  }
}
