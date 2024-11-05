import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/service/constants'

/**
 * Create Product Addition Service Event
 */
export class ProductAdditionServiceCreateEvent extends AdminEvent {
  constructor(
    public readonly serviceId: number,
    public readonly serviceName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品附加服务 - ${this.serviceName}`
  }
}

/**
 * Update Product Addition Service Event
 */
export class ProductAdditionServiceUpdateEvent extends AdminEvent {
  constructor(
    public readonly serviceId: number,
    public readonly serviceName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品附加服务 - ${this.serviceName}`
  }
}

/**
 * Delete Product Addition Service Event
 */
export class ProductAdditionServiceDeleteEvent extends AdminEvent {
  constructor(
    public readonly serviceId: number,
    public readonly serviceName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品附加服务 - ${this.serviceName}`
  }
}
