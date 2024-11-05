import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/group/constants'

/**
 * Create Product Group Event
 */
export class ProductGroupCreateEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品分组 - ${this.groupName}`
  }
}

/**
 * Update Product Group Event
 */
export class ProductGroupUpdateEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品分组 - ${this.groupName}`
  }
}

/**
 * Delete Product Group Event
 */
export class ProductGroupDeleteEvent extends AdminEvent {
  constructor(
    public readonly groupId: number,
    public readonly groupName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品分组 - ${this.groupName}`
  }
}
