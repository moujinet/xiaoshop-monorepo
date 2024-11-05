import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/product/service/constants'

/**
 * Create Product Extra Service Event
 */
export class ProductExtraServiceCreateEvent extends AdminEvent {
  constructor(
    public readonly serviceId: number,
    public readonly serviceName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `创建商品服务保障 - ${this.serviceName}`
  }
}

/**
 * Update Product Extra Service Event
 */
export class ProductExtraServiceUpdateEvent extends AdminEvent {
  constructor(
    public readonly serviceId: number,
    public readonly serviceName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `更新商品服务保障 - ${this.serviceName}`
  }
}

/**
 * Delete Product Extra Service Event
 */
export class ProductExtraServiceDeleteEvent extends AdminEvent {
  constructor(
    public readonly serviceId: number,
    public readonly serviceName: string,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    return `删除商品服务保障 - ${this.serviceName}`
  }
}
