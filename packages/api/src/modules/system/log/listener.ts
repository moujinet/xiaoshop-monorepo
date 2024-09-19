import type { ILogBasedEvent } from '~/common/events'

import { OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { SystemLogService } from './service'
import { SystemUserLoginEvent } from '../auth/user/events'

@Injectable()
export class SystemLogListener {
  private readonly logger = new Logger(SystemLogListener.name)

  constructor(
    @Inject(SystemLogService)
    private readonly systemLog: SystemLogService,
  ) {}

  /**
   * 处理系统日志
   *
   * @param payload ILogBasedEvent
   */
  @OnEvent('**', { async: true })
  async handleLogBasedEvent(payload: ILogBasedEvent) {
    try {
      const content = payload.getLogContent()

      if (content) {
        const {
          type,
          level,
          module,
        } = payload

        await this.systemLog.write(level, {
          type,
          module,
          content,
          userId: payload instanceof SystemUserLoginEvent ? payload.userId : null,
        })
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
