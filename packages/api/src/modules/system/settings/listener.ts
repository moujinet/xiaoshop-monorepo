import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { SystemSettingsService } from './service'
import { SystemSettingsUpdateEvent } from './events'

@Injectable()
export class SystemSettingsListener {
  private readonly logger = new Logger(SystemSettingsListener.name)

  constructor(
    @Inject(SystemSettingsService)
    private readonly service: SystemSettingsService,
  ) {}

  /**
   * 更新设置缓存
   */
  @OnEvent(toEventName(SystemSettingsUpdateEvent.name), { async: true })
  async handleSystemSettingsUpdate() {
    try {
      await this.service.clearCache()
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
