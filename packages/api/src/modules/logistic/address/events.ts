import { LogBasedEvent } from '~/common/events'

import { MODULE_NAME } from '../constants'

/**
 * 地址创建事件
 */
export class LogisticAddressCreateEvent extends LogBasedEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `创建地址 ${this.address}`
  }
}

/**
 * 地址更新事件
 */
export class LogisticAddressUpdateEvent extends LogBasedEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `更新地址 ${this.address}`
  }
}

/**
 * 地址删除事件
 */
export class LogisticAddressDeleteEvent extends LogBasedEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
  ) {
    super(MODULE_NAME)
  }

  getLogContent() {
    return `删除地址 ${this.address}`
  }
}
