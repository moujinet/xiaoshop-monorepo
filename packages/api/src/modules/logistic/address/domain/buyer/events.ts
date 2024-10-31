import type { LogisticAddressType } from '@xiaoshop/shared'

import { ShopEvent } from '~/common/events'
import { MODULE_NAME } from '@/logistic/address/constants'

/**
 * Create Buyer Address Event
 */
export class LogisticAddressBuyerCreateEvent extends ShopEvent {
  constructor(
    public readonly addressId: number,
    public readonly memberId: number,
    public readonly address: string,
    public readonly addressType: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }
}

/**
 * Update Buyer Address Event
 */
export class LogisticAddressBuyerUpdateEvent extends ShopEvent {
  constructor(
    public readonly addressId: number,
    public readonly memberId: number,
    public readonly address: string,
    public readonly addressType: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }
}

/**
 * Delete Buyer Address Event
 */
export class LogisticAddressBuyerDeleteEvent extends ShopEvent {
  constructor(
    public readonly addressId: number,
    public readonly memberId: number,
    public readonly address: string,
    public readonly addressType: LogisticAddressType,
  ) {
    super(MODULE_NAME)
  }
}
