import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/category/constants'

/**
 * Create Product Category Event
 */
export class ProductCategoryCreateEvent extends AdminEvent {
  constructor(
    public readonly categoryId: number,
    public readonly categoryName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品分类 - ${this.categoryName}`
  }
}

/**
 * Update Product Category Event
 */
export class ProductCategoryUpdateEvent extends AdminEvent {
  constructor(
    public readonly categoryId: number,
    public readonly categoryName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品分类 - ${this.categoryName}`
  }
}

/**
 * Delete Product Category Event
 */
export class ProductCategoryDeleteEvent extends AdminEvent {
  constructor(
    public readonly categoryId: number,
    public readonly categoryName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品分类 - ${this.categoryName}`
  }
}
