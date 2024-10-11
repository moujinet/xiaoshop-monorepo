import type { ILogBasedEvent } from '~/common/events'

import { SystemLogType } from '@xiaoshop/shared'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { OnEvent } from '~/services/event-bus/decorators'

import { SystemLogStoreService } from './domain/store/service'
import { SystemUserLoginEvent } from '../auth/domain/session/events'

@Injectable()
export class SystemLogListener {
  private readonly logger = new Logger(SystemLogListener.name)

  constructor(
    @Inject(SystemLogStoreService)
    private readonly systemLog: SystemLogStoreService,
  ) {}

  /**
   * 处理系统日志
   *
   * @param payload ILogBasedEvent
   */
  @OnEvent('**')
  async handleLogBasedEvent(payload: ILogBasedEvent) {
    try {
      if (!['admin', 'system', 'connect'].includes(payload.source))
        return

      const content = payload.logContent || ''

      if (content) {
        const {
          level,
          source,
          module,
        } = payload

        const type = source === 'admin' ? SystemLogType.ADMIN : SystemLogType.SYSTEM
        const userId = payload instanceof SystemUserLoginEvent ? payload.userId : null

        await this.systemLog.write(level, { type, module, content, userId })
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
