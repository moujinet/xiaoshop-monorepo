import { LogisticAddressType } from '@xiaoshop/shared'

import { AdminEvent } from '~/common/events'
import { MODULE_NAME } from '@/logistic/address/constants'
import { LOGISTIC_ADDRESS_TYPES } from '~/dicts/logistic/address'

/**
 * Create Seller Address Event
 */
export class LogisticAddressSellerCreateEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly addressType: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const typeName = LOGISTIC_ADDRESS_TYPES.find(
      t => t.key === this.addressType,
    )?.value

    return `创建商家${typeName} - ${this.address}`
  }
}

/**
 * Update Seller Address Event
 */
export class LogisticAddressSellerUpdateEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly addressType: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const typeName = LOGISTIC_ADDRESS_TYPES.find(
      t => t.key === this.addressType,
    )?.value

    return `更新商家${typeName} - ${this.address}`
  }
}

/**
 * Delete Seller Address Event
 */
export class LogisticAddressSellerDeleteEvent extends AdminEvent {
  constructor(
    public readonly addressId: number,
    public readonly address: string,
    public readonly addressType: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }

  get logContent() {
    const typeName = LOGISTIC_ADDRESS_TYPES.find(
      t => t.key === this.addressType,
    )?.value

    return `删除商家${typeName} - ${this.address}`
  }
}
