import { LogisticAddressType } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/logistic/constants'

/**
 * 地址创建事件
 */
export class LogisticAdminAddressCreateEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly type: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const type = this.type === LogisticAddressType.RECEIVE ? '收货地址' : '发货地址'

    return `创建${type} ${this.address}`
  }
}

/**
 * 地址更新事件
 */
export class LogisticAdminAddressUpdateEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly type: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const type = this.type === LogisticAddressType.RECEIVE ? '收货地址' : '发货地址'

    return `更新${type} ${this.address}`
  }
}

/**
 * 设置默认地址事件
 */
export class LogisticAdminAddressDefaultUpdateEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly type: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    const type = this.type === LogisticAddressType.RECEIVE ? '收货地址' : '发货地址'

    return `设置默认${type} ${this.address}`
  }
}

/**
 * 地址删除事件
 */
export class LogisticAdminAddressDeleteEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly type: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除地址 ${this.address}`
  }
}
