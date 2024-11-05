import type { ProductStatus } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/main/constants'

/**
 * Restore Product Event
 */
export class ProductRestoreEvent extends AdminEvent {
  constructor(
    readonly productId: number,
    readonly connectId: string,
    readonly productName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `恢复软删除商品 - ${this.productName}`
  }
}

/**
 * Delete Product Event
 */
export class ProductDeleteEvent extends AdminEvent {
  constructor(
    readonly productId: number,
    readonly connectId: string,
    readonly productName: string,
    readonly productStatus: ProductStatus,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `彻底删除商品 - ${this.productName}`
  }
}
