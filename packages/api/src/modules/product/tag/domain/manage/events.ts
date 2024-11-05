import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/tag/constants'

/**
 * Create Product Tag Event
 */
export class ProductTagCreateEvent extends AdminEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品标签 - ${this.tagName}`
  }
}

/**
 * Update Product Tag Event
 */
export class ProductTagUpdateEvent extends AdminEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品标签 - ${this.tagName}`
  }
}

/**
 * Delete Product Tag Event
 */
export class ProductTagDeleteEvent extends AdminEvent {
  constructor(
    public readonly tagId: number,
    public readonly tagName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品标签 - ${this.tagName}`
  }
}
