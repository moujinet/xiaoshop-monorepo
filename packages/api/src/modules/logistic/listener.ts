import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { LogisticAddressService } from './address/service'
import { LogisticAddressCreateEvent, LogisticAddressUpdateEvent } from './address/events'

@Injectable()
export class LogisticListener {
  private readonly logger = new Logger(LogisticListener.name)

  constructor(
    @Inject(LogisticAddressService)
    private readonly address: LogisticAddressService,
  ) {}

  /**
   * 创建默认地址
   *
   * @param payload LogisticAddressCreateEvent
   */
  @OnEvent(toEventName(LogisticAddressCreateEvent.name), { async: true })
  async handleCreateLogisticAddress(payload: LogisticAddressCreateEvent) {
    try {
      await this.address.setDefault(payload.addressId)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 更新默认地址
   *
   * @param payload LogisticAddressUpdateEvent
   */
  @OnEvent(toEventName(LogisticAddressUpdateEvent.name), { async: true })
  async handleUpdateLogisticAddress(payload: LogisticAddressUpdateEvent) {
    try {
      await this.address.setDefault(payload.addressId)
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
