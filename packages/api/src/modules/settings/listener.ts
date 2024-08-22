import { Cache } from 'cache-manager'
import { OnEvent } from '@nestjs/event-emitter'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { SETTINGS_MODULE_CACHE_KEY } from '@/settings/constants'
import { SettingsUpdatedEvent } from '@/settings/events'
import { toEventName } from '~/utils/transformers'

@Injectable()
export class SettingsListener {
  private readonly logger = new Logger(SettingsListener.name)

  constructor(
    @Inject(CACHE_MANAGER)
    private cache: Cache,
  ) {}

  /**
   * 更新设置缓存
   */
  @OnEvent(toEventName(SettingsUpdatedEvent.name), { async: true })
  async handleSettingsUpdated() {
    try {
      await this.cache.del(SETTINGS_MODULE_CACHE_KEY)
      this.logger.debug('更新设置缓存')
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
