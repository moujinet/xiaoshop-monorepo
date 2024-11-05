import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/brand/constants'

/**
 * Create Product Brand Event
 */
export class ProductBrandCreateEvent extends AdminEvent {
  constructor(
    public readonly brandId: number,
    public readonly brandName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品品牌 - ${this.brandName}`
  }
}

/**
 * Update Product Brand Event
 */
export class ProductBrandUpdateEvent extends AdminEvent {
  constructor(
    public readonly brandId: number,
    public readonly brandName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品品牌 - ${this.brandName}`
  }
}

/**
 * Delete Product Brand Event
 */
export class ProductBrandDeleteEvent extends AdminEvent {
  constructor(
    public readonly brandId: number,
    public readonly brandName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品品牌 - ${this.brandName}`
  }
}
